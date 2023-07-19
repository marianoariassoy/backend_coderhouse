import { promises } from "fs";

class Contenedor {
  constructor(file) {
    this.file = file;
    this.products = [];
    this.id = 0;
  }

  save(product) {
    this.products.push({ ...product, id: this.id++ });
    this.updateFile();
    console.log("product id: ", this.id);
  }

  getById(id) {
    const product = this.products.find((product) => product.id === id);
    product ? console.log(product) : console.log(null);
  }
  getAll() {
    console.log(this.products);
  }

  deleteById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      this.products = this.products.filter((product) => product.id !== id);
      this.updateFile();
      console.log("product deleted: ", product);
    } else {
      console.log("product not found");
    }
  }

  deleteAll() {
    this.products = [];
    this.updateFile();
    console.log("products deleted");
  }

  async updateFile() {
    try {
      await promises.writeFile(this.file, JSON.stringify(this.products));
    } catch (error) {
      console.log(error);
    }
  }
}

const products = new Contenedor("productos.txt");

products.save({
  title: "Product 1",
  price: 100,
  thumbnail: "https://domain.com/1.jpg",
});
products.save({
  title: "Product 2",
  price: 200,
  thumbnail: "https://domain.com/2.jpg",
});
products.save({
  title: "Product 3",
  price: 300,
  thumbnail: "https://domain.com/3.jpg",
});

products.getById(2);
products.getById(20);
products.deleteById(3);
products.getAll();
products.deleteAll();
