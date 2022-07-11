const ProductosDaoMongoDB = require("./productos/productosDaoMongoDB")
const CarritosDaoMongoDB = require("./carritos/carritosDaoMongoDB")

const misProductos = new ProductosDaoMongoDB()
const miCarrito = new CarritosDaoMongoDB()

module.exports = { miCarrito, misProductos }
