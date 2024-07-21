<!--toc:start-->

- [Getting Started](#getting-started)
  - [Configuracion de variables de entorno](#configuracion-de-variables-de-entorno)
  - [Version de Node](#version-de-node)
  - [Instalacion de dependencias](#instalacion-de-dependencias)
  <!--toc:end-->

## Getting Started

### Configuracion de variables de entorno

Crea el archivo **.env** en la raiz del proyecto con las siguientes variables:

```bash
NEXT_PUBLIC_APP_ENV=development # development o production
NEXT_PUBLIC_BASE_URL="http://localhost:4000" # URL del backend
```

### Version de Node

El proyecto esta desarrollado con [Node 20](https://nodejs.org/en/)

```code
node 20
```

### Instalacion de dependencias

```bash
npm install

npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Ingresa a [http://localhost:3000](http://localhost:3000) en tu navegador
