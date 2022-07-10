require("dotenv").config() 
const PORT = process.env.PORT || 3000
const cluster = process.env.CLUSTER
const [, , argumento] = process.argv

const log4js = require("./src/config/log")
const logger = log4js.getLogger()

if(argumento === cluster) {
    const cluster = require("cluster")
    const numCPUs = require("os").cpus().length

    if(cluster.isMaster) {
        for(let i=0; i<numCPUs; i++) {
            cluster.fork()
        }

        cluster.on("listening", (worker,address)=>{
            logger.info(`worker = ${worker.process.pid}`)
        })
    } else {
        const server = require("./src/config/app")    
        server.listen(PORT, ()=>{
            logger.debug(`puerto = ${PORT}`)
        })
        server.on("error", error => console.log(`Error en servidor ${error}`))
    }

} else {
    const server = require("./src/config/app")    
    server.listen(PORT, ()=>{
        console.log(`escuchando el puerto =  ${PORT}`)
    })
    server.on("error", error => console.log(`Error en servidor ${error}`))
}
