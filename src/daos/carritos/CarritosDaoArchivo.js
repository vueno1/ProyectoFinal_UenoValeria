const fs = require("fs")
const ContenedorArchivo = require("../../contenedores/ContenedorArchivo")
const ruta = "./filesystem/carrito.txt"
const rutaProductos = "./filesystem/producto.txt"

module.exports = class Producto extends ContenedorArchivo { 
    
    constructor() {
        super("./filesystem/carrito.txt")
    } 

    async mostrarTodoCarrito(){
        try {
            const lectura = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(lectura)
            return contenido
        }
        catch(error) {
            console.error(error)
        }
    }
    
    async crearCarrito () {
        try{
            const archivoCarrito = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(archivoCarrito)

            if(contenido.length === 0) {
                const nuevoCarrito = {
                    carritoNumero_id:1,
                    timestamp: Date.now(),
                    productos: []
                }
                contenido.push(nuevoCarrito)   
                fs.writeFileSync(ruta, JSON.stringify(contenido, null, 4))             
                return contenido
            }
            const ultimoId = contenido[contenido.length-1].carritoNumero_id + 1
            const nuevoCarrito = {
                carritoNumero_id: ultimoId,
                timestamp:Date.now(),
                productos: [] 
            } 

            contenido.push(nuevoCarrito)
            fs.writeFileSync(ruta, JSON.stringify(contenido, null, 4))
            return contenido
        }
        catch (error) {
            console.log(error)
        }
    }

    async guardarEnCarrito(carritoId, id) { 
        try {
            const idNumber = Number(id)
            const idCarritoNumber = Number(carritoId)
            const archivoCarrito = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(archivoCarrito)

            const carritoIndice = contenido.findIndex(carrito => carrito.carritoNumero_id === idCarritoNumber)
            if(carritoIndice === -1) return "el carrito no existe!"

            const productoIndice = contenido[carritoIndice].productos.findIndex(producto => producto.id === idNumber)
            if(productoIndice !== -1) return "el producto ya existe en el carrito!"

            // const producto = await this.buscarPorId(idNumber)
            const productosArchivo = await fs.promises.readFile(rutaProductos,"utf-8")
            const productos = await JSON.parse(productosArchivo)
            const producto = productos.find(producto => producto.id === idNumber)
            if(!producto) return "el producto no existe!"
            
            const carritoSeleccionado = contenido.find(carrito => carrito.carritoNumero_id === idCarritoNumber)
            carritoSeleccionado.productos.push(producto)
            fs.writeFileSync(ruta, JSON.stringify(contenido, null, 4))
            return contenido          
            
        }      
        catch (error) {
            console.log(error)
        }
    }

    async buscarCarritoPorId (id) {
        try {
            const idNumber = Number(id)
            const lectura = await fs.promises.readFile(this.ruta,"utf-8")
            const contenido = await JSON.parse(lectura)
            const buscarPorId = contenido.find(elemento => elemento.carritoNumero_id === idNumber)
            return buscarPorId
        }
        catch(error) {
            console.error(error)
        }
    }

    async borrarCarritoPorId (id) {
        try{
            const idNumber = Number(id)
            const contenido = await this.mostrarTodo() 
            const productoIndice = contenido.findIndex(producto => producto.carritoNumero_id === idNumber)  
            if(productoIndice === -1) return "el id no fue encontrado!" 
               
            const contenidoFiltrado = contenido.filter(producto => producto.carritoNumero_id !== idNumber)
            fs.writeFileSync(this.ruta,JSON.stringify(contenidoFiltrado, null, 4))
            return `el id = ${id} fue eliminado`
        }
        catch(error) {
            console.error(error)
        }
    }   

    async borrarProductoDeCarrito(id, idCarrito) {
        try {
            const idNumber = Number(id)
            const idCarritoNumber = Number(idCarrito)
            const archivoCarrito = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(archivoCarrito)
            const carritoIndice = contenido.findIndex(carrito => carrito.carritoNumero_id === idCarritoNumber)
            if(carritoIndice === -1) return "el carrito no existe!"
            const productoIndice = contenido[carritoIndice].productos.findIndex(producto => producto.id === idNumber)
            if(productoIndice === -1) return "el producto no existe!"
            const carritoSeleccionado = contenido.find(carrito => carrito.carritoNumero_id === idCarritoNumber)
            const productoFiltrado = carritoSeleccionado.productos.filter(producto => producto.id !== idNumber)
            carritoSeleccionado.productos = productoFiltrado
            fs.writeFileSync(ruta, JSON.stringify(contenido, null, 4))
            return contenido
        }
        catch (error) {
            console.log(error)
        }
    }

}



