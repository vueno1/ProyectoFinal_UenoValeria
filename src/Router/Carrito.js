const Contenedor = require("../../API/ClassCarrito")
const miCarrito = new Contenedor()

const { Router } = require('express');
const router = Router();

//loggeo de usuario autorizado
router.use((req,res,next) =>{
    if(req.query.nombre === "valeria") return next()
    res.send({
        error: -1,
        descripcion: "usuario no autorizado"
    })
})

//muestro mi carrito → ok 
router.get('/', async (req,res) =>{
    const carrito = await miCarrito.mostrarTodoCarrito()
    res.send(carrito)
})

//muestro los productos de mi carrito x id.
router.get("/:id/productos", async (req,res) =>{
    const id = Number(req.params.id)
    const carrito = await miCarrito.mostrarPorId(id)    
    res.send ({
        carrito: id, 
        timestamp: carrito.timestamp,
        productos: carrito.productos
    }) 
})

//creo un carrito con su id unico. → ok
router.post('/', async (req,res) => {
    const carrito = await miCarrito.crearCarrito()
    res.send(carrito)
})

//agrego producto x id_Producto a carrito x id_Carrito → ok
router.post("/:idCarrito/productos/:id", async (req,res)=>{
    const idProducto = Number(req.params.id)
    const idCarrito = Number(req.params.idCarrito)
    const productoAgregado = await miCarrito.guardarEnCarrito(idProducto, idCarrito)
    res.send (productoAgregado)
})

//elimino carrito x id_carrito
router.delete("/:id", async (req,res) =>{
    const id = Number(req.params.id)
    const carritoFiltrado = await miCarrito.borrarCarritoPorId(id)
    res.send(carritoFiltrado)
})

//elimino producto x id, x id_carrito
router.delete("/:id/productos/:id_prod", async (req,res)=>{
    const idProducto = Number(req.params.id_prod)
    const idCarrito = Number(req.params.id)
    const carritoActualizado = await miCarrito.borrarProductoDeCarrito(idProducto, idCarrito)
    res.send(carritoActualizado)   
})

module.exports = router