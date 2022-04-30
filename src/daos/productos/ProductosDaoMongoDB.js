const ContenedorMongodb = require("../../contenedores/ContenedorMongodb")
const Producto = require("../../models/ProductosModel")

module.exports = class ProductosDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Producto)
    }
    
}

