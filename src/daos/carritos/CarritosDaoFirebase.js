const ContenedorFirebase = require("../../contenedores/ContenedorFirebase")

//me traigo todos los productos creados. 
const ProductosDaoFirebase = require("../productos/ProductosDaoFirebase")
const misProductos = new ProductosDaoFirebase()


module.exports = class CarritosDaoFirebase extends ContenedorFirebase {
    constructor(){
        super("carritos")
    }

    async mostrarTodoCarrito() {
        try {
            const querySnapShot = await this.collection.get() 
            let docs = querySnapShot.docs;
            const response = docs.map((doc) =>({
                id: doc.id,
                timestamp: doc.data().timestamp,
                productos: doc.data().productos
            }));
            return response

        } catch (error) {
            console.error(error);
        }
    }

    async crearCarrito() {
        try {
            console.log("CREANDO CARRITO")
            let doc = this.collection.doc()
            await doc.create({
                timestamp: Date.now(),
                productos: []            
              
            })
            return await this.mostrarTodoCarrito()
        }
        catch(error) {
            console.log(error.message)
        }
    }

    async guardarEnCarrito(idCarrito, idProducto) {
        try {
            console.log("GUARDANDO EN CARRITO")
            const doc = this.collection.doc(`${idCarrito}`)
            const docs = await doc.get()
            const data = docs.data(); 
            //obtengo la data de mis carritos, pasando x promesas y formas de firebase de obtener info.      

            //luego, traigo mi instancia de productos
            const productos = await misProductos.mostrarTodo()
            const productoSeleccionado = productos.find(producto=>producto.id===idProducto)
 
            //tomo la propiedad "productos" de mi carrito para pushear mi producto seleccionado
            const productosEnCarrito = data.productos
            productosEnCarrito.push(productoSeleccionado);
    
            //actualizo mi propiedad "productos" de mi carrito.
            await doc.update({
                timestamp: Date.now(),
                productos: productosEnCarrito
            });

            return await this.mostrarTodoCarrito()            
        }
        catch(error){
            console.log(error.message)
        }
    }

    async buscarCarritoPorId (id) {
        try{
            console.log("muestro carrito")
            const doc = this.collection.doc(`${id}`)
            const docs = await doc.get()
            const data = docs.data(); 
            return data
        }
        catch(error) {
            console.log(error.message)
        }
    }

    async borrarCarritoPorId (id) {
        try{
            console.log("carrito borrado")
            const doc = this.collection.doc(`${id}`)
            await doc.delete()
            return await this.mostrarTodoCarrito()

        }
        catch(error) {
            console.log(error.message)
        }
    }

    async borrarProductoDeCarrito(id, idCarrito) {
        try{
            console.log("producto borrado")
            const doc = this.collection.doc(`${idCarrito}`)
            const docs = await doc.get()
            const data = docs.data();
            const productos = data.productos
            const productosEnCarrito = productos.filter(producto=>producto.id!==id)
            await doc.update({
                timestamp: Date.now(),
                productos: productosEnCarrito
            });
            return await this.mostrarTodoCarrito()
        }
        catch(error) {
            console.log(error.message)
        }
    }
}
    
   