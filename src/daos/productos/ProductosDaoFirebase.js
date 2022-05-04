const ContenedorFirebase = require("../../contenedores/ContenedorFirebase")

module.exports = class ProductosDaoFirebase extends ContenedorFirebase {
    
    constructor(){
        super("productos")
    }     


}
