const Contenedor = require("../../API/ClassCarrito")
const miCarrito = new Contenedor()
const { Router } = require('express');
const router = Router();

const fs = require("fs")
const ruta = "./fileSystem/archivo.txt"

router.get('/', (req,res) =>{
    const carrito = miCarrito.mostrarTodoCarrito()
    if(!carrito.length) return res.send("no hay nada!")
    res.send(carrito)
})

router.get("/:id/productos", (req,res) =>{
    const id = Number(req.params.id)
    const carrito = miCarrito.mostrarTodoCarrito()
    const buscarCarrito = carrito.find(elemento => elemento.carritoNumero_id === id)
    if(!buscarCarrito) return res.send("el id no existe!")
    res.send ({
        carrito: id, 
        timestamp: buscarCarrito.timestamp,
        productos: buscarCarrito.productos
    }) 
})

//creo un carrito con su id 
router.post('/', (req, res) => {
    const carrito = miCarrito.crearCarrito()
    res.send(carrito)
})

//agrego producto x id a carrito x id de producto.
router.post("/:idCarrito/productos/:id", (req,res)=>{

    const actualizoLectura = fs.readFileSync(
        ruta,
        "utf-8"
    )

    const productos = JSON.parse(actualizoLectura)
    const id = Number(req.params.id)
    const productoSeleccionado = productos.find(objeto =>objeto.id === id)
    
    const idCarrito = Number(req.params.idCarrito)
    const carrito = miCarrito.mostrarTodoCarrito()
    const carritoElegido = carrito.find(elemento => elemento.carritoNumero_id === idCarrito)
    if(!productoSeleccionado || !carritoElegido) return res.send("id de producto o id de carrito incorrectos!")
    
    carritoElegido.productos.push(productoSeleccionado)    
    res.send ({
        carrito: idCarrito,
        seleccion: productoSeleccionado
    })
})

router.delete("/:id", (req,res) =>{
    const id = Number(req.params.id)
    const carrito = miCarrito.mostrarTodoCarrito()
    // const buscarId = carrito.find(objeto => objeto.carritoNumero_id === id)
    // if(!buscarId) return res.send("el id no existe!")

    miCarrito.borrarCarritoPorId(id)
    res.send({
        carritoEliminado: id,
        carritoActual: miCarrito.mostrarTodoCarrito()
    })
})

router.delete("/:id/productos/:id_prod", (req,res)=>{
    const idProducto = Number(req.params.id_prod)
    const idCarrito = Number(req.params.id)

    miCarrito.borrarProductoDeCarrito(idProducto, idCarrito)
    res.send({
        carrito: idCarrito,
        productoEliminado: idProducto,
        carritoActual: miCarrito.mostrarTodoCarrito()
    })
    
})

module.exports = router