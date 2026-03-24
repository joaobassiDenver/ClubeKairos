import pandas as pd
import streamlit as st
import plotly.express as px
import plotly.graph_objects as go
import numpy as np
from io import BytesIO

his_cota = pd.read_excel("Relatório_Gerencial_Denver.xlsx" ,sheet_name="Historico_Cota")

cotistas = pd.read_excel("Relatório_Gerencial_Denver.xlsx" ,sheet_name="Cotistas")

ativos = pd.read_excel("Relatório_Gerencial_Denver.xlsx" ,sheet_name="Ativos")

rent_mensal = pd.read_excel("Relatório_Gerencial_Denver.xlsx" ,sheet_name="Rent_Mensal", header=9)

selic_hoje = pd.read_excel("Relatório_Gerencial_Denver.xlsx" ,sheet_name="Selic")

nome_clube = "CLUBE DE INVESTIMENTO KAIROS"
data_atual = his_cota["Data "].max()

# Título estilizado
st.markdown(f"""
    <h1 style="text-align: center; color: rgb(138, 3, 248); font-weight: bold;">
        {nome_clube}
    </h1>
""", unsafe_allow_html=True)

# Data do relatório destacada
st.markdown(f"""
    <h4 style="text-align: center; color: #555;">
        Data Atual do Relatório: <span style="color: rgb(138, 3, 248); font-weight: bold;">{data_atual.strftime('%d/%m/%Y')}</span>
    </h4>
""", unsafe_allow_html=True)

st.markdown("---")

# Texto de introdução com formatação elegante
st.markdown(f"""
    <div style="text-align: justify; font-size: 16px; line-height: 1.6;">
        O <b>{nome_clube}</b> tem como objetivo a aquisição de ações focadas no longo prazo. 
        Nossa filosofia de investimento é clara e fundamentada:
    </div>
""", unsafe_allow_html=True)

# Citação em destaque
st.markdown(f"""
    <div style="text-align: center; font-size: 20px; font-weight: bold; font-style: italic; color: rgb(138, 3, 248); margin: 20px 0;">
        "O verdadeiro objetivo não é buscar ganhos rápidos, <br>
        mas garantir a preservação do capital e um crescimento sustentável."
    </div>
""", unsafe_allow_html=True)


# Fechamento da introdução
st.markdown(f"""
    <div style="text-align: justify; font-size: 16px; line-height: 1.6;">
        Seguimos essa filosofia em todos os nossos investimentos, buscando <b>um retorno sólido</b> 
        compatível com o nível de risco que consideramos aceitável.
    </div>
""", unsafe_allow_html=True)

st.markdown("---")


st.subheader("Estatísticas da cota")

cota_atual = round(his_cota["Cota"].iloc[-1], 6)

cota_min = round(his_cota["Cota"].min(), 6)

cota_max = round(his_cota["Cota"].max(), 6)

cota_med = round(np.mean(his_cota["Cota"]), 6)

estatisca_df = pd.DataFrame({
    "Cota Atual": [cota_atual],
    "Cota Mínima": [cota_min],
    "Cota Média": [cota_med],
    "Cota Máxima": [cota_max]
})


# 🔹 Estilização aprimorada da tabela
st.markdown("""
    <style>
        /* Centralizando a tabela */
        .stMarkdown {
            display: flex;
            justify-content: center;
        }

        /* Personalização geral */
        table {
            width: 60%;
            border-collapse: collapse;
            border-radius: 10px;
            overflow: hidden;
            background-color: #FDFDFD; /* Fundo leve */
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Cabeçalho */
        th {
            background-color: #5E17EB; /* Roxo moderno */
            color: white;
            font-size: 16px;
            padding: 12px;
            text-align: center;
            border-bottom: 3px solid #8A03F8;
        }

        /* Células */
        td {
            font-size: 15px;
            padding: 12px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }

        /* Hover */
        tr:hover td {
            background-color: #EEE4FF; /* Lilás suave */
        }
    </style>
""", unsafe_allow_html=True)

# 🔹 Exibir tabela com estilo aplicado
st.markdown(
    estatisca_df.to_html(index=False, escape=False), 
    unsafe_allow_html=True
)

st.markdown("---")

st.subheader("Rentabilidade Acumulada - Kairos x Ibovespa")


