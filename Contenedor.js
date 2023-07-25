import fs from "node:fs/promises";

class Contenedor {
  constructor(file) {
    this.file = file;
    this.products = [];
    this.id = 1;
  }

  async getAll() {
    const data = await fs.readFile(this.file, "utf-8");
    if (data) {
      this.products = JSON.parse(data);
    }
    return this.products;
  }

  async getRandomProduct() {
    const data = await fs.readFile(this.file, "utf-8");
    if (data) {
      const products = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * products.length);
      return products[randomIndex];
    }
    return data;
  }

  async save(product) {
    try {
      const data = await fs.readFile(this.file, "utf-8");
      if (data) {
        const products = JSON.parse(data);
        this.products = products;
        this.id = products[products.length - 1].id + 1;
      }
      this.products.push({ ...product, id: this.id });
      console.log("product id: ", this.id);
      this.id++;
      this.saveAll(this.products);
    } catch (error) {
      console.log(error);
    }
  }

  async saveAll(products) {
    try {
      await fs.writeFile(this.file, JSON.stringify(products, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async getById(id) {
    try {
      const data = await fs.readFile(this.file, "utf-8");
      if (data) {
        this.products = JSON.parse(data);
      }
      const product = this.products.find((product) => product.id === id);
      product ? console.log(product) : console.log(null);
      this.saveAll(this.products);
    } catch (error) {
      console.log(error);
    }
  }

  async deleteById(id) {
    try {
      const data = await fs.readFile(this.file, "utf-8");
      if (data) {
        this.products = JSON.parse(data);
      }
      const product = this.products.find((product) => product.id === id);
      if (product) {
        this.products = this.products.filter((product) => product.id !== id);
        this.saveAll(this.products);
      } else {
        console.log("product not found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.file, "");
      console.log("products deleted");
    } catch (error) {
      console.log(error);
    }
  }
}

export default Contenedor;
