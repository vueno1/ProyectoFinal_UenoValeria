const Contenedor = require("../../API/ClassProductos")
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
    const productos = misProductos.guardar(producto)
    res.send(productos)
})

router.put("/:id", (req, res) =>{
    const id = Number(req.params.id)
    const objetoReemplazo =req.body
    const actualizacion = misProductos.actualizarPorId(id, objetoReemplazo)

    if(!actualizacion) {
        res.send("el id no existe!")
    }
    res.send(actualizacion)
})

router.delete("/:id", (req,res) =>{
    const id = Number(req.params.id)
    const eliminacion = misProductos.eliminarPorId(id)

    if(!eliminacion) {
        res.send("el id no existe!")
    }
    res.send(eliminacion)
})

module.exports = router;//exporto mis rutas de productos