fig_rent_100 = px.line(his_cota, x="Data ", y=["Cota 100 - Ibov", "Cota 100 - Kairos"], title="Kairos x Ibov - Cota base R$ 100,00")
fig_rent_100.update_layout(xaxis_title="Data", yaxis_title="Valor da Cota (R$)")
st.plotly_chart(fig_rent_100)

st.markdown("""
    <div style='font-size:14px; color:#555; background-color:#F3F3F3; padding:10px; border-radius:8px;'>
        <strong>(¹) Ibovespa:</strong> Principal índice do mercado acionário brasileiro, composto pelas empresas mais representativas. 
        É utilizado como benchmark para comparação de investimentos em ações.
    </div>
""", unsafe_allow_html=True)

st.markdown("""
    <div style='font-size:14px; color:#555; background-color:#F3F3F3; padding:10px; border-radius:8px; margin-top:10px;'>
        <strong>(²) Rentabilidade Acumulada:</strong> Calculada a partir de 31/12/2025 até a presente data, considerando um investimento inicial de <strong>R$ 100</strong>.
    </div>
""", unsafe_allow_html=True)

st.markdown("---")

st.subheader("Quadro de Rentabilidade Mensal - Kairos x Ibovespa")

tabela_rent_mensal = rent_mensal  # Substitua com seu DataFrame real


def format_percent(value):
    if isinstance(value, (int, float)):
        color = "green" if value >= 0 else "red"
        return f'<span style="color:{color};">{value * 100:.2f}%</span>'
    return value

# 🔹 Aplicar a formatação na tabela
tabela_rent_mensal_formatted = tabela_rent_mensal.copy()
for col in tabela_rent_mensal.columns[1:]:  # Apenas colunas numéricas
    tabela_rent_mensal_formatted[col] = tabela_rent_mensal[col].apply(format_percent)

# 🔹 Estilização aprimorada para a tabela
st.markdown("""
    <style>
        /* Centralizando a tabela */
        .stMarkdown {
            display: flex;
            justify-content: center;
        }

        /* Personalização geral da tabela */
        table {
            width: 80%;
            border-collapse: collapse;
            border-radius: 10px;
            overflow: hidden;
            background-color: #FDFDFD; /* Fundo leve */
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        }

        /* Cabeçalho da tabela */
        th {
            background-color: #5E17EB; /* Roxo moderno */
            color: white;
            font-size: 16px;
            padding: 12px;
            text-align: center;
            border-bottom: 3px solid #8A03F8;
        }

        /* Células da tabela */
        td {
            font-size: 15px;
            padding: 12px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }

        /* Efeito hover */
        tr:hover td {
            background-color: #EEE4FF; /* Lilás suave */
        }
    </style>
""", unsafe_allow_html=True)

# 🔹 Exibir tabela no Streamlit
st.markdown(
    tabela_rent_mensal_formatted.to_html(index=False, escape=False), 
    unsafe_allow_html=True
)

st.markdown("---")


#st.subheader("Evolução do Patrimônio Líquido")

#fig_pl = px.line(his_cota, x="Data ", y="Patrimônio")
#st.plotly_chart(fig_pl)

#st.markdown("---")

#st.subheader("Evolução de Cotistas")

#evolucao_cotista = cotistas.groupby("Data").agg({"CPF": "count"})
#evolucao_cotista.reset_index(inplace=True)

#fig_cotista = px.line(evolucao_cotista, x="Data", y="CPF")
#fig_cotista.update_layout(xaxis_title = "Data", yaxis_title="Nº de Cotistas")
#st.plotly_chart(fig_cotista)

#st.markdown("---")

#st.subheader("Diversificação por Ativos")

#alocacao_ativos = ativos.groupby("Ativo").agg({"% PL": "sum"}) *100
#alocacao_ativos.reset_index(inplace=True)

#fig_evolucao_ativo = px.pie(alocacao_ativos, names="Ativo", values="% PL")

#st.plotly_chart(fig_evolucao_ativo)

#st.markdown("---")


st.subheader("Diversificação da Carteira por Setor")

alocacao_setor = ativos.groupby("Setor").agg({"% PL": "sum"}) *100
alocacao_setor.reset_index(inplace=True)

fig_evolucao = px.pie(alocacao_setor, names="Setor", values="% PL")

