const ProductosDaoMongoDB = require("../daos/productos/ProductosDaoMongoDB")
const CarritosDaoMongoDB = require("../daos/carritos/CarritosDaoMongoDB")

const miCarrito = new CarritosDaoMongoDB()
const misProductos = new ProductosDaoMongoDB()

module.exports = { miCarrito, misProductos }
