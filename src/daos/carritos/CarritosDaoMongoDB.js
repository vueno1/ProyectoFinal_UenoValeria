
const { default: mongoose } = require("mongoose")
const ContenedorMongodb = require("../../contenedores/ContenedorMongodb")
const Carrito = require("../../models/CarritoModel")
const Producto = require("../../models/ProductosModel")

module.exports = class CarritosDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Carrito)
    }

    async mostrarCarrito () {
        try {
            const carrito = await Carrito.findOne()     
            return await carrito            
        }
        catch(e) {
            console.log(e)
        }
    }

    async crearCarrito() {
        try {   
            console.log("CREATE CARRITO") 

            const carritoNuevo = {
                productos: [],
                timestamp: Date.now()
            }

            const carritoSaveModel = new Carrito(carritoNuevo)
            let carritoSave = await carritoSaveModel.save()
            console.log(carritoSave)

            return await carritoSave._id
        }
        catch(error) {
            console.log(error.message)
        }
    }

    async guardarEnCarrito(carritoId,id) {
        try{
            const productoElegido = await Producto.findOne({_id:id})
            await Carrito.findByIdAndUpdate(carritoId , {$push: {"productos": productoElegido}}) 
            return await Carrito.find()           
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

    async borrarProductoDeCarrito(idProducto, idCarrito) {
        try{
      
            console.log("ELIMINAR PRODUCTO")
            const productoElegido = await Producto.findOne({_id:idProducto})
            await Carrito.findByIdAndUpdate(idCarrito, {$pull: {"productos": productoElegido}})
            return Carrito.find()                      
        }
        catch(error){
            console.log(error.message)
        }
    }
}