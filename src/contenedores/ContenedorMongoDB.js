const mongoose = require("mongoose");

    try{
        mongoose.connect(
            "mongodb://localhost:27017/ecommerce",
            () =>{
                console.log("Conectado a MongoDB");
            },e => {
                console.log(e.message);
            }
        );

        module.exports = class ContenedorMongodb {

            constructor(nombreCollecion) {
                this.collection = nombreCollecion 
            }
        
            async mostrarTodo() {
                try {
                    console.log("READ")
                    return await this.collection.find()
                } catch (error) {
                    console.error(error);
                }
            }

            async guardar(objeto) {
                try{ 
                    console.log("SAVED")
                    await this.collection.create(objeto)
                    return await this.collection.find()
                }
                catch(error) {
                    console.log(error)
                }
            }

            async actualizarPorId(id, reemplazo) {
                try {                  
                    console.log("UPDATED")   
                    const objetoAReemplazar = await this.collection.findOne({_id: id})
                    const objetoReemplazo = {
                        nombre: reemplazo.nombre,
                        descripcion: reemplazo.descripcion,
                        codigo: reemplazo.codigo,
                        foto: reemplazo.foto,
                        precio: reemplazo.precio, 
                        stock: reemplazo.stock,
                        id: objetoAReemplazar._id, //aca tuve que modificar _id x id
                        //me tiraba este error: Plan executor error during findAndModify :: caused by :: 
                        //Performing an update on the path '_id' would modify the immutable field '_id'
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
                    console.log("DELETE BY ID ")
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

    }
    catch(error) {
        console.log(error.message)
    }




