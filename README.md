# AgentFlow

Base inicial de AgentFlow construida sobre Next.js con App Router, TypeScript y Tailwind CSS.

## Stack

- Next.js 16
- React 19
- TypeScript 5
- Tailwind CSS 4
- ESLint 9

## Estructura inicial

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  marketing/
    feature-card.tsx
    section-title.tsx
lib/
  site.ts
public/
```

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Como correr el proyecto

1. Instala las dependencias:

```bash
npm install
```

2. Levanta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre la aplicacion en tu navegador:

```text
http://localhost:3000
```

## Scripts disponibles

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notas para continuar

- `app/` contiene las rutas y layouts del App Router.
- `components/` guarda UI reutilizable fuera del sistema de rutas.
- `lib/site.ts` centraliza texto y configuracion basica del proyecto.
- La configuracion actual de Next.js, TypeScript, ESLint y Tailwind se mantiene intacta.

## Siguientes ideas

- Crear grupos de rutas como `app/(dashboard)` o `app/(marketing)` segun el flujo del producto.
- Agregar componentes compartidos para navegacion, shell y estados vacios.
- Incorporar variables de entorno y clientes de API cuando definas las integraciones de agentes.
