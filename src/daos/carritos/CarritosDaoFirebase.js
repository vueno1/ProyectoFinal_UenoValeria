const ContenedorFirebase = require("../../contenedores/ContenedorFirebase")

module.exports = class CarritosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super("carritos")
    }
}