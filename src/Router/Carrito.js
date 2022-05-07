const { miCarrito } = require("../daos/index")

const { Router } = require('express');
const router = Router();

router.use((req,res,next) =>{
    if(req.query.nombre === "valeria") return next()
    res.send({
        error: -1,
        descripcion: "usuario no autorizado"
    })
})

router.get('/', async (req,res) =>{
    const carrito = await miCarrito.mostrarTodoCarrito()
    res.send(carrito)
})

router.get("/:id/productos", async (req,res) =>{
    const id = req.params.id
    const carrito = await miCarrito.buscarCarritoPorId(id);
    res.send ({
        carrito
    }) 
})

router.post('/', async (req,res) => {
    const carrito = await miCarrito.crearCarrito()
    res.send(carrito)
})

router.post("/:idCarrito/productos/:id", async (req,res)=>{
    const idProducto = req.params.id
    const idCarrito =  req.params.idCarrito
    const productoAgregado = await miCarrito.guardarEnCarrito(idCarrito, idProducto)
    res.send (productoAgregado)
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