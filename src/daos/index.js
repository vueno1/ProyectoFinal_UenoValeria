const ProductosDaoMongoDB = require("./productos/productodao.js")
const CarritosDaoMongoDB = require("./carritos/carritodao")

const misProductos = new ProductosDaoMongoDB()
const miCarrito = new CarritosDaoMongoDB()

module.exports = { miCarrito, misProductos }
