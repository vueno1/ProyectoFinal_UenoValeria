const express = require ('express');
const app = express()

//importo mis rutas 
const productos = require("../Router/Productos") //importo mis rutas de productos.
//const carrito = require("./Router/Carrito") //importo mis rutas de carrito.

//middleware para configuracion formatos
app.use(express.json());
app.use(express.urlencoded({ extended:true }))

//middleware por rutas 
app.use('/api/productos', productos);
//app.use('/api/carrito', carrito);

module.exports = app; //exporto mis server 