const ContenedorMongodb = require("../../contenedores/ContenedorMongodb.js")
const Producto = require("../../models/ProductosModel")

module.exports = class ProductosDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Producto)
    }
    
}

