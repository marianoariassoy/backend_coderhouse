/*

Realizar una clase "ProductManager" que gestione un conjunto de productos.

Debe crearse desde su constructor con el elemento products, el cual será un arreglo vacío.

Cada producto que gestione debe contar con las propiedades:
title (nombre del producto)
description (descripción del producto)
price (precio)
thumbnail (ruta de imagen)
code (código identificador)
stock (número de piezas disponibles)

Debe contar con un método "addProduct" el cual agregará un producto al arreglo de productos inicial.
Validar que no se repita el campo "code" y que todos los campos sean obligatorios
Al agregarlo, debe crearse con un id autoincrementable

Debe contar con un método "getProducts" el cual debe devolver el arreglo con todos los productos creados hasta ese momento

Debe contar con un método "getProductById" el cual debe buscar en el arreglo el producto que coincida con el id
En caso de no coincidir ningún id, mostrar en consola un error "Not found"

*/

class ProductManager {
  constructor() {
    this.products = [];
    this.id = 100;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("All fields are required");
    } else {
      if (this.products.find((product) => product.code === code)) {
        console.error("Code already exists");
      } else {
        this.products.push({
          id: this.id,
          title,
          description,
          price,
          thumbnail,
          code,
          stock,
        });
        this.id++;
        console.log(`${title} added successfully`);
      }
    }
  }

  getProducts() {
    console.log(this.products);
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      console.log("Product search");
      console.log(product);
    } else {
      console.error("Not found");
    }
  }
}
const productManager = new ProductManager();

productManager.addProduct("Product 1", "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 100, "https://via.placeholder.com/150", "ABC123", 10);
productManager.addProduct("Product 2", "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 200, "https://via.placeholder.com/150", "ABC124", 20);
productManager.addProduct("Product 3", "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 300, "https://via.placeholder.com/150", "ABC125", 30);
productManager.addProduct("Product 4 empty", "", "", "", "", "");
productManager.addProduct("Product 5 already exists", "Lorem ipsum dolor sit amet consectetur, adipisicing elit.", 100, "https://via.placeholder.com/150", "ABC123", 10);

productManager.getProducts();

productManager.getProductById(100);
productManager.getProductById(999);
