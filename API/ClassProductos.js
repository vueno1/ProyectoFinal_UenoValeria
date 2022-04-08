const fs = require("fs")
const ruta = "./fileSystem/archivo.txt"

module.exports = class Productos { 

    constructor() {
    }

    async mostrarTodo() {
        try {
            const lectura = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(lectura)
            return contenido
        }
        catch(error) {
            console.error(error)
        }
    }

    async mostrarPorId (id) {
        try {
            const lectura = await fs.promises.readFile(ruta,"utf-8")
            const contenido = await JSON.parse(lectura)
            const buscarPorId = contenido.find(elemento => elemento.id === id)
            return buscarPorId
        }
        catch(error) {
            console.error(error)
        }
    }

    async guardar(objeto) {
        try {
            const productos = await this.mostrarTodo()        
            if(productos.length === 0) {
                objeto.id = 1
            } else {
                objeto.id = productos[productos.length-1].id + 1            
            }
            objeto.timestamp = Date.now()
            productos.push(objeto)
            fs.writeFileSync(ruta, JSON.stringify(productos,null,4))
            return productos
        }
        catch(error) {
            console.error(error)
        }
    }

    async actualizarPorId(id, reemplazo) {
        try {
            const contenido = await this.mostrarTodo()
            const productoIndice = contenido.findIndex(producto => producto.id === id)   
            if(productoIndice === -1) return
            
            contenido[productoIndice] = {
                nombre: reemplazo.nombre,
                descripcion: reemplazo.descripcion,
                codigo: reemplazo.codigo,
                foto: reemplazo.foto,
                precio: reemplazo.precio, 
                stock: reemplazo.stock,
                id: contenido[productoIndice].id,
                timestamp: Date.now()
            }
            fs.writeFileSync(ruta, JSON.stringify(contenido, null, 4))
            return contenido[productoIndice]
        }
        catch(error) {
            console.error(error)
        }
    }

    async eliminarPorId (id) {
        try{
            const contenido = await this.mostrarTodo()    
            const productoIndice = contenido.findIndex(producto => producto.id === id)   
            if(productoIndice === -1) return    
            const contenidoFiltrado = contenido.filter(producto => producto.id !== id)
            fs.writeFileSync(ruta,JSON.stringify(contenidoFiltrado, null, 4))
            return `el id = ${id} fue eliminado`
        }
        catch(error) {
            console.error(error)
        }
    }
}