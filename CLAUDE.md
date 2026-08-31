# Financial — Astro app

Landing page de **Financial** (plataforma de formalización de emprendedores municipales vía WhatsApp + IA), construida con **Astro**. Esta es la versión vigente del sitio — reemplaza al prototipo estático `index.html` que vive un nivel arriba (`../index.html`), que ya no se edita.

## Stack

- **Astro 7** (`astro.config.mjs`), sin framework de UI adicional (solo `.astro` + islas de `<script>` cliente donde hace falta interactividad).
- **Tailwind CSS v4** vía `@tailwindcss/vite` (config CSS-first, no hay `tailwind.config.js`). El theme de marca está definido en `src/styles/global.css` con un bloque `@theme` (`--color-petrol`, `--color-emerald`, `--color-teal`), que Tailwind expone como `bg-petrol`, `text-emerald`, etc.
- Fuente: Plus Jakarta Sans (Google Fonts, cargada en `Layout.astro`).
- Sin CMS ni backend: contenido hardcodeado en los componentes `.astro`.

## Paleta — restricción explícita del cliente

Solo estos colores en todo el sitio: **`#024655` (petrol)**, **`#50C887` (emerald)**, **`#139381` (teal)**, **negro** y **blanco**. Variación tonal solo vía opacidad sobre estos mismos colores (`bg-white/5`, `border-emerald/25`, etc.), nunca introduciendo grises/ámbar/otros tonos con hex propio. Fondo base del sitio: negro (`bg-black` en `<body>`).

Excepción: el logo de la Feria de Software (`Logo Light Mode FESW.svg`) se muestra con sus colores reales de marca (no se recolorea) — es un logo de partner, no parte de nuestro sistema de diseño. Se aloja dentro de un chip blanco en el footer para que su texto oscuro quede legible sobre el fondo negro del sitio.

## Estructura

```
src/
├── assets/                    # Financial isotipo.svg, Logo Financial.svg, Logo Light Mode FESW.svg
├── layouts/
│   └── Layout.astro           # <head>, fuente, favicon (isotipo), import de global.css
├── components/
│   ├── Header.astro           # nav sticky + menú móvil (script inline)
│   ├── Hero.astro             # kicker + headline + CTAs + fila de stats (sin mockup)
│   ├── Diagnostico.astro      # 3 cards de problema
│   ├── ComoFunciona.astro     # timeline numerado (3 pasos) + mockup de WhatsApp
│   ├── Beneficios.astro       # bento grid B2G (3 cards)
│   ├── Convenio.astro         # comparativa $0 vecino vs. suscripción municipio
│   ├── RoiSimulador.astro     # <select> + 3 métricas actualizadas por script inline
│   ├── CasosDeUso.astro       # 4 cards de rubros
│   ├── Seguridad.astro        # layout 2 columnas: heading + lista con separadores
│   ├── CtaFinal.astro
│   └── Footer.astro           # logo + tagline + logo FESW (en chip blanco) + columnas de links
├── pages/
│   └── index.astro            # ensambla todos los componentes + script de scroll-reveal
└── styles/
    └── global.css             # @theme de Tailwind v4, keyframes, clases utilitarias (.reveal, .chat-bubble-*, etc.)
```

Anclas del nav (todas dentro de `index.astro`, en orden): `#como-funciona`, `#municipalidad`, `#impacto-roi`, `#casos-de-uso`, `#seguridad`, más `#cta-final` para el botón principal.

## Decisiones de diseño (por qué se ve así)

- **Plantilla de referencia**: el cliente pidió tomar como base **https://hiro.feriadesoftware.cl/#seguridad** (otro proyecto de la misma Feria de Software). De ahí vienen estos patrones, adaptados a nuestra paleta:
  - Hero **sin** mockup de producto — solo kicker, headline grande con una palabra en itálica de acento (`<em class="text-emerald italic">`), párrafo, dos CTAs y una fila de 3 stats separada por un borde superior.
  - El mockup de WhatsApp (que en el prototipo estático vivía en el Hero) se movió a **"Cómo funciona"**, igual que HIRO combina su timeline de pasos con el mockup de su app.
  - Timeline numerado con línea conectora vertical (`border-l-2` + círculos posicionados con `-left-12`, sin `translate` — ver nota abajo).
  - "Seguridad" usa el layout de dos columnas de HIRO: heading grande a la izquierda, lista de ítems con `border-t` como separador a la derecha (sin cards).
  - Botones CTA: píldora `bg-emerald text-petrol` con glow (`shadow-[0_0_...rgba(80,200,135,...)]`), igual función que el botón peach de HIRO pero en nuestro verde.
- **Cifras del simulador ROI**: inventadas para la demo, escaladas desde el único dato real que dio el cliente (1.800 h/año para comuna intermedia). Ver `roiData` en `RoiSimulador.astro`. Reemplazar antes de un lanzamiento real.
- **Sin Ley 21.180 ni Ley 19.628**: el cliente pidió explícitamente no mencionar cumplimiento normativo específico. No reintroducir estas leyes en el copy.
- **Flujo de 3 pasos, no 4**: se eliminó el paso "Recepción en Dirección de Rentas" (Paso 04 del prototipo original) a pedido del cliente.
- **Casos de Uso y Seguridad**: el copy original del cliente solo nombraba estas secciones en el nav sin desarrollarlas; el contenido es una propuesta razonable, pendiente de validación con el cliente.

## Nota técnica: círculos del timeline

En `ComoFunciona.astro`, cada paso vive dentro de un contenedor `border-l-2 pl-8` (la línea conectora + el padding que separa el texto de la línea). Los círculos numerados están posicionados con `absolute -left-12 top-0` (sin `-translate-x-1/2`) porque están anidados en un `div.relative` que ya arranca en `x = 32px` (por el `pl-8` del padre) — si se usa `left-0` + `translate-x-1/2` el círculo queda centrado 16px más a la derecha de lo esperado y tapa la primera letra del título. Si se agregan más pasos o se cambia el padding del contenedor, recalcular este offset.

## Desarrollo

Cuando inicies el servidor de desarrollo, usa modo background:

```
astro dev --background
```

Administra el servidor en background con `astro dev stop`, `astro dev status`, y `astro dev logs`. (Nota: al momento de escribir esto ya había un servidor corriendo en `localhost:4321` iniciado por el usuario — antes de levantar uno nuevo, correr `astro dev status` para no duplicar procesos.)

## Documentación

Documentación completa: https://docs.astro.build

Consultar estas guías antes de trabajar en tareas relacionadas:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Pendientes / posibles próximos pasos

- Validar con el cliente las cifras del simulador ROI con datos reales.
- Confirmar si se debe usar el logo completo (`Logo Financial.svg`) en algún punto del sitio.
- No se probó el layout responsive por debajo de `lg:` (el `resize_window` de la herramienta de browser automation no reflejó el cambio de viewport durante la verificación) — revisar manualmente el menú móvil y el timeline/mockup apilado en pantallas angostas.
- El `astro.svg` / `background.svg` y `Welcome.astro` del starter de Astro ya se eliminaron; `src/assets` solo tiene los tres logos reales.
