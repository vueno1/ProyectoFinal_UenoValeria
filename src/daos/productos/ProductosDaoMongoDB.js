import CRUD from '../contenedores/ContenedorMongoDB';
//recordar cambiar "type" en package.json

import { Producto } from "../models/Producto.js"

async function CRUD() {

    //CREATE
    const producto = new Producto (objeto) 
    await producto.save()

    //READ
    const productos = await Producto.find()
    console.log(productos)

    //UPDATE 
    const productoUpdate = await Producto.findByIdAndUpdate(id, {$set: {nombre: "nuevo nombre"}})
    console.log(productoUpdate)

    //DELETE
    const productoDelete = await Producto.findByIdAndDelete(id)
    console.log(productoDelete)

    
}

