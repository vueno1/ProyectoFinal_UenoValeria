const Contenedor = require("../../API/ClassProductos")
const misProductos = new Contenedor()

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

//muestro mis productos
router.get('/', async (req,res) =>{
    const productos = await misProductos.mostrarTodo()
    if(!productos.length) return res.send("no hay nada!")
    res.send(productos)
})

//guardo mis productos y agrego id unico + timestamp
router.post('/', async (req, res) => {
    const producto = await req.body
    const productos = await misProductos.guardar(producto)
    res.send(productos)
})

//cambio valor de propiedad segun id de producto
router.put("/:id", async (req, res) =>{
    const id = Number(req.params.id)
    const objetoReemplazo = req.body
    const actualizacion = await misProductos.actualizarPorId(id, objetoReemplazo)

    if(actualizacion === - 1) {
        res.send("el id no existe!")
    }
    res.send(actualizacion)
})

//elimino producto x id
router.delete("/:id", async (req,res) =>{    
    const id = Number(req.params.id)
    const eliminacion = await misProductos.eliminarPorId(id)
    if(!eliminacion) {
        res.send("el id no existe!")
    }
    res.send(eliminacion)
})

module.exports = router;//exporto mis rutas de productos