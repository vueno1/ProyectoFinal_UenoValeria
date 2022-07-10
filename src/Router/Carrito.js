const { miCarrito } = require("../daos/index")
const { Router } = require('express');
const router = Router();

router.post("/:id", async (req,res)=>{
    try {
        const idProducto = req.params.id
        const hayCarrito = await miCarrito.mostrarTodo()
        if(hayCarrito.length <= 0) {
            const idCarrito = await miCarrito.crearCarrito()
            await miCarrito.guardarEnCarrito(idCarrito, idProducto)

        } else {
           const carrito = await miCarrito.mostrarCarrito()
            await miCarrito.guardarEnCarrito(carrito._id, idProducto)
        }
        res.redirect("/index")
    }
    catch (error) {
        console.log(error)
    }
})

router.delete("/:id", async (req,res) =>{
    try{
        const id = req.params.id
        const carritoFiltrado = await miCarrito.borrarCarritoPorId(id)
        res.send(carritoFiltrado)

    }catch (e) {
        console.log(e)
    }
})

router.delete("/:id/productos/:id_prod", async (req,res)=>{
    try{
        const idProducto = req.params.id_prod
        const idCarrito = req.params.id
        const carritoActualizado = await miCarrito.borrarProductoDeCarrito(idProducto, idCarrito)
        res.send(carritoActualizado)   

    }
    catch (e) {
        console.log(e)
    }
})

module.exports = router