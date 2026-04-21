En bugfixing la diferencia grande no está solo en “razonar”, sino en detectar correctamente qué parte del sistema manda: framework, librería, datos, renderizado o evento.


# Mega Menu Test

> Test comparativo de modelos IA para bugfixing en Frontend
>
> La prueba se está realizando sin documentación de referencia ni orientación previa. El agente debe inferir por sí solo la arquitectura del proyecto y el stack utilizado.

---

## 📊 Notas sobre Tokens

Los tokens mostrados en la barra de estado reflejan:

1. **Totales acumulados dentro de la sesión**:
   - **Prompt tokens** (`↑`): enviados al modelo.
   - **Completion tokens** (`↓`): recibidos del modelo.
   - **Cache tokens** (`R`): reutilizados desde el caché (reduce costos y latencia).

2. **Persistencia y reinicio**:
   - Los valores acumulados se resetean únicamente al:
     - Iniciar sesión nueva (`/new`).
     - Compactar sesión (`/compact`).

3. **Importancia de Cache (R)**:
   - Ejemplo: `R915K` indica 915,000 tokens reutilizados del caché, optimizando desempeño.

> ⚠️ Los valores en las tablas de resultados son **acumulados por sesión**. Cada intento sucesivo suma sobre el anterior (↑prompt, ↓completion, Rcache). No representan el costo del intento individual.

---

## 🔍 Análisis del Test

### Task 1 — El verdadero desafío: DaisyUI

El bug de hover no es un problema de CSS genérico ni de event listeners de JavaScript. La causa raíz está en cómo **DaisyUI 5 implementa `dropdown-hover`**: el componente genera una zona de hover invisible que se extiende más allá del trigger visible. Resolver esto correctamente requiere que el modelo identifique la librería, entienda cómo funciona su sistema de dropdown, y aplique la solución dentro de sus patrones — no reemplazándolos.

El enfoque que toma cada modelo revela su capacidad de razonamiento sobre dependencias externas:

| Enfoque | Descripción | Riesgo |
|---------|-------------|--------|
| **CSS puro** | Ajusta `pointer-events`, `z-index` o áreas de hover sin tocar DaisyUI | Suele romper el comportamiento de apertura |
| **JS listeners** | Reemplaza el mecanismo de DaisyUI con lógica custom | Pierde el hover nativo, cambia a click |
| **DaisyUI-aware** | Entiende que el problema está en la clase `dropdown-hover` y trabaja dentro de sus constraints | Solución limpia y estable |

Los modelos que cambian el menú de **hover a click** están tomando el camino de menor resistencia: eliminan el problema reemplazando el mecanismo de apertura. Técnicamente "arreglan" el hover zone, pero no entendieron el constraint real.

### Task 2 — Condición en el dato

La dificultad aquí es sutil: `children` siempre es un array (nunca `undefined`), por lo que el check no es `if (category.children)` sino `if (category.children.length > 0)`. Los modelos que no leen el data file primero tienden a escribir la condición incorrecta o a renderizar un panel vacío en lugar de ocultarlo.

---

## 🤖 Resultados de Testeo de Agentes IA

### DeepSeek 3.2

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑585k ↓8.4k R171k | Resuelto en el primer intento, aunque tomó bastante tiempo |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑562k ↓14k R349k | Resuelto en el primer intento, pero hizo sobreingeniería y tomó bastante tiempo |

### Gemini 2.5-flash

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑87k ↓5.6k R84k | Resuelto en el primer intento, muy rápido y eficiente en tokens. |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ❌ Fallido | ↑131k ↓11k | No solucionó el problema y rompió el layout del menú. |
| 2 | ❌ Fallido (Abortado) | ↑724k ↓35k R1.2M | Lo rompió todo. Test abortado. |


### Gemini 3-flash-preview

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ❌ Fallido | ↑84k ↓5.3k R673k | Error de sintaxis: dejó un tag div mal cerrado que rompió el código. |
| 2 | ✔️ Resuelto | ↑84k ↓5.3k R673k | Solucionó la tarea rápidamente. El error anterior era un div mal cerrado. |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑43k ↓2.4k R71k | Hyper rápido, resultado perfecto. |

