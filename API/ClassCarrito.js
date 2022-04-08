const fs = require("fs")
const ruta = "./fileSystem/carrito.txt"
const rutaProductos = "./fileSystem/archivo.txt"

module.exports = class Carrito { 
    
    constructor() {
    }
    
    async mostrarTodoCarrito() {
        try{
            const archivoCarrito = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(archivoCarrito)
            if(contenido.length === 0) return "no hay nada"
            return contenido
        }
        catch(error) {
            console.log(error)
        }
    }

    async mostrarPorId(id) {
        try{
            const archivoCarrito = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(archivoCarrito)
            const carritoIndice = contenido.findIndex(carrito => carrito.carritoNumero_id === id)
            if(carritoIndice === -1) return "el carrito no existe!" 
                       
            const carritoSeleccionado = contenido.find(carrito => carrito.carritoNumero_id === id)
            return carritoSeleccionado
        }
        catch (error) {
            console.log(error)
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

    async guardarEnCarrito(id, carritoId) { 
        try {
            const lecturaArchivoCarrito = await fs.promises.readFile(ruta,"utf-8")
            const carritos = await JSON.parse(lecturaArchivoCarrito)
            const lecturaArchivoProductos = await fs.promises.readFile(rutaProductos, "utf-8")
            const productos = await JSON.parse(lecturaArchivoProductos)
            
            const carritoSeleccionado = carritos.find(carrito => carrito.carritoNumero_id === carritoId)
            const productoElegido = productos.find(producto=>producto.id === id)
            if(!carritoSeleccionado || !productoElegido) return "el carrito o producto no existe!"
            
            carritoSeleccionado.productos.push(productoElegido)
            fs.writeFileSync(ruta, JSON.stringify(carritos, null, 4))            
            return productoElegido
        }      
        catch (error) {
            console.log(error)
        }
    }

    async borrarCarritoPorId (id) {
        try {
            const archivoCarrito = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(archivoCarrito)            
            const carritoIndice = contenido.findIndex(carrito => carrito.carritoNumero_id === id)
            if(carritoIndice === -1) return "el carrito no existe!"
            
            const contenidoFiltrado = contenido.filter(carrito => carrito.carritoNumero_id !== id)
            fs.writeFileSync(ruta, JSON.stringify(contenidoFiltrado, null, 4))
            return contenidoFiltrado
        }
        catch (error) {
            console.log(error)
        }
    }

    async borrarProductoDeCarrito(id, idCarrito) {
        try {
            const archivoCarrito = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(archivoCarrito)

            const carritoIndice = contenido.findIndex(carrito => carrito.carritoNumero_id === idCarrito)
            if(carritoIndice === -1) return "el carrito no existe!"
            const productoIndice = contenido[carritoIndice].productos.findIndex(producto => producto.id === id)
            if(productoIndice === -1) return "el producto no existe!"

            const carritoSeleccionado = contenido.find(carrito => carrito.carritoNumero_id === idCarrito)
            const productoFiltrado = carritoSeleccionado.productos.filter(producto => producto.id !== id)
            carritoSeleccionado.productos = productoFiltrado
            fs.writeFileSync(ruta, JSON.stringify(contenido, null, 4))
            return contenido
        }
        catch (error) {
            console.log(error)
        }
    }
}