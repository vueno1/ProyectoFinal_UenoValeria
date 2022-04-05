const Contenedor = require("../../API/ClassProductos")
const misProductos = new Contenedor()
const fs = require("fs")
const ruta = "./fileSystem/archivo.txt"

const { Router } = require('express');
const router = Router();

// const leerArchivo = fs.readFileSync(
//     ruta,
//     "utf-8"
// )

router.get('/', (req,res) =>{
    const productos = misProductos.mostrarTodo()
    if(!productos.length) return res.send("no hay nada!")
    res.send(productos)
})

router.post('/', (req, res) => {
    const producto = req.body
    const productos = misProductos.guardar(producto)

    fs.writeFileSync(
        ruta,
        JSON.stringify(productos, null, 2)
    )
    res.send(productos)
})

router.put("/:id", (req, res) =>{
    const id = Number(req.params.id)
    const objetoReemplazo =req.body
    const actualizacion = misProductos.actualizarPorId(id, objetoReemplazo)

    if(!actualizacion) {
        res.send("el id no existe!")
    }

    const misProductosActualizados = misProductos.mostrarTodo()

    fs.writeFileSync(
        ruta,
        JSON.stringify(misProductosActualizados, null, 2)
    )
    res.send(actualizacion)
})

router.delete("/:id", (req,res) =>{
    const id = Number(req.params.id)
    const eliminacion = misProductos.eliminarPorId(id)

    if(!eliminacion) {
        res.send("el id no existe!")
    }

    const misProductosActualizados = misProductos.mostrarTodo()

    fs.writeFileSync(
        ruta,
        JSON.stringify(misProductosActualizados, null, 2)
    )
    
    res.send(eliminacion)
})

// router.delete("/", (req, res) =>{

// })

module.exports = router;//exporto mis rutas de productos