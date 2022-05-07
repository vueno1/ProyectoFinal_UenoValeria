const { misProductos } = require("../daos/index")

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
    const productos = await misProductos.mostrarTodo()
    if(!productos.length) return res.send("no hay nada!")
    res.send(productos)
})

router.post('/', async (req, res) => {
    const producto = await req.body
    const productos = await misProductos.guardar(producto)
    res.send(productos)
})

router.put("/:id", async (req, res) =>{
    const id = req.params.id
    const objetoReemplazo = req.body
    const actualizacion = await misProductos.actualizarPorId(id, objetoReemplazo)

    if(actualizacion === - 1) {
        res.send("el id no existe!")
    }
    res.send(actualizacion)
})

router.delete("/:id", async (req,res) =>{    
    const id = req.params.id
    const eliminacion = await misProductos.borrarPorId(id)
    if(!eliminacion) {
        res.send("el id no existe!")
    }
    res.send(eliminacion)
})

module.exports = router;