const ContenedorMongodb = require("../../contenedores/ContenedorMongodb")
const Carrito = require("../../models/CarritoModel")
const Producto = require("../../models/ProductosModel")

module.exports = class CarritosDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Carrito)
    }

    async mostrarTodoCarrito () {
        try {
            console.log("READ")
            return await Carrito.find()
        } catch (error) {
            console.error(error);
        }
    }

    async crearCarrito(objeto) {

        try {   
            console.log("nuevo carrito") 
            await Carrito.create(objeto)
            return Carrito.find()
        }
        catch(error) {
            console.log(error.message)
        }
    }

    async guardarEnCarrito(carritoId,id) {
        try{
            console.log("producto guardado en carrito")
            const productoElegido = await Producto.findOne({_id:id})
            console.log(`AGREGADO ${productoElegido}`)
            await Carrito.findByIdAndUpdate(carritoId, {$push: {"productos": productoElegido}}) 
            return Carrito.find()           
        }
        catch(error) {
            console.log(error.message)
        }
    }

    async buscarCarritoPorId (id) {
        try{
            console.log("carrito Mostrado")
            return await Carrito.findOne({_id:id})
        }
        catch(error){
            console.log(error.message)
        }
    }

    async borrarCarritoPorId (id) {
        try{
            console.log("carrito borrado")
            await Carrito.findByIdAndDelete({_id: id})
            return await Carrito.find()
        }
        catch(error){
            console.log(error.message)
        }
    }

    async borrarProductoDeCarrito(id,idCarrito) {
        try{

            ////////////////
            //PENDING////
            ////////////
            console.log("producto eliminado de carrito")
            await Carrito.findOneAndUpdate({_id: idCarrito}, {$pull: {"productos": {_id: id}}})  
            return await Carrito.find()                    
        }
        catch(error){
            console.log(error.message)
        }
    }
}