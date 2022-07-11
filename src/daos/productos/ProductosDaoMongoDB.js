const ContenedorMongodb = require("../../contenedores/contenedorMongodb")
const Producto = require("../../models/ProductosModel")

module.exports = class ProductosDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Producto)
    }
    
}

