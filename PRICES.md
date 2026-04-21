# 💰 Precios de APIs — Modelos IA Testeados

> Todos los precios en **USD / 1M tokens**

---

## Tabla Unificada

| Modelo | Proveedor | Input | Cached Input | Output | Input Long | Cached Long | Output Long | Contexto |
|--------|-----------|------:|-------------:|-------:|-----------:|------------:|------------:|----------|
| GPT-5.4-nano | OpenAI | $0.05 | $0.02 | $1.25 | — | — | — | — |
| GPT-5-nano | OpenAI | $0.05 | $0.005 | $0.40 | — | — | — | — |
| GPT-5-mini | OpenAI | $0.25 | $0.025 | $2.00 | — | — | — | — |
| GPT-5.4-mini | OpenAI | $0.75 | $0.075 | $4.50 | — | — | — | — |
| Gemini-3-flash-preview | Google | $0.50 | $0.05 | $3.00 | — | — | — | — |
| Qwen 3.6 Plus | Alibaba | $0.50 | $0.10 | $3.00 | — | — | — | — |
| Kimi-k2.5 | Moonshot | $0.60 | $0.10 | $3.00 | — | — | — | 252k |
| DeepSeek 3.2 | DeepSeek | $0.2590 | $0.1350 | $0.4200 | — | — | — | 262k |
| GLM-4.7 | Zhipu | $0.60 | $0.30 | $2.20 | — | — | — | 252k |
| GPT-5 | OpenAI | $1.25 | $0.125 | $10.00 | — | — | — | — |
| GPT-5.1 | OpenAI | $1.25 | $0.125 | $10.00 | — | — | — | — |
| GLM-5 | Zhipu | $1.00 | $0.20 | $3.20 | — | — | — | 252k |
| GLM 5.1 | Zhipu | $1.40 | $0.26 | $4.40 | — | — | — | 202k |
| GPT-5.2 | OpenAI | $1.75 | $0.175 | $14.00 | — | — | — | — |
| Gemini-3.1-pro-preview | Google | $2.00* | $0.20* | $12.00* | $4.00* | $0.40* | $18.00* | — |
| GPT-4o | OpenAI | $2.50 | $1.25 | $10.00 | — | — | — | — |
| GPT-5.4 | OpenAI | $2.50 | $0.25 | $15.00 | $5.00 | $0.50 | $22.50 | — |
| GPT-5-pro | OpenAI | $15.00 | — | $120.00 | — | — | — | — |
| GPT-5.2-pro | OpenAI | $21.00 | — | $168.00 | — | — | — | — |
| GPT-5.4-pro | OpenAI | $30.00 | — | $180.00 | $60.00 | — | $270.00 | — |

> *Gemini-3.1-pro-preview: precios para contexto ≤200k tokens. Para >200k: Input $4.00, Cached $0.40, Output $18.00

---

## Por Proveedor

### OpenAI — GPT-5 Series

| Modelo | Input | Cached Input | Output | Input Long | Cached Long | Output Long |
|--------|------:|-------------:|-------:|-----------:|------------:|------------:|
| GPT-5-nano | $0.05 | $0.005 | $0.40 | — | — | — |
| GPT-5-mini | $0.25 | $0.025 | $2.00 | — | — | — |
| GPT-5.4-nano | $0.20 | $0.02 | $1.25 | — | — | — |
| GPT-5.4-mini | $0.75 | $0.075 | $4.50 | — | — | — |
| GPT-5 | $1.25 | $0.125 | $10.00 | — | — | — |
| GPT-5.1 | $1.25 | $0.125 | $10.00 | — | — | — |
| GPT-5.2 | $1.75 | $0.175 | $14.00 | — | — | — |
| GPT-5.4 | $2.50 | $0.25 | $15.00 | $5.00 | $0.50 | $22.50 |
| GPT-5-pro | $15.00 | — | $120.00 | — | — | — |
| GPT-5.2-pro | $21.00 | — | $168.00 | — | — | — |
| GPT-5.4-pro | $30.00 | — | $180.00 | $60.00 | — | $270.00 |

### OpenAI — GPT-4 Series

| Modelo | Input | Cached Input | Output |
|--------|------:|-------------:|-------:|
| GPT-4o | $2.50 | $1.25 | $10.00 |

### Google — Gemini

| Modelo | Input | Cached Input | Output | Input Long | Cached Long | Output Long |
|--------|------:|-------------:|-------:|-----------:|------------:|------------:|
| Gemini-3-flash-preview | $0.50 | $0.05 | $3.00 | — | — | — |
| Gemini-3.1-pro-preview | $2.00* | $0.20* | $12.00* | $4.00* | $0.40* | $18.00* |

*Para contexto ≤200k tokens.

### Alibaba — Qwen

| Modelo | Input | Cached Input | Output |
|--------|------:|-------------:|-------:|
| Qwen 3.6 Plus | $0.50 | $0.10 | $3.00 |

### Moonshot — Kimi

| Modelo | Input | Cached Input | Output | Contexto |
|--------|------:|-------------:|-------:|----------|
| Kimi-k2.5 | $0.60 | $0.10 | $3.00 | 252k |

### DeepSeek

| Modelo | Input | Cached Input | Output | Contexto |
|--------|------:|-------------:|-------:|----------|
| DeepSeek 3.2 | $0.2590 | $0.1350 | $0.4200 | 262k |

**SKUs / referencia**
- `deepseek-ai/deepseek-v3.2.online.cached-input-tokens` → $0.1350 / 1M
- `deepseek-ai/deepseek-v3.2.online.input-tokens` → $0.2590 / 1M
- `deepseek-ai/deepseek-v3.2.online.output-tokens` → $0.4200 / 1M

### Zhipu — GLM

| Modelo | Input | Cached Input | Output | Contexto |
|--------|------:|-------------:|-------:|----------|
| GLM-4.7 | $0.60 | $0.30 | $2.20 | 252k |
| GLM-5 | $1.00 | $0.20 | $3.20 | 252k |
| GLM 5.1 | $1.40 | $0.26 | $4.40 | 202k |
