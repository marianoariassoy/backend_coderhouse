# Documentación de la API REST en Node.js

Bienvenido a la documentación de la API REST del proyecto para el curso de Programación Backend de CoderHouse.

Esta API está construida utilizando Node.js y Express, y proporciona endpoints para interactuar con diferentes recursos.

## Instrucciones

- Clonar el repositorio => https://github.com/marianoariassoy/backend_coderhouse
- Instalar las dependencias => npm i
- Correr la app => npm run dev

## Dependencias

- Express

## Base URL

La URL base para acceder a la API es: `http://localhost:8080`

## Endpoints

### Muestra todos los productos con un limite

**GET** http://localhost:8080/api/products?limit=5

### Muestra un producto por ID

**GET** http://localhost:8080/api/products/1

### Agrega un producto

**POST** http://localhost:8080/api/products/

```json
{
  "title": "Producto",
  "description": "Descripcion del producto",
  "code": "P1",
  "price": 1000,
  "category": "Category 1",
  "thumbnails": ["url1", "url2"],
  "stock": 10
}
```

### Actualiza un producto

**PUT** http://localhost:8080/api/products/2

```json
{
  "stock": 0,
  "status": false
}
```

### Elimina un producto por ID

**DELETE** http://localhost:8080/api/products/2

### Agrega un nuevo carrito

**POST** http://localhost:8080/api/carts/
content-type: application/json

```json
{
  "products": []
}
```

### Agrega un producto a un carrito por ID

**POST** http://localhost:8080/api/carts/2/product/3

### Lista los productos de un carrito por ID

**GET** http://localhost:8080/api/carts/6

## Extensiones

Se puede utilizar la extensión para VSC, REST Client Api, para testear los endpoints desde los archivos en el directorio "api"
