module.exports=class ContenedorMemoria {
    
    constructor () {
        this.contenido = []
    } 

    mostrarTodo () {
        try{
            return this.contenido
        } 
        catch(error) {
            console.error(error)
        }        
    }

    async buscarPorId (id) { 
        try {
            const resultado = await this.contenido.find (elemento => elemento.id === id)
            return resultado   
        }
        catch (error) {
            console.error(error)
        }
    }

    async guardar (objeto) {
        try {
            if (this.contenido.length === 0) {
                objeto.id = 1    
            } else {
                objeto.id = await this.contenido[this.contenido.length-1].id + 1
            }
            objeto.timestamp = Date.now() 
            this.contenido.push(objeto)
            return this.contenido
        }
        catch(error) {
            console.error(error)
        }        
    } 

    async borrarPorId(id) {
        try {
            const productoIndice = this.contenido.findIndex(producto => producto.id === id)
            if(productoIndice === -1 ) return 'el id no existe'
            
            this.contenido = this.contenido.filter(elemento=>elemento.id !== id)
            return `el id = ${id} fue eliminado`

        }
        catch(error) {
            console.error(error)
        }
    }
}
