const express = require ('express');
const productos = require("./Router/Productos") //importo mis rutas de productos.
const app = express()

app.use(express.json());
app.use(express.urlencoded({ extended:true }))
app.use('/api/productos', productos);

module.exports = app; //exporto mis server 
