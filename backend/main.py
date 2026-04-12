from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import pandas as pd
import numpy as np
from io import BytesIO

app = FastAPI(title="Clube Kairos API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

EXCEL_FILE = Path(__file__).parent.parent / "Relatório_Gerencial_Denver.xlsx"


def load_data():
    his_cota = pd.read_excel(EXCEL_FILE, sheet_name="Historico_Cota")
    ativos = pd.read_excel(EXCEL_FILE, sheet_name="Ativos")
    rent_mensal = pd.read_excel(EXCEL_FILE, sheet_name="Rent_Mensal", header=9)
    selic_df = pd.read_excel(EXCEL_FILE, sheet_name="Selic")
    return his_cota, ativos, rent_mensal, selic_df


def safe_float(val):
    if val is None or (isinstance(val, float) and np.isnan(val)):
        return None
    return float(val)


@app.get("/api/dashboard")
def get_dashboard():
    his_cota, ativos, rent_mensal, selic_df = load_data()

    data_atual = his_cota["Data "].max()

    # --- Quota stats ---
    quota_stats = {
        "current": round(float(his_cota["Cota"].iloc[-1]), 6),
        "min": round(float(his_cota["Cota"].min()), 6),
        "max": round(float(his_cota["Cota"].max()), 6),
        "avg": round(float(np.mean(his_cota["Cota"])), 6),
    }

    # --- Performance history ---
    perf_df = his_cota[["Data ", "Cota 100 - Ibov", "Cota 100 - Kairos"]].copy()
    perf_df["Data "] = perf_df["Data "].dt.strftime("%Y-%m-%d")
    perf_df.rename(columns={"Data ": "date", "Cota 100 - Ibov": "ibov", "Cota 100 - Kairos": "kairos"}, inplace=True)
    performance = perf_df.dropna().to_dict(orient="records")

    # --- Monthly returns ---
    rent_cols = list(rent_mensal.columns)
    rent_rows = []
    for _, row in rent_mensal.iterrows():
        row_dict = {}
        for col in rent_cols:
            val = row[col]
            if isinstance(val, float) and not np.isnan(val):
                row_dict[str(col)] = round(val, 6)
            elif pd.isna(val):
                row_dict[str(col)] = None
            else:
                row_dict[str(col)] = str(val)
        rent_rows.append(row_dict)

    # --- Sector allocation (latest date only) ---
    latest_date = ativos["Data"].max()
    ativos_latest = ativos[ativos["Data"] == latest_date]
    alocacao_setor = ativos_latest.groupby("Setor").agg({"% PL": "sum"}).reset_index()
    alocacao_setor["% PL"] = (alocacao_setor["% PL"] * 100).round(2)
    sector_allocation = alocacao_setor.rename(columns={"Setor": "name", "% PL": "value"}).to_dict(orient="records")

    # --- Portfolio allocation evolution ---
    evolucao = ativos.groupby(["Data", "Categoria"]).agg({"% PL": "sum"}).reset_index()
    evolucao["% PL"] = (evolucao["% PL"] * 100).round(2)
    evolucao["Data"] = pd.to_datetime(evolucao["Data"]).dt.strftime("%Y-%m-%d")
    evolucao.rename(columns={"Data": "date", "Categoria": "category", "% PL": "value"}, inplace=True)
    portfolio_allocation = evolucao.to_dict(orient="records")

    # --- Portfolio stats ---
    cov_matrix = np.cov(his_cota["Rent - Kairos"], his_cota["Rent - Ibov"])
    cov_ki = cov_matrix[0, 1]
    var_ibov = np.var(his_cota["Rent - Ibov"], ddof=1)
    beta = round(float(cov_ki / var_ibov), 2)

    dp_kairos = round(float(his_cota["Rent - Kairos"].std()), 4) * 100
    dp_ibov = round(float(his_cota["Rent - Ibov"].std()), 4) * 100

    selic_hoje = float(selic_df["Selic Hoje"].iloc[0]) * 100
    n = 3
    selic_equiv = round(((1 + selic_hoje / 100) ** (n / 12) - 1) * 100, 4)

    sharpe_kairos = (float(rent_mensal["Total"].iloc[0]) - selic_equiv / 100) / (dp_kairos / 100)
    sharpe_ibov = (float(rent_mensal["Total"].iloc[1]) - selic_equiv / 100) / (dp_ibov / 100)

    portfolio_stats = {
        "beta": beta,
        "dpKairos": round(dp_kairos, 4),
        "dpIbov": round(dp_ibov, 4),
        "selic": round(selic_hoje, 4),
        "selicEquivalente": selic_equiv,
        "sharpeKairos": round(sharpe_kairos, 4),
        "sharpeIbov": round(sharpe_ibov, 4),
    }

    # --- VaR ---
    dias_uteis = 21
    z = 1.645
    base = 100.0
    var_data = {
        "diasUteis": dias_uteis,
        "valorEmRisco": base,
        "varKairos": round(z * (dp_kairos / 100) * float(np.sqrt(dias_uteis)) * base, 2),
        "varIbov": round(z * (dp_ibov / 100) * float(np.sqrt(dias_uteis)) * base, 2),
    }

    # --- Drawdown ---
    dd = his_cota[["Data ", "Acum - Kairos", "Acum - Ibov"]].copy()
    dd["peak_k"] = dd["Acum - Kairos"].cummax()
    dd["peak_i"] = dd["Acum - Ibov"].cummax()
    dd["dd_kairos"] = (dd["Acum - Kairos"] - dd["peak_k"]) * 100
    dd["dd_ibov"] = (dd["Acum - Ibov"] - dd["peak_i"]) * 100
    max_dd_k = round(float(dd["dd_kairos"].min()), 2)
    max_dd_i = round(float(dd["dd_ibov"].min()), 2)
    dd["Data "] = dd["Data "].dt.strftime("%Y-%m-%d")
    dd_history = dd[["Data ", "dd_kairos", "dd_ibov"]].rename(
        columns={"Data ": "date", "dd_kairos": "kairos", "dd_ibov": "ibov"}
    ).dropna().to_dict(orient="records")

    return {
        "reportDate": data_atual.strftime("%d/%m/%Y"),
        "quotaStats": quota_stats,
        "performance": performance,
        "monthlyReturns": {
            "columns": [str(c) for c in rent_cols],
            "data": rent_rows,
        },
        "sectorAllocation": sector_allocation,
        "portfolioAllocation": portfolio_allocation,
        "portfolioStats": portfolio_stats,
        "var": var_data,
        "drawdown": {
            "maxKairos": max_dd_k,
            "maxIbov": max_dd_i,
            "history": dd_history,
        },
    }


@app.get("/api/download/quota-history")
def download_quota_history():
    his_cota, _, _, _ = load_data()
    data_atual = his_cota["Data "].max()
    df = his_cota[["Data ", "Patrimônio", "Cota", "Rent - Kairos", "Acum - Kairos"]]
    buf = BytesIO()
    df.to_excel(buf, index=False, engine="openpyxl")
    buf.seek(0)
    filename = f"CLUBE_KAIROS_Historico_Cota_{data_atual.strftime('%m-%Y')}.xlsx"
    return StreamingResponse(
        buf,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )
