module.exports = class Productos { 

    constructor() {
        this.contenido = []
    }

    mostrarTodo() {
        return this.contenido
    }

    mostrarPorId (id) {
        const buscarPorId = this.contenido.find(elemento => elemento.id === id)
        return buscarPorId
    }

    guardar(objeto) {
        
        if(this.contenido.length === 0) {
            console.log(objeto)
            objeto.id = 1

            this.contenido.push(objeto)
            return this.contenido
        }

        objeto.id = this.contenido[this.contenido.length-1].id + 1
        this.contenido.push(objeto)
        return this.contenido
    }

    actualizarPorId(id, reemplazo) {
        const objetoIndice = this.contenido.findIndex(objeto => objeto.id === id)   
        if(objetoIndice === -1) return
        
        this.contenido[objetoIndice] = {
            nombre: reemplazo.nombre,
            precio: reemplazo.precio, 
            id: this.contenido[objetoIndice].id
        }
        return this.contenido[objetoIndice]
    }

    eliminarPorId (id) {
        const objetoIndice = this.contenido.findIndex(objeto => objeto.id === id)   
        if(objetoIndice === -1) return

        this.contenido = this.contenido.filter(objeto => objeto.id !== id)
        return `el id = ${id} fue eliminado`
    }
}