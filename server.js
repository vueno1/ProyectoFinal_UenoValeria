const port = 8080
const server = require("./src/app")

server.listen(port, ()=>{
    console.log(`escuchando el puerto =  ${port}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))