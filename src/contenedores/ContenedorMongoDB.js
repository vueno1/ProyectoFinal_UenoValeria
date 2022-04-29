const mongoose = require("mongoose");
const Producto = require("../models/ProductosModel");

    try{
        mongoose.connect(
            "mongodb://localhost:27017/ecommerce",
            () =>{
                console.log("Conectado a MongoDB");
            },e => {
                console.log(e.message);
            }
        );

        module.exports = class ContenedorMongoDB {

            constructor() {
                this.collection = Producto //esto es un array con mis objetos(doc)
            }
        
            //NO TOCAR!!!!
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
                    objeto.timestamp = Date.now()
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
                        _id: objetoAReemplazar._id,
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




