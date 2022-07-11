const { misProductos } = require("../daos/index.js")
const { Router } = require('express');
const router = Router();

const log4js = require("../config/log")
const logger = log4js.getLogger("archivo")

router.get("/", async (req,res) =>{
    try {
        res.send ({
            misProductos: await misProductos.mostrarTodo()
        })

    }catch (e) {
        logger.error(e)
    }
})

router.post('/', async (req, res) => {
    try {
        const producto = await req.body
        const productos = await misProductos.guardar(producto)
        res.send(productos)
    } catch(e) {
        logger.error(e)
    }
})

router.put("/:id", async (req, res) =>{
    try{
        const id = req.params.id
        const objetoReemplazo = req.body
        const actualizacion = await misProductos.actualizarPorId(id, objetoReemplazo)
    
        if(actualizacion === - 1) {
            res.send("el id no existe!")
        }
        res.send(actualizacion)
    }  catch (e) {
        logger.error(e)
    }
})

router.delete("/:id", async (req,res) =>{    
    try{
        const id = req.params.id
        const eliminacion = await misProductos.borrarPorId(id)
        if(!eliminacion) {
            res.send("el id no existe!")
        }
        res.send(eliminacion)
    } catch(e) {
        logger.error(e)
    }
})

module.exports = router;