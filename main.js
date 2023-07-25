/*
Realizar un proyecto de servidor basado en node.js que utilice el módulo express e implemente los siguientes endpoints en el puerto 8080:
Ruta get '/productos' que devuelva un array con todos los productos disponibles en el servidor
Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos los productos disponibles
Incluir un archivo de texto 'productos.txt' y utilizar la clase Contenedor del desafío anterior para acceder a los datos persistidos del servidor.
Antes de iniciar el servidor, colocar en el archivo 'productos.txt' tres productos como en el ejemplo del desafío anterior.
*/

import express from "express";
import Contenedor from "./Contenedor.js";

const app = express();
const PORT = 8080;
const products = new Contenedor("productos.txt");

products.save({
  title: "Product 20",
  price: 1000,
  thumbnail: "https://domain.com/1.jpg",
});
products.save({
  title: "Product 21",
  price: 1100,
  thumbnail: "https://domain.com/1.jpg",
});
products.save({
  title: "Product 22",
  price: 1200,
  thumbnail: "https://domain.com/1.jpg",
});

app.get("/productos", async (req, res) => {
  const data = await products.getAll();
  res.send(data);
});

app.get("/productoRandom", async (req, res) => {
  const data = await products.getRandomProduct();
  res.send(data);
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`);
});

server.on("error", (error) => {
  console.log("Error: ", error);
});
