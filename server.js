require("dotenv").config() 
const PORT = process.env.PORT || 3000
const server = require("./src/config/app")

server.listen(PORT, ()=>{
    console.log(`escuchando el puerto =  ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))