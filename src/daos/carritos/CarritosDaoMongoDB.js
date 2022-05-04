const ContenedorMongodb = require("../../contenedores/ContenedorMongodb")
const Carrito = require("../../models/CarritoModel")
const Producto = require("../../models/ProductosModel")

module.exports = class CarritosDaoMongoDB extends ContenedorMongodb {

    constructor() {
        super(Carrito)
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
            console.log("producto borrado de carrito")
            await Carrito.findOne({_id:idCarrito})

            /////////
            //PENDING 
            /////////
            //await Carrito.findOneAndUpdate({_id:idCarrito}, {productos: {$pull: {_id:id}}})
            //const filtro = carrito.productos.filter(producto => producto._id === id)
            //await Carrito.findByIdAndUpdate({_id: idCarrito}, {$push: filtro})
           //lo que podes hacer es obtener todo el carrito, filtras el producto y lo volves a almacenar.
            //aparte, que te quedarian los mismos metodos tanto para productos como para carrito                   
            return await Carrito.find()
        }
        catch(error){
            console.log(error.message)
        }
    }
}