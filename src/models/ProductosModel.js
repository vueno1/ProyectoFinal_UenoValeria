import mongoose from "mongoose";
const productosCollection = "productos";

const productosSchema = new mongoose.Schema({
    nombre: {type: String, required: true, max: 100},
    descripcion: {type: String, required: true, max: 100},
    codigo: {type: String, required: true, max: 100},
    foto: {type: String, required: true, max: 100},
    precio: {type: Number, required: true, max: 100},
    stock: {type: Number, required: true, max: 100},
    id: {type: Number, required: true, max: 100},
    timestamp: {type: Number, required: true, max: 100}
});

export const productos = mongoose.model(productosCollection, productosSchema);