### Gemini 3-flash-preview (Test con contexto)

> **Nota:** Este test usó un archivo `AGENTS` para dar contexto al modelo. El archivo `AGENTS.md` contenía ~400+ líneas con información del stack, convenciones, y estructura del proyecto.

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑101k ↓2.3k R358k | Primer intento. Resuelto. Muy Rapido! |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑6.9k ↓2.3k R142k | Primer intento. Resuelto. Hiper Rapido! |

### GPT-4o

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ⚠️ Parcial | ↑38k ↓3.2k R253k | No se resolvió el problema, pero no se rompió nada existente. |
| 2 | ⚠️ Parcial | ↑38k ↓3.6k R333k | Agregó lógica de debounce a `handleMouseEnterWithDebounce`, pero el problema persiste. |
| 3 | ❌ Test abortado | ↑39k ↓7.3k R754k | No solucionó ni rompió. |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|

### GPT-5-mini

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ❌ Fallido | ↑38k ↓3.2k R249k | Mezcló sintaxis de Svelte 4 (`onmouseenter="..."`) con sintaxis de Svelte 5 (`on:mouseleave`), generando un error de sintaxis que rompió el proyecto. |
| 2 | ⚠️ Parcial | ↑45k ↓5.5k R478k | Solucionó el bug original pero cambió el comportamiento: ahora requiere click para abrir el menú en lugar de hover. |
| 3 | ❌ Fallido | ↑52k ↓8.7k R807k | El menú dejó de funcionar completamente: no abre ni con hover ni con click. |
| 4 | ❌ Fallido (Abortado) | ↑64k ↓13k R1.2M | Arregló el bug inicial, pero rompió más comportamientos críticos. Test abortado. |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|

### GPT-5.4-mini

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑47k ↓8.7k R436k | Tiempo moderado. |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑43k ↓8.9k R289k | Resultado excelente, incluso agregó un efecto apropiado. Velocidad interesante. |

### GLM 5.1

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑132k ↓37k R442k | A pesar de que tomó muchísimo tiempo, resolvió lo pedido |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑23k ↓5.7k R349k | Resuelto en el primer intento |

### Kimi-k2.5

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ⚠️ Parcial | ↑520k ↓4.8k R129k | Solucionó el bug pero hizo que el menú se abra con Click no con Hover |
| 2 | ✔️ Resuelto | ↑907k ↓8.0k R291k | Problema corregido, comportamiento esperado alcanzado |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑317k ↓4.5k | Resuelto en el primer intento |

### Kimi-k2.5 (Test con archivo AGENTS como contexto)

> **Nota:** Este test usó un archivo `AGENTS` para dar contexto al modelo. El archivo `AGENTS.md` contenía ~400+ líneas con información del stack, convenciones, y estructura del proyecto.

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑97k ↓4.7k R605k | Primer intento exitoso, rápido y eficiente |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑17k ↓4.4k R289k | Primer intento exitoso |

> **Precios Kimi-k2.5:** $0.60/1M input (uncached), $0.10/1M cached input, $3.00/1M output

### MiniMax-M2.7

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ⚠️ Parcial | ↑44k ↓3.6k R301k | Resolvió el issue original, pero introdujo un nuevo bug: el menú ya no permanece abierto |
| 2 | ⚠️ Parcial | ↑99k ↓5.5k R528k | Resolvió parcialmente, pero el estado del menú sigue siendo inconsistente al cerrar |
| 3 | ✔️ Resuelto | ↑103k ↓7.8k R832k | Problema corregido completamente, funcionalidad restaurada satisfactoriamente |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ❌ Fallido | ↑102k ↓7.3k | Renderizó el panel derecho con menos contenido del esperado, problema persiste |
| 2 | ⚠️ Parcial | ↑104k ↓9.3k R622k | Hizo bien lo pedido en categorías sin hijos, pero rompió el panel en categorías con hijos |
| 3 | ❌ Fallido | ↑106k ↓11k R784k | Restauró el comportamiento original, pero sigue mostrando algo en categorías sin hijos |
| 4 | ❌ Fallido | ↑108k ↓12k R895k | Test abortado, no logró cumplir la consigna |

