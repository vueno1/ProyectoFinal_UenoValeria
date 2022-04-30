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
    async crearCarritoMongoDB (objeto) {

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
            //await Carrito.findOne({_id:idCarrito})
            //const producto = await Producto.findOne({_id:id}) 

            // Carrito.collection.findOneAndUpdate({_id:idCarrito}, {$pull: {"productos": {_id:id}}})
            Carrito.collection.findOneAndUpdate(
                {_id: idCarrito}, 
                {$pull: {productos: {_id:id}}}
            );

            //////////
            //PENDING 
            //////////

            // db.collection.update({
            //     "_id": "626c5fd2aa0fc0e4eef45c94"
            //   },
            //   {
            //     "$pull": {
            //       "productos": {
            //         "_id": "626d50b621180e291a330333"
            //       }
            //     }
            //   })
                   
            return await Carrito.find()
        }
        catch(error){
            console.log(error.message)
        }
    }
}