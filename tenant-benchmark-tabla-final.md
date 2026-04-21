# Tabla final — benchmark tenant flow

> Benchmark v2 del tenant flow: 3 tareas, score total sobre **24 puntos**.

## Veredicto final

| Modelo | Score | Sobreingeniería | Costo benchmark | Tiempo benchmark | Veredicto |
|---|---:|---:|---:|---:|---|
| kimi-k2p6 | 19/24 | 2/3 | $0.3145 | 3:42.14 | ✅ **Conviene** |
| accounts/fireworks/models/kimi-k2p5 | 18/24 | 1/3 | $0.1644 | 1:51.51 | ✅ **Conviene** |
| DeepSeek-V3.2 | 18/24 | 1/3 | $0.2555 | 14:29.82 | 🟡 **Depende** |
| GPT-5.4 Mini | 16/24 | 1/3 | $0.1687 | 5:07.05 | 🟡 **Depende** |
| MiniMax-M2.7 | 16/24 | 0/3 | $0.1263 | 4:01.31 | 🟡 **Depende** |
| GPT-5.4 | 19/24 | 1/3 | $0.6153 | 4:29.64 | 🟡 **Depende** |
| accounts/fireworks/models/glm-4p7 | 18/24 | 0/3 | $0.5834 | 1:55.90 | 🔴 **No conviene** |
| accounts/fireworks/models/glm-5p1 | 21/24 | 2/3 | $0.6886 | 6:08.42 | 🔴 **No conviene** |
| Gemini 3 Flash | 17/24 | 0/3 | $0.4692 | 3:06.01 | 🔴 **No conviene** |
| accounts/fireworks/models/qwen3p6-plus | 17/24 | 0/3 | $0.4224 | 6:39.70 | 🔴 **No conviene** |

## Detalle comparativo

| Puesto | Modelo | Score | Sobreingeniería | Costo (USD) | Tiempo | Observación |
|---:|---|---:|---:|---:|---:|---|
| 1 | accounts/fireworks/models/glm-5p1 | 21/24 | 2/3 | 0.6886 | 6:08.42 | Máximo score, pero costo alto y balance peor. |
| 2 | kimi-k2p6 | 19/24 | 2/3 | 0.3145 | 3:42.14 | Mejor balance general actual entre score, costo y velocidad. |
| 3 | GPT-5.4 | 19/24 | 1/3 | 0.6153 | 4:29.64 | Buen score, pero demasiado caro frente a alternativas cercanas. |
| 4 | accounts/fireworks/models/kimi-k2p5 | 18/24 | 1/3 | 0.1644 | 1:51.51 | Mejor opción costo/velocidad entre los de 18/24. |
| 5 | DeepSeek-V3.2 | 18/24 | 1/3 | 0.2555 | 14:29.82 | Sólido y relativamente barato, pero penalizado fuerte por latencia. |
| 6 | accounts/fireworks/models/glm-4p7 | 18/24 | 0/3 | 0.5834 | 1:55.90 | Más caro que otras opciones con el mismo score. |
| 7 | Gemini 3 Flash | 17/24 | 0/3 | 0.4692 | 3:06.01 | Correcto, pero superado en valor por opciones más baratas o con mejor score. |
| 8 | accounts/fireworks/models/qwen3p6-plus | 17/24 | 0/3 | 0.4224 | 6:39.70 | Resultado medio con tiempo pobre. |
| 9 | GPT-5.4 Mini | 16/24 | 1/3 | 0.1687 | 5:07.05 | Económico, pero score bajo para ser elección principal. |
| 10 | MiniMax-M2.7 | 16/24 | 0/3 | 0.1263 | 4:01.31 | Muy barato, aunque queda corto en calidad final. |

## Resultados finales

- **Ganador por score bruto:** `accounts/fireworks/models/glm-5p1` con **21/24**.
- **Ganador por balance general:** `kimi-k2p6`.
- **Mejor opción costo/velocidad dentro de los modelos fuertes:** `accounts/fireworks/models/kimi-k2p5`.
- **Nuevo ingreso destacado:** `DeepSeek-V3.2` entra con **18/24**, costo todavía competitivo y poca sobreingeniería, pero con una penalización muy fuerte en tiempo total.
- **Patrón del benchmark:** los modelos tienden a acercarse en correctitud funcional, pero se separan por minimalismo, tests-trampa para `tnt_002`, costo y latencia.
