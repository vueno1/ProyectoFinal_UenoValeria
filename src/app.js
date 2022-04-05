const express = require ('express');
const productos = require("./Router/Productos") //importo mis rutas de productos.
const carrito = require("./Router/Carrito") //importo mis rutas de carrito.
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use('/api/productos', productos);
app.use('/api/carrito', carrito);

module.exports = app; //exporto mis server 
