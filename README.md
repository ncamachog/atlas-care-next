# ATLAS — Modern care, naturally refined

Sitio y tienda de **ATLAS** (Atelier · Cartagena), migrado desde WordPress/WooCommerce a Next.js.
Español e inglés, bolsa de compra, checkout con pago contra entrega, envíos por Colombia y sección **ATLAS Ambassadors**.

## Stack

TypeScript · Next.js 16.3 (App Router) · React 19.2 · Tailwind CSS 4 + `@tailwindcss/postcss` · Geist vía `next/font` · ESLint 9

Además de Geist se cargan Cormorant Garamond y Jost (`next/font/google`) para el diseño editorial.

## Desarrollo

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npm run build && npm start
```

## Estructura

- `src/app/` — páginas: `/`, `/shop`, `/product/[slug]`, `/inspiration-and-science`, `/ambassadors`, `/cart`, `/checkout`, `/order-confirmation`, `/admin` y la API (`/api/orders`, `/api/ambassadors`).
- `src/lib/products.ts` — **catálogo y precios** (COP). Edita aquí productos y precios.
- `src/lib/content-data.ts` — **todos los textos en español e inglés**. Se pintan con `getContent(locale)`; los textos con `<br>`/`<em>` usan `<Rich />`.
- `src/lib/shop.ts` — reglas de envío: `FREE_SHIPPING`, tarifas y departamentos.
- `src/lib/orders.ts` — crea pedidos: valida y **recalcula precios y envío en el servidor** (no confía en lo que manda el navegador).
- `src/lib/store.ts` — persistencia (ver más abajo).
- `src/components/` — cabecera, bolsa, detalle de producto, vitrina con filtros, formularios.
- `src/app/globals.css` — todo el diseño (paneles de cristal, contornos luminosos, paleta ATLAS).
- `public/img/` — fotografías optimizadas.

## Idioma

Cookie `atlas-lang` (`es` | `en`, español por defecto) que cambia el selector de la cabecera mediante una server action; las URLs no cambian.

## Envíos y pagos

| Zona | Tarifa |
|---|---|
| Cartagena y Bolívar | $8.000 |
| Resto de Colombia | $15.000 |
| Pedidos desde $250.000 | Gratis |

Único método de pago: **contra entrega**. Para pagar con tarjeta / PSE hay que integrar una pasarela (p. ej. Mercado Pago) en `src/app/api/orders`.

## Variables de entorno

Ver `.env.example`.

| Variable | Uso |
|---|---|
| `KV_REST_API_URL` + `KV_REST_API_TOKEN` (o `UPSTASH_REDIS_REST_URL` + `UPSTASH_REDIS_REST_TOKEN`) | Base de datos (Upstash Redis) donde se guardan pedidos y solicitudes de Ambassadors. |
| `ADMIN_PASSWORD` | Activa el panel `/admin` (pedidos y solicitudes). Sin esta variable el panel queda desactivado. |
| `NEXT_PUBLIC_SITE_URL` | URL pública, para metadatos / Open Graph. |

**Sin Redis**: en desarrollo los datos se guardan en `.data/*.json`; en producción no hay dónde escribir, así que el pedido se acepta pero **solo queda en los logs de Vercel** (línea `[ATLAS_ORDER]`). Conecta Upstash Redis desde el Marketplace de Vercel antes de vender.

## Notas

- Este proyecto usa una versión de Next.js con cambios respecto a lo conocido; ver `AGENTS.md`.
- Los pedidos no envían correos automáticos: se consultan en `/admin`.
