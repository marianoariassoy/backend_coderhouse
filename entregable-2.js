const fs = require("fs/promises");

class Contenedor {
  constructor(file) {
    this.file = file;
    this.products = [];
    this.id = 1;
  }

  save(product) {
    this.readFile((data) => {
      if (data) {
        const products = JSON.parse(data);
        this.products = products;
        this.id = products[products.length - 1].id + 1;
      }
      this.products.push({ ...product, id: this.id });
      console.log("product id: ", this.id);
      this.id++;
      this.updateFile();
    });
  }

  getById(id) {
    this.readFile((data) => {
      if (data) {
        this.products = JSON.parse(data);
      }
      const product = this.products.find((product) => product.id === id);
      product ? console.log(product) : console.log(null);
    });
  }

  getAll() {
    try {
      fs.readFile(this.file, "utf-8").then((data) => {
        if (data) {
          const products = JSON.parse(data);
          this.products = products;
          this.id = products[products.length - 1].id + 1;
        }
        console.log(this.products);
      });
    } catch (error) {
      console.log(error);
    }
  }

  deleteById(id) {
    try {
      fs.readFile(this.file, "utf-8").then((data) => {
        if (data) {
          const products = JSON.parse(data);
          this.products = products;
          this.id = products[products.length - 1].id + 1;
        }
        const product = this.products.find((product) => product.id === id);
        if (product) {
          this.products = this.products.filter((product) => product.id !== id);
          this.updateFile();
          console.log("product deleted: ", product);
        } else {
          console.log("product not found");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  async readFile(callback) {
    try {
      await fs.readFile(this.file, "utf-8").then(callback);
    } catch (error) {
      console.log(error);
    }
  }

  async updateFile() {
    try {
      await fs.writeFile(this.file, JSON.stringify(this.products, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.writeFile(this.file, "");
    } catch (error) {
      console.log(error);
    }
    console.log("products deleted");
  }
}

//Test

const products = new Contenedor("productos.txt");

products.save({
  title: "Product 5",
  price: 500,
  thumbnail: "https://domain.com/1.jpg",
});

// products.getById(2);
// products.getById(20);
// products.getAll();
// products.deleteById(3);
// products.deleteAll();
