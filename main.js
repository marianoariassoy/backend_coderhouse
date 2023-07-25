import express from "express";
import Contenedor from "./Contenedor.js";

const app = express();
const PORT = 8080;

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.log("Error: ", error);
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.get("/productos", (req, res) => {
  const products = new Contenedor("productos.txt");
  const data = products.getAll();
  res.send(data);
});

app.get("/productoRandom", async (req, res) => {});

//products.save({
//title: "Product 2",
// price: 200,
// thumbnail: "https://domain.com/1.jpg",
//});

// products.getById(2);
// products.getById(20);
//products.getAll();
// products.deleteById(3);
// products.deleteAll();