#### MiniMax-M2.7 (Test con archivo AGENTS como contexto)

> **Nota:** Este test usó un archivo `AGENTS` para dar contexto al modelo. Sorprendentemente, el rendimiento fue **peor** que el test anterior sin contexto adicional.

##### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ⚠️ Parcial | ↑57k ↓2.8k R351k | Resolvió el issue original, pero cambió hover por click |
| 2 | ⚠️ Parcial | ↑133k ↓6.4k R597k | Hover restaurado, pero el menú cierra al bajar el mouse |
| 3 | ❌ Test abortado | ↑247k ↓10k R843k W92k | Sin mejora respecto al test sin contexto. Test abortado |

### GLM-5 (Test con archivo AGENTS como contexto)

> **Nota:** Este test usó un archivo `AGENTS` para dar contexto al modelo. El archivo `AGENTS.md` contenía ~400+ líneas con información del stack, convenciones, y estructura del proyecto.

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑51k ↓2.2k R360k | Primer intento exitoso, sin problemas |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑18k ↓8.4k R437k | Primer intento exitoso, rápido y eficiente |

> **Precios GLM-5:** $1.00/1M input (uncached), $0.20/1M cached input, $3.20/1M output

### GLM-4.7 (Test con archivo AGENTS como contexto)

> **Nota:** Este test usó un archivo `AGENTS` para dar contexto al modelo. El archivo `AGENTS.md` contenía ~400+ líneas con información del stack, convenciones, y estructura del proyecto.

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑77k ↓12k R660k | Super rápido, primer intento exitoso |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ✔️ Resuelto | ↑72k ↓8.7k R1.2M | Super rápido, primer intento exitoso |

> **Precios GLM-4.7:** $0.60/1M input (uncached), $0.30/1M cached input, $2.20/1M output

### Qwen3.6-Plus (AtlasCloud Provider)

#### Task 1

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ❌ Fallido | ↑609k ↓5.8k 38.9%/128k | No se logró la corrección esperada |
| 2 | ✔️ Resuelto | ↑1.0M ↓9.7k | Problema corregido, comportamiento esperado alcanzado |

#### Task 2

| Intento | Resultado | Tokens (↑ prompt / ↓ completion / R cache) | Observaciones |
|---------|-----------|---------------------------------------------|---------------|
| 1 | ⚠️ Parcial | ↑51k ↓7.3k R430k | Hay un efecto raro como de tilt |
| 2 | ❌ Fallido | ↑-- ↓-- | Lo rompió mucho más. Test abortado |



## 💰 Pricing de APIs (USD / 1M tokens)

### GPT-5 Series

| Modelo         | Input (Short) | Cached Input | Output | Input (Long) | Cached Input (Long) | Output (Long) |
|----------------|---------------|--------------|--------|---------------|---------------------|---------------|
| GPT-5.4        | $2.50         | $0.25        | $15.00 | $5.00         | $0.50               | $22.50        |
| GPT-5.4-mini   | $0.75         | $0.075       | $4.50  | —             | —                   | —             |
| GPT-5.4-nano   | $0.20         | $0.02        | $1.25  | —             | —                   | —             |
| GPT-5.4-pro    | $30.00        | —            | $180.00| $60.00        | —                   | $270.00       |
| GPT-5.2        | $1.75         | $0.175       | $14.00 | —             | —                   | —             |
| GPT-5.2-pro    | $21.00        | —            | $168.00| —             | —                   | —             |
| GPT-5.1        | $1.25         | $0.125       | $10.00 | —             | —                   | —             |
| GPT-5          | $1.25         | $0.125       | $10.00 | —             | —                   | —             |
| GPT-5-mini     | $0.25         | $0.025       | $2.00  | —             | —                   | —             |
| GPT-5-nano     | $0.05         | $0.005       | $0.40  | —             | —                   | —             |
| GPT-5-pro      | $15.00        | —            | $120.00| —             | —                   | —             |