st.plotly_chart(fig_evolucao)

st.markdown("---")

st.subheader("Evolução da Alocação da Carteira por Ativos")

evolucao_alocacao = ativos.groupby(["Data", "Categoria"]).agg({"% PL": "sum"}).reset_index()

evolucao_alocacao["% PL"] = evolucao_alocacao["% PL"] * 100

fig_evolucao_alocacao = px.area(
    evolucao_alocacao,
    x="Data", 
    y="% PL", 
    color="Categoria",
    title="Evolução da Alocação (%)"
)

st.plotly_chart(fig_evolucao_alocacao)

st.markdown("---")

st.subheader("Estatísticas do Portifólio")

beta = his_cota[["Rent - Kairos", "Rent - Ibov"]]

cov_matrix = np.cov(his_cota["Rent - Kairos"], his_cota["Rent - Ibov"])
cov_kairos_ibov = cov_matrix[0, 1]

var_ibov = np.var(his_cota["Rent - Ibov"], ddof=1)

beta = round(float(cov_kairos_ibov / var_ibov), 2)

dp_kairos = round(float(his_cota["Rent - Kairos"].std()), 4)*100

dp_ibov = round(float(his_cota["Rent - Ibov"].std()), 4)*100

selic_hoje = selic_hoje["Selic Hoje"].iloc[0]*100

n=int(3)

selic_equivalente = round(((1 + (selic_hoje/100)) ** (n/12) -1) * 100, 4)

sharpe_kairos = (rent_mensal["Total"].iloc[0] - (selic_equivalente/100)) / ((dp_kairos/100))
sharpe_ibov = (rent_mensal["Total"].iloc[1] - (selic_equivalente/100)) / ((dp_ibov/100))

portifolio_df = pd.DataFrame({
    "Beta": [beta],
    "Desvio Padrão - Kairos (%)": [dp_kairos],
    "Desvio Padrão - Ibov (%)": [dp_ibov],
    "Taxa Selic (%)": [selic_hoje],
    "Selic Equivalente (%)": [selic_equivalente],
    "Sharpe - Kairos (%) (*)": [sharpe_kairos],
    "Sharpe - Ibov (%) (*)" : [sharpe_ibov],
})


st.markdown("""
    <style>
        /* Centralizando a tabela */
        .stMarkdown {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }

        /* Personalização geral */
        table {
            width: 100%;  /* Ajustando a largura para ocupar mais espaço */
            border-collapse: collapse;
            border-radius: 10px;
            overflow: hidden;
            background-color: #FDFDFD; /* Fundo leve */
            box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
            
        }

        /* Cabeçalho */
        th {
            background-color: #5E17EB; /* Roxo moderno */
            color: white;
            font-size: 14px;
            padding: 2px;
            text-align: center;
        }

        /* Células */
        td {
            font-size: 14px;
            padding: 12px;
            text-align: center;
            border-bottom: 1px solid #ddd;
        }

        /* Hover */
        tr:hover td {
            background-color: #EEE4FF; /* Lilás suave */
        }
    </style>
""", unsafe_allow_html=True)

# 🔹 Exibir tabela com estilo aplicado
st.markdown(
    portifolio_df.to_html(index=False, escape=False), 
    unsafe_allow_html=True
)

# 🔹 Explicação do Sharpe com formatação aprimorada
st.markdown("""
    <div style='font-size:14px; color:#555; background-color:#F3F3F3; padding:10px; border-radius:8px; text-align:center;'>
        <strong>(*) Índice de Sharpe:</strong> mede a relação entre risco e retorno de um investimento, indicando se os retornos obtidos foram suficientes para compensar a volatilidade assumida. Quanto maior o índice, melhor foi a rentabilidade ajustada ao risco. 
    </div>
""", unsafe_allow_html=True)

st.markdown("---")


st.subheader("VaR - Value at Risk")

st.markdown("""
    <div style='font-size:14px; color:#555; background-color:#F3F3F3; padding:10px; border-radius:8px;'>
        <strong>(*) VaR: </strong> Mede a perda máxima esperada em um intervalo de 21 dias úteis com intervalo de confiança de 95%. 
    </div>
""", unsafe_allow_html=True)

dias_uteis = 21
intervalo_confianca_z_norm = 1.645
valor_em_risco = 100

