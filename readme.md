# Documentación de la API REST en Node.js

Bienvenido a la documentación de la API REST del proyecto para el curso de Programación Backend de CoderHouse.

Esta API está construida utilizando Node.js y Express, y proporciona endpoints para interactuar con diferentes recursos.

## Instrucciones

- Clonar el repositorio => https://github.com/marianoariassoy/backend_coderhouse
- Instalar las dependencias => npm i
- Correr la app => npm run start

## Dependencias

- express, express-handlebars, express-session, MongoDB, mongoose, mongoose-paginate-v2, connect-mongo, bcrypt

## Base URL

La URL base para acceder a la API es: `http://localhost:8080`

## Vista de Usuarios

http://localhost:8080/login

## Endpoints Sesiones de usuario

### Base URL

### Login

**GET** http://localhost:8080/api/sessions/login

Usuario de prueba: email@email.com / 123456

### Register

**GET** http://localhost:8080/api/sessions/register

### Profile

**GET** http://localhost:8080/api/sessions/profile

## Endpoints Productos

### Muestra todos los productos

**GET** http://localhost:8080/api/products

### Muestra todos los productos con parametros

**GET** http://localhost:8080/api/products?page=1&limit=2&category=Remeras&sort=desc

### Muestra un producto por ID

**GET** http://localhost:8080/api/products/:pid

### Agrega un producto

**POST** http://localhost:8080/api/products/

```json
{
  "title": "Remera Red",
  "description": "Descripcion del producto",
  "code": "P1",
  "price": 4000,
  "image": "https://images.pexels.com/photos/1043148/pexels-photo-1043148.jpeg?auto=compress&cs=tinysrgb&w=1600",
  "category": "Remeras",
  "stock": 2
}
```

### Actualiza un producto

**PUT** http://localhost:8080/api/products/:pid

```json
{
  "stock": 0,
  "status": false
}
```

### Elimina un producto por ID

**DELETE** http://localhost:8080/api/products/:pid

### Nuevo carrito

**POST** http://localhost:8080/api/carts/

### Listado de carritos

**GET** http://localhost:8080/api/carts/

### Carrito por ID

**GET** http://localhost:8080/api/carts/:cid

### Agrega un producto a un

**POST** http://localhost:8080/api/carts/:cid

```json
{
  "product": "64fc8abdcf7383d11afde540"
}
```

### Actualizar la cantidad de un producto en el carrito

**PUT** http://localhost:8080/api/carts/:cid/products/:pid

```json
{
  "quantity": 4
}
```

### Elimina un producto del carrito

**DELETE** http://localhost:8080/api/carts/:cid/products/:pid

### Elimina los productos del carrito

**DELETE** http://localhost:8080/api/carts/:cid

## Extensiones

Se puede utilizar la extensión para VSC, REST Client Api, para testear los endpoints desde los archivos en el directorio "api"
