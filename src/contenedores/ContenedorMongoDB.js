module.exports = class ContenedorMongodb {

    constructor(nombreCollecion) {
        this.collection = nombreCollecion 
    }

    async mostrarTodo() {
        try {
            const collection = await this.collection.find()
            return collection
        } catch (error) {
            console.error(error);
        }
    }

    async guardar(objeto) {
        try{ 
            await this.collection.create(objeto)
            return await this.collection.find()
        }
        catch(error) {
            console.log(error)
        }
    }

    async actualizarPorId(id, reemplazo) {
        try {                  
            const objetoAReemplazar = await this.collection.findOne({_id: id})
            const objetoReemplazo = {
                nombre: reemplazo.nombre,
                descripcion: reemplazo.descripcion,
                codigo: reemplazo.codigo,
                foto: reemplazo.foto,
                precio: reemplazo.precio, 
                stock: reemplazo.stock,
                id: objetoAReemplazar._id, 
                timestamp: Date.now()
            }
            await this.collection.findOneAndUpdate(objetoAReemplazar, {$set: objetoReemplazo})
            return this.collection.find()
        }
        catch(error) {
            console.log(error.message)
        }
    }

    async borrarPorId(id) {
        try {
            this.collection.deleteOne({_id : id}, function(err){
                if(err) return handleError(err)
            })
            return this.collection.find()
        }
        catch(error) {
            console.log(error.message)
        }
    }
    
}




