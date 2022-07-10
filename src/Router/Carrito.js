const { miCarrito } = require("../daos/index")
const { Router } = require('express');
const router = Router();

// router.get('/', async (req,res) =>{
//     const carrito = await miCarrito.mostrarTodoCarrito()
//     res.send(carrito)
// })

// router.get("/:id/productos", async (req,res) =>{
//     const id = req.params.id
//     const carrito = await miCarrito.buscarCarritoPorId(id);
//     res.send ({
//         productos: carrito.productos
//     }) 
// })

// router.post('/', async (req,res) => {
//     const carrito = await miCarrito.crearCarrito()
//     res.send(carrito)
// })

router.post("/:id", async (req,res)=>{
    try {
        const idProducto = req.params.id
        console.log(`producto seleccionado = ${idProducto}`)  
        const hayCarrito = await miCarrito.mostrarTodo()
        if(hayCarrito.length <= 0) {
            const idCarrito = await miCarrito.crearCarrito()
            console.log(idCarrito)
            await miCarrito.guardarEnCarrito(idCarrito, idProducto)

        } else {
           const carrito = await miCarrito.mostrarCarrito()
            console.log(carrito._id)
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