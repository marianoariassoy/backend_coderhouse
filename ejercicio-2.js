const productos = [
  { id: 1, nombre: "Escuadra", precio: 323.45 },
  { id: 2, nombre: "Calculadora", precio: 234.56 },
  { id: 3, nombre: "Globo Terraqueo", precio: 45.67 },
  { id: 4, nombre: "Paleta Pintura", precio: 456.78 },
];

const names = productos.map((producto) => producto.nombre).join(", ");
const totalPrice = productos.reduce((total, producto) => total + producto.precio, 0).toFixed(2);
const averagePrice = (totalPrice / productos.length).toFixed(2);

const minPrice = productos.reduce((min, producto) => {
  if (producto.precio < min) {
    min = producto.precio;
  }
  return min;
}, productos[0].precio);

const maxPrice = productos.reduce((max, producto) => {
  if (producto.precio > max) {
    max = producto.precio;
  }
  return max;
}, productos[0].precio);

const results = { names, totalPrice, averagePrice, minPrice, maxPrice };

console.log(results);
