const fs = require("fs")

module.exports = class ContenedorArchivo { 

    constructor(ruta) {
        this.ruta = ruta
    }

    async mostrarTodo() {
        try {
            const lectura = await fs.promises.readFile(this.ruta,"utf-8")
            const contenido = await JSON.parse(lectura)
            return contenido
        }
        catch(error) {
            console.error(error)
        }
    }

    async buscarPorId (id) {
        try {
            const idNumber = Number(id)
            const lectura = await fs.promises.readFile(this.ruta,"utf-8")
            const contenido = await JSON.parse(lectura)
            const buscarPorId = contenido.find(elemento => elemento.id === idNumber)
            return buscarPorId
        }
        catch(error) {
            console.error(error)
        }
    }

    async guardar(objeto) {
        try {
            const contenido = await this.mostrarTodo()        
            if(contenido.length === 0) {
                objeto.id = 1
            } else {
                objeto.id = contenido[contenido.length-1].id + 1            
            }
            objeto.timestamp = Date.now()
            contenido.push(objeto)
            fs.writeFileSync(this.ruta, JSON.stringify(contenido,null,4))
            return contenido
        }
        catch(error) {
            console.error(error)
        }
    }   

    async borrarPorId (id) {
        try{
            const idNumber = Number(id)
            const contenido = await this.mostrarTodo()    
            const productoIndice = contenido.findIndex(producto => producto.id === idNumber)  

            if(productoIndice === -1) return "el id no fue encontrado!" 
               
            const contenidoFiltrado = contenido.filter(producto => producto.id !== idNumber)
            fs.writeFileSync(this.ruta,JSON.stringify(contenidoFiltrado, null, 4))
            return `el id = ${id} fue eliminado`
        }
        catch(error) {
            console.error(error)
        }
    }   
}