### GPT-4 Series

| Modelo              | Input (Short) | Cached Input | Output | Input (Long) | Cached Input (Long) | Output (Long) |
|---------------------|---------------|--------------|--------|---------------|---------------------|---------------|
| GPT-4o              | $2.50         | $1.25        | $10.00 | —             | —                   | —             |

### Gemini

| Modelo               | Input (Short) | Cached Input | Output | Input (Long) | Cached Input (Long) |
|----------------------|---------------|-------------|--------|-------------|---------------------|
| Gemini-3-flash-preview | $0.50        | $0.05       | $3.00  | —           | —                   |
| Gemini-3.1-pro-preview | $2.00*       | $0.20*      | $12.00*| $4.00*      | $0.40*              |

*_Para instrucciones ≤200k tokens. Precios para >200k tokens: Input $4.00, Cached $0.40, Output $18.00_

### Kimi

| Modelo               | Input (Short) | Cached Input | Output | Context |
|----------------------|---------------|--------------|--------|----------|
| Kimi-k2.5            | $0.60         | $0.10        | $3.00  | 252k    |
| Kimi-k2.6            | $0.95         | $0.16        | $4.00  | 262k    |

### DeepSeek

| Modelo               | Input (Short) | Cached Input | Output | Context |
|----------------------|---------------|--------------|--------|----------|
| DeepSeek 3.2         | $0.60         | $0.10        | $3.00  | 262k    |

### GLM

| Modelo               | Input (Short) | Cached Input | Output | Context |
|----------------------|---------------|--------------|--------|----------|
| GLM 5.1              | $1.40         | $0.26        | $4.40  | 202k    |
| GLM-5                | $1.00         | $0.20        | $3.20  | 252k    |
| GLM-4.7              | $0.60         | $0.30        | $2.20  | 252k    |

---

## 🏆 Modelos que resolvieron ambas tareas en el primer intento

Modelos ordenados por **costo total** (calculado como: `↑ × input + R × cached + ↓ × output` para ambas tasks combinadas):

| # | Modelo | Task 1 Tokens | Task 2 Tokens | Costo Task 1 | Costo Task 2 | **Costo Total** |
|---|--------|--------------|--------------|-------------|-------------|----------------|
| 1 | Gemini 3-flash-preview (contexto) | ↑101k ↓2.3k R358k | ↑6.9k ↓2.3k R142k | ~$0.075 | ~$0.017 | **~$0.09** |
| 2 | Kimi-k2.5 (contexto) | ↑97k ↓4.7k R605k | ↑17k ↓4.4k R289k | ~$0.133 | ~$0.052 | **~$0.19** |
| 3 | GPT-5.4-mini | ↑47k ↓8.7k R436k | ↑43k ↓8.9k R289k | ~$0.107 | ~$0.094 | **~$0.20** |
| 4 | GLM-5 (contexto) | ↑51k ↓2.2k R360k | ↑18k ↓8.4k R437k | ~$0.130 | ~$0.132 | **~$0.26** |
| 5 | GLM 5.1 | ↑132k ↓37k R442k | ↑23k ↓5.7k R349k | ~$0.463 | ~$0.148 | **~$0.61** |
| 6 | GLM-4.7 (contexto) | ↑77k ↓12k R660k | ↑72k ↓8.7k R1.2M | ~$0.271 | ~$0.422 | **~$0.69** |
| 7 | DeepSeek 3.2 | ↑585k ↓8.4k R171k | ↑562k ↓14k R349k | ~$0.393 | ~$0.414 | **~$0.81** |

> **Observaciones:**
> - 🥇 Gemini 3-flash con contexto es **9× más barato** que DeepSeek 3.2 logrando el mismo resultado
> - 🔑 Los modelos con **contexto (AGENTS.md)** dominan el top 4 — el cache reduce drásticamente el costo real
> - ⚠️ GLM-4.7 sube al #6 por el R1.2M en Task 2 (el cache write tiene costo aunque reducido)
> - 💸 DeepSeek 3.2 es el más caro del grupo por sus altos valores de ↑ (tokens nuevos sin cachear)

