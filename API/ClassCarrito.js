module.exports = class Carrito { 

    constructor() {
        this.carrito = []
    }

    crearCarrito () {

        if(this.carrito.length === 0) {

            const nuevoCarrito = {
                carritoNumero_id:1,
                timestamp: Date.now(),
                productos: []
            }
            this.carrito.push(nuevoCarrito)
            return this.carrito
        }

        const ultimoId = this.carrito[this.carrito.length-1].carritoNumero_id + 1

        const nuevoCarrito = {
            carritoNumero_id: ultimoId,
            timestamp:Date.now(),
            productos: []  
        }
        this.carrito.push(nuevoCarrito)
        return this.carrito
    }

    guardarEnCarrito(producto) {       
        this.carrito.forEach(elemento =>{
        elemento.productos.push(producto)
        })
        return this.carrito
    }

    mostrarTodoCarrito() {
        return this.carrito
    }

    borrarCarritoPorId (id) {
        const objetoIndice = this.carrito.findIndex(objeto => objeto.carritoNumero_id === id)   
        if(objetoIndice === -1) return "el carrito no existe!"

        this.carrito = this.carrito.filter(objeto => objeto.carritoNumero_id !== id)
        return `el carrito numero = ${id} fue eliminado`
    }

    borrarProductoDeCarrito(id, idCarrito) {

        const carritoSeleccion = this.carrito.find(objeto => objeto.carritoNumero_id === idCarrito)
        const productosFiltrados = carritoSeleccion.productos.filter(objeto => objeto.id !== id)

        if(!carritoSeleccion || !productosFiltrados) return "el carrito o el producto no existen"

        carritoSeleccion.productos = productosFiltrados        
        this.carrito = this.carrito.filter(objeto => objeto.carritoNumero_id !== idCarrito)
        this.carrito.push(carritoSeleccion)
        return this.carrito
    }
}