var_kairos = intervalo_confianca_z_norm * (dp_kairos/100) * np.sqrt(dias_uteis) * valor_em_risco
var_ibov = intervalo_confianca_z_norm * (dp_ibov/100) * np.sqrt(dias_uteis) * valor_em_risco

texto_var_clube = f"Clube - Temos um probabilidade de 5% de perder um valor superior a R$ {round(var_kairos, 2)} em um período de {dias_uteis} dias."
texto_var_ibov = f"Ibovespa - Temos um probabilidade de 5% de perder um valor superior a R$ {round(var_ibov, 2)} em um período de {dias_uteis} dias."

st.text("")

st.text(texto_var_clube)

st.text("")

st.text(texto_var_ibov)

st.markdown("---")

st.subheader("Drawndown Máximo")

import pandas as pd
import plotly.graph_objects as go
import streamlit as st

# Supondo que 'his_cota' já está definido e é um DataFrame
dd_df = pd.DataFrame()
dd_df = his_cota[["Acum - Kairos", "Acum - Ibov"]]

# Calcular o pico acumulado
dd_df['Pico_Acumulado_Kairos'] = dd_df['Acum - Kairos'].cummax()
dd_df['Pico_Acumulado_Ibov'] = dd_df['Acum - Ibov'].cummax()

# Calcular o drawdown
dd_df['Drawdown_Kairos'] = (dd_df['Acum - Kairos'] - dd_df['Pico_Acumulado_Kairos'])
dd_df['Drawdown_Ibov'] = (dd_df['Acum - Ibov'] - dd_df['Pico_Acumulado_Ibov'])

# Exibir o drawdown máximo
max_drawdown_Kairos = dd_df['Drawdown_Kairos'].min()
max_drawdown_Ibov = dd_df['Drawdown_Ibov'].min()
st.subheader(f"Drawdown Máximo - Clube: {max_drawdown_Kairos:.2%}")
st.subheader(f"Drawdown Máximo - Ibov: {max_drawdown_Ibov:.2%}")

# Criar o gráfico do drawdown
fig = go.Figure()

# Adicionar a linha de Drawdown para Kairos
fig.add_trace(go.Scatter(
    x=dd_df.index,
    y=dd_df['Drawdown_Kairos'],
    mode='lines',
    name='Drawdown Kairos',
    line=dict(color='blue')
))

# Adicionar a linha de Drawdown para Ibov
fig.add_trace(go.Scatter(
    x=dd_df.index,
    y=dd_df['Drawdown_Ibov'],
    mode='lines',
    name='Drawdown Ibov',
    line=dict(color='red')
))

fig.update_layout(
    title='Comparativo de Drawdown ao Longo do Tempo',
    xaxis_title='Data',
    yaxis_title='Drawdown',
    yaxis_tickformat='.2%',
    showlegend=True
)

st.plotly_chart(fig)

st.markdown("---")

st.subheader("Baixar Relatórios")

def save_to_excel(df):
    buffer = BytesIO()
    df.to_excel(buffer, index=False, engine='openpyxl')
    buffer.seek(0)
    return buffer

his_cota_download_df = his_cota[["Data ", "Patrimônio", "Cota", "Rent - Kairos", "Acum - Kairos"]]

his_cota_download = save_to_excel(his_cota_download_df)

st.download_button("Baixar Histórico de Cota", his_cota_download, 
                   file_name=f"{nome_clube}_Histórico_Cota_{data_atual.strftime('%m-%Y')}.xlsx")

composicao_carteira_atual = ativos[ativos["Data"] == data_atual]

composicao_carteira_atual_download = save_to_excel(composicao_carteira_atual)

#st.download_button(f"Baixar Composição da Carteira - {data_atual.strftime('%d/%m/%Y')}", composicao_carteira_atual_download, file_name=f"{nome_clube}_Composição_Carteira_{data_atual.strftime('%m-%Y')}.xlsx")

st.markdown("""
    <style>
        .footer {
            position: fixed;
            bottom: 0;
            left: 0;
            width: 100%;
            background-color:rgb(138, 3, 248);
            color: rgb(255, 255, 255);
            text-align: center;
            padding: 10px;
            font-size: 14px;
        }
    </style>
    <div class="footer">
        © 2025 Denver Asset
    </div>
""", unsafe_allow_html=True)
