//ARCHIVO//
// const CarritoDaoArchivo = require("");
// const miCarrito = new CarritoDaoArchivo ()

//MEMORIA//
const CarritoDaoMemoria = require("../daos/carritos/CarritosDaoMemoria");
const miCarrito = new CarritoDaoMemoria()

//MONGODB//
// const CarritosDaoMongoDB = require("../daos/carritos/CarritosDaoMongoDB")
// const miCarrito = new CarritosDaoMongoDB()

//FIREBASE//
// const ContenedorFirebase = require("../contenedores/ContenedorFirebase")
// const miCarrito = new ContenedorFirebase()

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

///////////////////////
//MUESTRO MIS CARRITOS
//////////////////////
router.get('/', async (req,res) =>{
    const carrito = await miCarrito.mostrarTodo()
    res.send(carrito)
})

/////////////////////////
//MUESTRO MI CARRITO X ID
///////////////////////////
router.get("/:id/productos", async (req,res) =>{
    const id = Number(req.params.id)
    const carrito = await miCarrito.buscarCarritoPorId(id);
    res.send ({
        carrito
    }) 
})

///OPCION PARA MONGODB////
// router.get("/:id/productos", async (req,res) =>{
//     const id = req.params.id
//     const carrito = await miCarrito.buscarCarritoPorId(id);
//     res.send ({
//         carrito
//     }) 
// })

//////////////////////
//CREO UN CARRITO NUEVO
////////////////////////
//creo un carrito con su id unico. → ok
router.post('/', async (req,res) => {
    const carrito = await miCarrito.crearCarrito()
    res.send(carrito)
})

//OPCION PARA MONGODB//
// router.post("/", async(req,res)=>{
//     const objeto = req.body
//     const carritoNuevo = await miCarrito.crearCarritoMongoDB(objeto)
//     res.send(carritoNuevo)
// })

/////////////////////////////////////////
//AGREGO UN PRODUCTO A EL CARRITO ELEGIDO
///////////////////////////////////////////
router.post("/:idCarrito/productos/:id", async (req,res)=>{
    const idProducto = Number(req.params.id)
    const idCarrito = Number(req.params.idCarrito)
    const productoAgregado = await miCarrito.guardarEnCarrito(idProducto, idCarrito)
    res.send (productoAgregado)
})

//OPCION PARA MONGODB//
// router.post("/:idCarrito/productos/:id", async (req,res)=>{
//     const idCarrito = req.params.idCarrito
//     const idProducto = req.params.id
//     const productoAgregado = await miCarrito.guardarEnCarrito(idCarrito, idProducto)
//     res.send (productoAgregado)
// })

//////////////////////
//ELIMINO CARRITO X ID
/////////////////////
router.delete("/:id", async (req,res) =>{
    const id = Number(req.params.id)
    const carritoFiltrado = await miCarrito.borrarCarritoPorId(id)
    res.send(carritoFiltrado)
})

//opcion PARA MONGODB//
// router.delete("/:id", async (req,res) =>{
//     const id = req.params.id
//     const carritoFiltrado = await miCarrito.borrarCarritoPorId(id)
//     res.send(carritoFiltrado)
// })

/////////////////////////////////
//ELIMINAR PRODUCTO DE UN CARRITO
/////////////////////////////////
router.delete("/:id/productos/:id_prod", async (req,res)=>{
    const idProducto = Number(req.params.id_prod)
    const idCarrito = Number(req.params.id)
    const carritoActualizado = await miCarrito.borrarProductoDeCarrito(idProducto, idCarrito)
    res.send(carritoActualizado)   
})

//OPCION PARA MONGODB//
// router.delete("/:id/productos/:id_prod", async (req,res)=>{
//     const idProducto = req.params.id_prod
//     const idCarrito = req.params.id
//     const carritoActualizado = await miCarrito.borrarProductoDeCarrito(idCarrito, idProducto)
//     res.send(carritoActualizado)   
// })

module.exports = router