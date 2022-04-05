const Contenedor = require("../../API/ClassCarrito")
const miCarrito = new Contenedor()

const { Router } = require('express');
const router = Router();

const fs = require("fs")
const ruta = "./fileSystem/archivo.txt"
const rutaCarrito = "./fileSystem/carrito.txt"

//loggeo de usuario autorizado
router.use((req,res,next) =>{
    if(req.query.nombre === "valeria") return next()
    res.send({
        error: -1,
        descripcion: "usuario no autorizado"
    })
})

//muestro mi carrito
router.get('/', (req,res) =>{
    const carrito = miCarrito.mostrarTodoCarrito()
    if(!carrito.length) return res.send("no hay nada!")
    res.send(carrito)
})

//muestro los productos de mi carrito x id.
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

//creo un carrito con su id unico.
router.post('/', (req, res) => {
    const carrito = miCarrito.crearCarrito()
    fs.writeFileSync(
        rutaCarrito,
        JSON.stringify(carrito, null, 2)
    )
    res.send(carrito)
})

//agrego producto x id_Producto a carrito x id_Carrito
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
    const carritoActualizado = miCarrito.mostrarTodoCarrito() 

    fs.writeFileSync(
        rutaCarrito, 
        JSON.stringify(carritoActualizado, null, 2)
    )

    res.send ({
        carrito: idCarrito,
        seleccion: productoSeleccionado
    })
})

//elimino carrito x id_carrito
router.delete("/:id", (req,res) =>{
    const id = Number(req.params.id)
    miCarrito.borrarCarritoPorId(id)
    const carrito = miCarrito.mostrarTodoCarrito()

    fs.writeFileSync(
        rutaCarrito,
        JSON.stringify(carrito, null, 2)
    )

    res.send({
        carritoEliminado: id,
        carritoActual: carrito
    })
})

//elimino producto x id, x id_carrito
router.delete("/:id/productos/:id_prod", (req,res)=>{
    const idProducto = Number(req.params.id_prod)
    const idCarrito = Number(req.params.id)

    miCarrito.borrarProductoDeCarrito(idProducto, idCarrito)
    const carritoActualizado = miCarrito.mostrarTodoCarrito()
    fs.writeFileSync(
        rutaCarrito,
        JSON.stringify(carritoActualizado, null, 2)
    )
    res.send({
        carrito: idCarrito,
        productoEliminado: idProducto,
        carritoActual: miCarrito.mostrarTodoCarrito()
    })
    
})

module.exports = router