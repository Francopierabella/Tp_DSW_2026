# Farmacia Pierabella — TP DSW 2026

Aplicación web para la gestión de una farmacia, desarrollada como Trabajo Práctico para la materia Desarrollo de Software.

El proyecto está compuesto por:

* **Frontend:** React + TypeScript + Vite
* **Backend:** Node.js + Express + TypeScript
* **Persistencia:** MySQL
* **ORM:** MikroORM
* **Arquitectura:** API REST

---

# 1. Requisitos previos

Antes de ejecutar el proyecto es necesario tener instaladas las siguientes herramientas.

## 1.1. Git

Git permite descargar el proyecto desde GitHub.

Se puede descargar desde:

https://git-scm.com/downloads

Para comprobar que está instalado, abrir una terminal y ejecutar:

git --version

Debería aparecer una versión de Git.

---

## 1.2. Node.js

El backend y el frontend utilizan Node.js.

Se recomienda instalar una versión LTS reciente de Node.js.

Descarga: https://nodejs.org/

Una vez instalado, comprobar: node --version y npm --version

Ambos comandos deben mostrar una versión instalada.

---

## 1.3. MySQL

El proyecto utiliza MySQL como sistema gestor de base de datos.

Se puede instalar mediante: https://dev.mysql.com/downloads/

También se puede utilizar MySQL Workbench para administrar la base de datos gráficamente.

Después de instalar MySQL, verificar que el servidor MySQL esté iniciado.

El proyecto utiliza por defecto el puerto: 3306

---

# 2. Descargar el proyecto

Abrir una terminal y dirigirse a la carpeta donde se desea guardar el proyecto.

Por ejemplo: cd Desktop

Luego clonar el repositorio: git clone https://github.com/Francopierabella/Tp_DSW_2026.git

Ingresar a la carpeta: cd Tp_DSW_2026

---

# 3. Estructura general del proyecto

El proyecto está dividido principalmente en dos partes:

Tp_DSW_2026/
│
├── backend/
│   ├── src/
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
│
└── frontend/
    └── frontend-farmacia/
        ├── src/
        ├── package.json
        └── ...

El **backend** se encarga de:

* La API REST.
* La lógica de negocio.
* La comunicación con MySQL.
* La persistencia mediante MikroORM.
* Las entidades y operaciones CRUD.

El **frontend** se encarga de:

* La interfaz gráfica.
* La navegación.
* La búsqueda y filtrado de productos.
* El carrito.
* El proceso de checkout.

---

# 4. Configurar la base de datos

## 4.1. Crear la base de datos

Abrir MySQL Workbench o una terminal de MySQL.

Crear la base de datos: CREATE DATABASE farmacia;

También se puede verificar que exista mediante: SHOW DATABASES;

Debería aparecer: farmacia

> No es necesario crear manualmente las tablas. El backend se encarga de sincronizar el esquema de la base de datos mediante MikroORM.

---

# 5. Configurar las variables de entorno

El backend utiliza un archivo `.env` para almacenar los datos necesarios para conectarse a MySQL.

Dentro de: backend/ crear un archivo llamado: .env

El contenido debe ser:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=farmacia

### ¿Qué significa cada variable?

| Variable      | Descripción                            |
| ------------- | -------------------------------------- |
| `DB_HOST`     | Dirección donde está funcionando MySQL |
| `DB_PORT`     | Puerto utilizado por MySQL             |
| `DB_USER`     | Usuario de MySQL                       |
| `DB_PASSWORD` | Contraseña del usuario de MySQL        |
| `DB_NAME`     | Nombre de la base de datos             |

Por ejemplo, si el usuario de MySQL es `root` y su contraseña es `123456`:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=123456
DB_NAME=farmacia

### Importante

**No subir el archivo `.env` a GitHub**, ya que contiene credenciales privadas.

El repositorio debe incluir un archivo: .env.example con:

DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=YOUR_PASSWORD
DB_NAME=farmacia

Cada persona que ejecute el proyecto debe crear su propio `.env` a partir de este archivo.

---

# 6. Instalar las dependencias del backend

Abrir una terminal dentro de la carpeta: backend/

Por ejemplo: cd backend

Ejecutar: npm install

Este comando descarga automáticamente todas las dependencias especificadas en `package.json`.

Entre ellas se encuentran:

* Express
* MikroORM
* MySQL
* TypeScript
* bcrypt
* CORS
* dotenv
* tsc-watch

---

# 7. Ejecutar el backend

Una vez instaladas las dependencias, ejecutar: npm run start:dev

Este comando compila el código TypeScript y ejecuta el backend.

Internamente se utiliza: tsc-watch → TypeScript → Node.js

Al iniciarse, el backend realiza la sincronización del esquema de la base de datos.

Por lo tanto, las tablas necesarias se crean o actualizan automáticamente.

--- 

# 8. Cargar los datos iniciales

El proyecto dispone de un archivo: backend/src/shared/db/seed.ts

