# Instalacion

### Configuracion de variables de entorno

Crea un archivo `.env`

```bash
touch .env
```

Agrega las siguientes variables de entorno:

```bash
NEXT_PUBLIC_APP_ENV=development # development o production
NEXT_PUBLIC_BASE_URL="http://localhost:4000" # URL del backend
```

### Version de Node

Antes de continuar con la instalación del proyecto, es necesario que ya se hayan realizado las siguientes instalaciones:

1. [NodeJS](https://github.com/nodesource/distributions/blob/master/README.md): Versión 20
2. [NVM](https://github.com/nvm-sh/nvm) Se recomienda NVM solo para ambientes de DESARROLLO.
   El proyecto esta desarrollado con [Node 20](https://nodejs.org/en/)

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
