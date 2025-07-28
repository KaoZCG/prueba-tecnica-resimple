# Prueba Técnica Junior - ReSimple

Visualización interactiva de datos de trabajadores, empresas y áreas a partir de archivos Excel y JSON, como parte de la prueba técnica para ReSimple.

## Descripción

Esta aplicación permite cargar, filtrar y visualizar información de trabajadores, empresas y áreas a partir de los archivos entregados (`origen-datos-junior.xlsx` y `diccionario-de-datos.json`). Incluye KPIs, filtros avanzados, paginación, exportación a Excel y un diseño responsivo, cumpliendo con todos los requisitos de la prueba técnica Junior para ReSimple.

## Características principales

- Visualización de datos en tabla con paginación.
- Filtros por empresa, área, RUT/nombre y rango de sueldo.
- KPIs: total de trabajadores, empresas, áreas y suma total de sueldos.
- Exportación de datos filtrados a Excel.
  
## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/KaoZCG/prueba-tecnica/tree/main/prueba-tecnica-resimple
   cd prueba-tecnica-resimple
   ```

2. Instala las dependencias principales:
   ```sh
      npm install react react-dom vite axios xlsx @mui/material @emotion/react @emotion/styled @mui/x-data-grid react-bootstrap bootstrap bootstrap-icons react-select
   ```

3. Instala las dependencias de desarrollo:
   ```sh
     npm install --save-dev @vitejs/plugin-react eslint eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-refresh
   ```

## Uso en desarrollo

```sh
  npm run dev
```

La aplicación estará disponible en [http://localhost:5173] por defecto.

## Build para producción

```sh
  npm run build
  npm run preview
```

## Uso con Docker

```sh
  docker build -t resimple-app .
  docker run -p 80:80 resimple-app
```

La app estará disponible en [http://localhost] (escribir esto en la barra de busqueda del navegador).


## Autor

César Antonio Gangas Lineros

---
