const ContenedorMongodb = require("../../contenedores/contenedor")
const Producto = require("../../models/p_model")

module.exports = class ProductosDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Producto)
    }
    
}

