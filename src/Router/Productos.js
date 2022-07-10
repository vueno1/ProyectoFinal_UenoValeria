const { misProductos } = require("../daos/index")
const { Router } = require('express');
const router = Router();

router.get("/", async (req,res) =>{
    try {
        res.send ({
            misProductos: await misProductos.mostrarTodo()
        })

    }catch (e) {
        console.log(e)
    }
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