const mongoose = require("mongoose");
const productosCollection = "productos"; 

const productosSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: Number, required: true, max: 100},
    foto: {type: String, required: true, max: 100},
    precio: {type: Number, required: true, max: 100},
    stock: {type: Number, required: true, max: 100},
    timestamp: {type: Date, default: Date.now()}
});

const Producto = mongoose.model(
    productosCollection, 
    productosSchema 
); 

module.exports = Producto