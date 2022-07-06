const { miCarrito } = require("../daos/index")
const { Router } = require('express');
const router = Router();
const mongoose = require("mongoose")

// router.use((req,res,next) =>{
//     if(req.query.nombre === "valeria") return next()
//     res.send({
//         error: -1,
//         descripcion: "usuario no autorizado"
//     })
// })

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

// Ahh ahi va. Si el usuario no tiene carrito y / o no hay ninguno seleccionado, 
// que al elegir un producto, automaticamnete se cree ese carrito?
// asi seria lo que queres hacer no?
// si es así podrías en la ruta, verificar si ese id tiene algo, 
// si es undefined, y a la vez te llego el id del producto, creas el carrito y luego le agregas el producto

router.post('/', async (req,res) => {
    const carrito = await miCarrito.crearCarrito()
    res.send(carrito)
})

router.post("/:id", async (req,res)=>{
    const idProducto = req.params.id
    console.log(idProducto)

    const carrito = await miCarrito.mostrarTodoCarrito()
    const idCarrito = carrito.forEach(e=>mongoose.Types.ObjectId(e._id).valueOf())
    console.log(idCarrito)

    await miCarrito.guardarEnCarrito(idCarrito, idProducto)
    res.end()
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