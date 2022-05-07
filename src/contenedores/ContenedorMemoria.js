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
            const idNumber = Number(id)
            const resultado = await this.contenido.find (elemento => elemento.id === idNumber)
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
            const idNumber = Number(id)
            const productoIndice = this.contenido.findIndex(producto => producto.id === idNumber)
            if(productoIndice === -1 ) return 'el id no existe'
            
            this.contenido = this.contenido.filter(elemento=>elemento.id !== idNumber)
            return `el id = ${idNumber} fue eliminado`

        }
        catch(error) {
            console.error(error)
        }
    }
}