El seed permite cargar automáticamente datos de prueba en la base de datos.

Entre los datos iniciales se encuentran:

* Categorías de productos.
* Productos.
* Clientes.
* Obras sociales.

El seed se ejecuta automáticamente al iniciar el backend.

Por lo tanto, después de ejecutar: npm run start:dev, la base de datos queda preparada con información inicial para poder probar la aplicación.

El seed está diseñado para evitar duplicar los datos si ya fueron cargados anteriormente.

---

# 9. Verificar el backend

Una vez iniciado el backend, se puede comprobar que está funcionando realizando una petición a la API.

Por ejemplo: GET /api/products

También se puede utilizar Postman para realizar pruebas sobre los distintos endpoints de la API.

Entre los recursos disponibles se encuentran: /api/products, /api/productCategories, /api/customers, /api/healthInsurances, /api/sales, /api/saleItems

> Los endpoints pueden ampliarse a medida que se incorporen nuevas funcionalidades al sistema.

---

# 10. Instalar las dependencias del frontend

El backend debe permanecer ejecutándose.

Abrir **otra terminal**.

Ingresar a: frontend/frontend-farmacia/

Por ejemplo, desde la raíz del proyecto: cd frontend/frontend-farmacia

Instalar las dependencias: npm install

---

# 11. Ejecutar el frontend

Una vez instaladas las dependencias, ejecutar: npm run dev

Vite mostrará en la terminal una dirección similar a: Local: http://localhost:5173/

Abrir esa dirección en un navegador.

---

# 12. Ejecutar el proyecto completo

Para utilizar la aplicación correctamente deben estar funcionando simultáneamente:

### Terminal 1 — Backend

cd backend 
npm run start:dev

### Terminal 2 — Frontend

cd frontend/frontend-farmacia
npm run dev

Luego acceder desde el navegador a la dirección indicada por Vite, normalmente: http://localhost:5173/

---

# 13. Funcionalidades principales

Una vez iniciada la aplicación, se pueden probar las siguientes funcionalidades.

## Productos

La aplicación permite:

* Consultar productos.
* Buscar productos por nombre.
* Filtrar productos por categoría.
* Visualizar productos destacados.
* Consultar el detalle de un producto.

---

## Categorías

Las categorías mostradas en el frontend son obtenidas desde el backend y almacenadas en la base de datos.

---

## Carrito

El usuario puede:

* Agregar productos al carrito.
* Aumentar o disminuir cantidades.
* Eliminar productos.
* Consultar el total de la compra.

El carrito respeta la disponibilidad de stock.

No permite agregar una cantidad superior al stock disponible del producto.

---

## Checkout

Desde el carrito se puede acceder al checkout.

El usuario puede ingresar:
* Nombre.
* DNI.
* Método de pago.
* Método de entrega.

El DNI posee validación.

El checkout muestra un resumen de la venta antes de finalizar el proceso.

---

# 14. Base de datos y persistencia

La aplicación utiliza **MikroORM** para realizar la comunicación entre el backend y MySQL.

La configuración se encuentra en: `backend/src/shared/db/orm.ts`

Las entidades del sistema se encuentran organizadas dentro de sus respectivos módulos.

Por ejemplo:

product/
├── product.entity.ts
├── product.repository.ts
├── product.service.ts
├── product.controller.ts
├── product.routes.ts
└── product.validations.ts

El proyecto utiliza una arquitectura basada en:

Controller
    ↓
Service
    ↓
Repository
    ↓
MikroORM
    ↓
MySQL

# 16. Detener el proyecto

Para detener el backend o frontend, utilizar: Ctrl + C en la terminal correspondiente.

---

# 17. Reiniciar el proyecto

Para volver a ejecutar el proyecto:

### Backend

cd backend
npm run start:dev

### Frontend

En otra terminal:

cd frontend/frontend-farmacia
npm run dev

No es necesario volver a instalar las dependencias cada vez.

`npm install` solamente es necesario cuando se descarga el proyecto por primera vez o cuando cambian las dependencias.

---

# 18. Resumen rápido

Para una instalación desde cero:


# 1. Clonar
git clone https://github.com/Francopierabella/Tp_DSW_2026.git

# 2. Entrar al proyecto
cd Tp_DSW_2026

# 3. Crear la base de datos en MySQL
CREATE DATABASE farmacia;

# 4. Crear backend/.env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=TU_CONTRASEÑA
DB_NAME=farmacia

# 5. Instalar backend
cd backend
npm install

# 6. Ejecutar backend
npm run start:dev

# 7. En otra terminal, instalar frontend
cd frontend/frontend-farmacia
npm install

# 8. Ejecutar frontend
npm run dev

Finalmente, abrir en el navegador la dirección proporcionada por Vite, normalmente: http://localhost:5173/

---

## Repositorio

Repositorio oficial del proyecto:

https://github.com/Francopierabella/Tp_DSW_2026
