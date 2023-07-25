import express from "express";
import Contenedor from "./Contenedor.js";

const app = express();
const PORT = 8080;
const products = new Contenedor("productos.txt");

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.log("Error: ", error);
});

app.get("/productos", async (req, res) => {
  const data = await products.getAll();
  res.send(data);
});

app.get("/productoRandom", async (req, res) => {
  const data = await products.getRandomProduct();
  res.send(data);
});

//products.save({
//title: "Product 2",
// price: 200,
// thumbnail: "https://domain.com/1.jpg",
//});

// products.getById(2);
// products.getById(20);
// products.getAll();
// products.deleteById(3);
// products.deleteAll();