---

## 📊 Tabla final — benchmark tenant flow

Criterio de evaluación final: **score total + poca sobreingeniería + buen costo + buen tiempo**.

| Modelo | Score | Sobreingeniería | Costo benchmark | Tiempo benchmark | Veredicto |
|---|---:|---:|---:|---:|---|
| kimi-k2p6 | 19/24 | 2/3 | $0.3145 | 3:42.14 | ✅ **Conviene** |
| accounts/fireworks/models/kimi-k2p5 | 18/24 | 1/3 | $0.1644 | 1:51.51 | ✅ **Conviene** |
| GPT-5.4 Mini | 16/24 | 1/3 | $0.1687 | 5:07.05 | 🟡 **Depende** |
| MiniMax-M2.7 | 16/24 | 0/3 | $0.1263 | 4:01.31 | 🟡 **Depende** |
| GPT-5.4 | 19/24 | 1/3 | $0.6153 | 4:29.64 | 🟡 **Depende** |
| accounts/fireworks/models/glm-4p7 | 18/24 | 0/3 | $0.5834 | 1:55.90 | 🔴 **No conviene** |
| accounts/fireworks/models/glm-5p1 | 21/24 | 2/3 | $0.6886 | 6:08.42 | 🔴 **No conviene** |
| Gemini 3 Flash | 17/24 | 0/3 | $0.4692 | 3:06.01 | 🔴 **No conviene** |
| accounts/fireworks/models/qwen3p6-plus | 17/24 | 0/3 | $0.4224 | 6:39.70 | 🔴 **No conviene** |

### Conclusiones

- **Modelo más balanceado:** `kimi-k2p6` si querés un score alto sin pagar el salto de GPT-5.4; `accounts/fireworks/models/kimi-k2p5` sigue siendo el mejor ultra-eficiente.
- **Mejor score absoluto:** `accounts/fireworks/models/glm-5p1`
- **Más barato:** `MiniMax-M2.7`
- **Más rápido:** `accounts/fireworks/models/kimi-k2p5`
- **Mejor upgrade sobre GPT-5.4 en costo/score:** `kimi-k2p6` empata en score (19/24), cuesta ~49% menos y además tarda menos.

### Lectura rápida del veredicto

- ✅ **Conviene**: buen equilibrio entre calidad, costo y tiempo.
- 🟡 **Depende**: puede servir si priorizás una variable específica (por ejemplo costo mínimo o algo más de score).
- 🔴 **No conviene**: queda superado por alternativas más baratas, más rápidas o con menos sobreingeniería.

---

## Fix a bug in the Mega Menu hover behavior.

Problem:
The submenu is being triggered (hover state activated) when the cursor passes through an area where the submenu should not be active or visible.

Expected behavior:

The submenu should only open when the user hovers directly over a valid menu trigger (e.g., category item).
Moving the cursor outside the trigger area must NOT activate the submenu.
There should be no invisible hover zones causing unintended activation.

Tasks:

Identify the source of the incorrect hover trigger (CSS hover area, event bubbling, or JS listeners).
Ensure hover detection is strictly scoped to the intended element.
If needed, adjust pointer events, z-index, or event delegation logic.
Prevent accidental activation when moving between elements.

Acceptance criteria:

Submenu only appears on intentional hover over a valid trigger.
No activation occurs in empty or unrelated areas.
Smooth UX when moving cursor across the menu.


## Improve Mega Menu rendering logic for categories without children.

Problem:
The right-side panel (children panel) is rendered even when the selected category has no child items.

Expected behavior:

If a category has no children, the right panel should NOT be displayed.
The layout should adapt gracefully (no empty panel or placeholder).

Tasks:

Add a conditional check to verify if the category has children before rendering the panel.
Ensure UI layout remains consistent when the panel is hidden.
Avoid unnecessary DOM rendering for empty states.

Acceptance criteria:

Categories without children do not render the right panel.
No empty UI blocks are visible.
Layout remains clean and aligned.