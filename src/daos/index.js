const ProductosDaoArchivo = require("../daos/productos/ProductosDaoArchivo")
const ProductosDaoFirebase = require("../daos/productos/ProductosDaoFirebase")
const ProductosDaoMemoria = require("../daos/productos/ProductosDaoMemoria")
const ProductosDaoMongoDB = require("../daos/productos/ProductosDaoMongoDB")

const CarritoDaoArchivo = require("../daos/carritos/CarritosDaoArchivo")
const CarritosDaoFirebase = require("../daos/carritos/CarritosDaoFirebase")
const CarritoDaoMemoria = require("../daos/carritos/CarritosDaoMemoria")
const CarritosDaoMongoDB = require("../daos/carritos/CarritosDaoMongoDB")

const DATABASES = {

    archivo: {
        misProductos: new ProductosDaoArchivo(),
        miCarrito: new CarritoDaoArchivo()
    },

    firebase: {
        misProductos: new ProductosDaoFirebase(),
        miCarrito: new CarritosDaoFirebase()
    },

    memoria: {
        misProductos: new ProductosDaoMemoria(), 
        miCarrito: new CarritoDaoMemoria()
    },

    mongo: {
        misProductos: new ProductosDaoMongoDB(),
        miCarrito: new CarritosDaoMongoDB()
    }
}

const DB = process.env.SELECTED_DB || "firebase" || "memoria" || "mongo"
//DB es una variable global que se puede usar en todo el proyecto
//process.env.SELECTED_DB es una variable de entorno que se puede usar en todo el proyecto

const { miCarrito, misProductos } = DATABASES["mongo"]
module.exports = { miCarrito, misProductos }
