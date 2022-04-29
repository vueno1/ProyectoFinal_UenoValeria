const mongoose = require("mongoose");

//productosCollection es la colección de la base de datos
const productosCollection = "productos"; // esto es un array de objetos
//aca definimos que la coleccion se llamara productos

//new mongooose schema es una funcion que recibe un objeto
//eso lo ponemos en una constante "productosSchema"
//"productosSchema" es un objeto
const productosSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: Number, required: true, max: 100},
    foto: {type: String, required: true, max: 100},
    precio: {type: Number, required: true, max: 100},
    stock: {type: Number, required: true, max: 100}
    //id: {type: Number, required: true, max: 100},
    //timestamp: {type: Date, default: new Date(), required: true, max: 100}
    //type: tipo de dato
    //que significa requerido? es decir, que no puede estar vacio
    //max: maximo de caracteres

});

//creamos el modelo para ese schema.
//el primer parametro es el nombre de la coleccion
//el segundo parametro es el schema
//es decir, el nombre de la coleccion "productos" que es un array,  tiene como schema el objeto "productosSchema"
const Producto = mongoose.model(
    productosCollection, 
    productosSchema //{}
); 

module.exports = Producto