const dotenv = require("dotenv");
dotenv.config(); //detecta el .env x default
const PORT = process.env.PORT || 8080
const server = require("./src/config/app")

//middleware para verificar ruta correcta.
server.use((req, res, next) =>{
    if(req.query === server) return next()
    res.send({
        error: -1,
        descripcion: `ruta no implementada`
    })
})

server.listen(PORT, ()=>{
    console.log(`escuchando el puerto =  ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))