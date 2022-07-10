const ProductosDaoMongoDB = require("../daos/productos/ProductosDaoMongoDB")
const CarritosDaoMongoDB = require("../daos/carritos/CarritosDaoMongoDB")

const misProductos = new ProductosDaoMongoDB()
const miCarrito = new CarritosDaoMongoDB()

module.exports = { miCarrito, misProductos }
