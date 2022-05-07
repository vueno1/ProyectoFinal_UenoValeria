const ContenedorMongodb = require("../../contenedores/ContenedorMongodb")
const Carrito = require("../../models/CarritoModel")
const Producto = require("../../models/ProductosModel")
const mongoose = require("mongoose")

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

    ///////////////
    //CREAR CARRITO
    //////////////
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

    ////////////////////////////
    //GUARDAR PRODUCTO EN CARRITO
    /////////////////////////////
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

    ///////////////////////
    //BUSCAR CARRITO POR ID 
    ///////////////////////
    async buscarCarritoPorId (id) {
        try{
            console.log("carrito Mostrado")
            return await Carrito.findOne({_id:id})
        }
        catch(error){
            console.log(error.message)
        }
    }

    /////////////////////////////
    //ELIMINAR CARRITO X ID
    /////////////////////////////
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

    ///////////////////////////////////
    //ELIMINAR PRODUCTO DE CARRITO X ID
    /////////////////////////////////////
    async borrarProductoDeCarrito(idCarrito, id) {
        try{
            console.log("producto eliminado de carrito")
            await Carrito.findByIdAndUpdate(idCarrito, {$pull: {"productos": mongoose.Types.ObjectId(id)}})
            //mongoose.Types.ObjectId(id)
            return await Carrito.find()
                    
        }
        catch(error){
            console.log(error.message)
        }
    }
}