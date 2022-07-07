const { miCarrito } = require("../daos/index")
const { Router } = require('express');
const router = Router();
const mongoose = require("mongoose")

router.get('/', async (req,res) =>{
    const carrito = await miCarrito.mostrarTodoCarrito()
    res.send(carrito)
})

router.get("/:id/productos", async (req,res) =>{
    const id = req.params.id
    const carrito = await miCarrito.buscarCarritoPorId(id);
    res.send ({
        productos: carrito.productos
    }) 
})

router.post('/', async (req,res) => {
    const carrito = await miCarrito.crearCarrito()
    res.send(carrito)
})

router.post("/:id", async (req,res)=>{
    const idProducto = req.params.id
    console.log(`producto seleccionado = ${idProducto}`)

    const carrito = await miCarrito.mostrarTodoCarrito()
    console.log(carrito)
    if(carrito === undefined || []) {
        const crearCarrito = await miCarrito.crearCarrito()
        const idCarrito = crearCarrito.forEach(e=>mongoose.Types.ObjectId(e._id))
        console.log(idCarrito)
        await miCarrito.guardarEnCarrito(idCarrito, idProducto)
    }
    const idCarrito = carrito.forEach(e=>mongoose.Types.ObjectId(e._id).valueOf())
    await miCarrito.guardarEnCarrito(idCarrito, idProducto)
    res.redirect("/index")
})

router.delete("/:id", async (req,res) =>{
    const id = req.params.id
    const carritoFiltrado = await miCarrito.borrarCarritoPorId(id)
    res.send(carritoFiltrado)
})

router.delete("/:id/productos/:id_prod", async (req,res)=>{
    const idProducto = req.params.id_prod
    const idCarrito = req.params.id
    const carritoActualizado = await miCarrito.borrarProductoDeCarrito(idProducto, idCarrito)
    res.send(carritoActualizado)   
})

module.exports = router