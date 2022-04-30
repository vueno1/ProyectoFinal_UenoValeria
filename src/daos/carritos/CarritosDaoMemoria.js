const ContenedorMemoria = require("../../contenedores/ContenedorMemoria"); //importo el contenedor PADRE 
const Producto = require("../../daos/productos/ProductosDaoMemoria")

module.exports = class Carrito extends ContenedorMemoria {

    constructor() {
        super()
        this.productos = Producto;
    }

    mostrarTodoCarrito () {
        try{
            return this.contenido
        } 
        catch(error) {
            console.error(error)
        }        
    }

    async crearCarrito () {
        try {
            if (this.contenido.length === 0) {
                const nuevoCarrito = {
                    carritoNumero_id:1,
                    timestamp: Date.now(),
                    productos: []
                }

                this.contenido.push(nuevoCarrito)
                return this.contenido
            } 

            const ultimoId = this.contenido[this.contenido.length-1].carritoNumero_id + 1
            const nuevoCarrito = {
                carritoNumero_id: ultimoId,
                timestamp:Date.now(),
                productos: []
            }
            this.contenido.push(nuevoCarrito)
            return this.contenido          
          
        }
        catch(error) {
            console.error(error.message)
        }
    }

    async guardarEnCarrito(id, carritoId) {
        try {
            const carritos = await this.contenido
            const carritoSeleccionado = await carritos.find(carrito => carrito.carritoNumero_id === carritoId)
            
            console.log(misProductos)
            

            // if(!carritoSeleccionado || !productoElegido) return "el carrito o producto no existe!"
            // carritoSeleccionado.productos.push(productoElegido)
            // return productoElegido
        }      
        catch (error) {
            console.log(error.message)
        }
    }

    // async buscarCarritoPorId (id) {
    //     try {
    //         const lectura = await fs.promises.readFile(this.ruta,"utf-8")
    //         const contenido = await JSON.parse(lectura)
    //         const buscarPorId = contenido.find(elemento => elemento.carritoNumero_id === id)
    //         return buscarPorId
    //     }
    //     catch(error) {
    //         console.error(error)
    //     }
    // }

    // async borrarCarritoPorId (id) {
    //     try{
    //         const contenido = await this.mostrarTodo() 
    //         const productoIndice = contenido.findIndex(producto => producto.carritoNumero_id === id)  
    //         if(productoIndice === -1) return "el id no fue encontrado!" 
               
    //         const contenidoFiltrado = contenido.filter(producto => producto.carritoNumero_id !== id)
    //         fs.writeFileSync(this.ruta,JSON.stringify(contenidoFiltrado, null, 4))
    //         return `el id = ${id} fue eliminado`
    //     }
    //     catch(error) {
    //         console.error(error)
    //     }
    // }   

    // async borrarProductoDeCarrito(id, idCarrito) {
    //     try {
    //         const archivoCarrito = await fs.promises.readFile(ruta,"utf-8")
    //         const contenido = await JSON.parse(archivoCarrito)
    //         const carritoIndice = contenido.findIndex(carrito => carrito.carritoNumero_id === idCarrito)
    //         if(carritoIndice === -1) return "el carrito no existe!"
    //         const productoIndice = contenido[carritoIndice].productos.findIndex(producto => producto.id === id)
    //         if(productoIndice === -1) return "el producto no existe!"
    //         const carritoSeleccionado = contenido.find(carrito => carrito.carritoNumero_id === idCarrito)
    //         const productoFiltrado = carritoSeleccionado.productos.filter(producto => producto.id !== id)
    //         carritoSeleccionado.productos = productoFiltrado
    //         fs.writeFileSync(ruta, JSON.stringify(contenido, null, 4))
    //         return contenido
    //     }
    //     catch (error) {
    //         console.log(error)
    //     }
    // }



}