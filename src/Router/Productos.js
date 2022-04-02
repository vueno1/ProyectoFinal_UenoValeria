const Contenedor = require("../../API/Class")
const misProductos = new Contenedor()

const { Router } = require('express');
const router = Router();

router.get('/', (req,res) =>{
    const productos = misProductos.mostrarTodo()
    if(!productos.length) return res.send("no hay nada!")
    res.send(productos)
})

router.post('/', (req, res) => {
    const producto = req.body
    console.log(producto)
    const productos = misProductos.guardar(producto)
    res.send(productos)
})

module.exports = router;//exporto mis rutas de productos