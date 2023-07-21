const fs = require("node:fs");

class Contenedor {
  constructor(file) {
    this.file = file;
    this.products = [];
    this.id = 1;
  }

  save(product) {
    fs.readFile(this.file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      if (data) {
        const products = JSON.parse(data);
        this.products = products;
        this.id = products[products.length - 1].id + 1;
      }

      this.products.push({ ...product, id: this.id });
      console.log("product id: ", this.id);
      this.id++;

      fs.writeFile(this.file, JSON.stringify(this.products, null, 2), (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    });
  }

  getById(id) {
    fs.readFile(this.file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      if (data) {
        this.products = JSON.parse(data);
      }

      const product = this.products.find((product) => product.id === id);
      product ? console.log(product) : console.log(null);

      fs.writeFile(this.file, JSON.stringify(this.products, null, 2), (err) => {
        if (err) {
          console.log(err);
          return;
        }
      });
    });
  }

  getAll() {
    fs.readFile(this.file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      if (data) {
        this.products = JSON.parse(data);
      }

      console.log(this.products);
    });
  }

  deleteById(id) {
    fs.readFile(this.file, "utf-8", (err, data) => {
      if (err) {
        console.log(err);
        return;
      }

      if (data) {
        this.products = JSON.parse(data);
      }

      const product = this.products.find((product) => product.id === id);
      if (product) {
        this.products = this.products.filter((product) => product.id !== id);
        fs.writeFile(this.file, JSON.stringify(this.products, null, 2), (err) => {
          if (err) {
            console.log(err);
            return;
          }
          console.log("product deleted");
        });
      } else {
        console.log("product not found");
      }
    });
  }

  deleteAll() {
    fs.writeFile(this.file, "", (err) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("products deleted");
    });
  }
}

//Test

const products = new Contenedor("productos.txt");

products.save({
  title: "Product 2",
  price: 200,
  thumbnail: "https://domain.com/1.jpg",
});

// products.getById(2);
// products.getById(20);
// products.getAll();
// products.deleteById(3);
// products.deleteAll();
