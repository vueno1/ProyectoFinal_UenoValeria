const fs = require("fs")
const ContenedorArchivo = require("../../contenedores/ContenedorArchivo")
const ruta = "./filesystem/producto.txt"

module.exports = class Producto extends ContenedorArchivo { 
    
    constructor() {
        super("./filesystem/producto.txt")
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
}



