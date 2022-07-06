const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Usuario = require('../models/user')
const passport = require('../passport/passport')
require("../config/mongoose")
const { miCarrito, misProductos } = require("../daos/index")
const mongoose = require("mongoose")

const log4js = require("../logs/log")
const logger = log4js.getLogger()
const loggerwarnFile = log4js.getLogger("archivo");

router.get("/login", async (req, res) => {
    try{
        logger.info("esto es login!")
        res.render("login")
    }
    catch(error){
        loggerwarnFile.warn(`warning = ${error}`)
    }
})

router.post('/login', 
    passport.authenticate("local", {
        successRedirect: "/index",
        failureRedirect: "/login_error"
    })
);

router.get("/login_error", (req, res) => {
    try{
        logger.warn("error al loggearse!")
        res.render("login_error")
    }
    catch(error){
        loggerwarnFile.warn(`warning = ${error}`)
    }
})

router.get("/register",  (req, res) => {
    try{
        logger.info("esto es register")
        res.render("register")
    }
    catch(error){
        loggerwarnFile.warn(`warning = ${error}`)
    }
})

router.post("/register", async (req,res) =>{
    try{
        const usuariosRegistrados = await Usuario.find()
        const { email,
                password,
                name,
                address, 
                age, 
                phone, 
                avatar
              } = await req.body

        if(usuariosRegistrados.find(usuario => usuario.email === email)){
            logger.warn("el usuario ya esta registrado!")
            res.render("register_error")
        }        
        const salt = await bcrypt.genSalt(10) //ejecuta el algoritmo 10 veces.
        const hash = await bcrypt.hash(password, salt)

        const user = new Usuario({
            email: email, 
            password: hash,
            name: name,
            address: address,
            age: age, 
            phone: phone,
            avatar: avatar
        })

        await user.save()
        logger.info("usuario guardado!")
        res.redirect("/login")
    }
    catch(error){
        loggerwarnFile.warn(`warning = ${error}`)
    }
})

router.get("/index", async (req, res) => {
    try{   
        const productos = await misProductos.mostrarTodo()
        const user = await Usuario.findById({
            _id: req.user._id
        })

        const crearCarrito = await miCarrito.crearCarrito()   
        
        // const carrito = await miCarrito.mostrarTodoCarrito()
        // const carritoId = carrito.forEach(e => e._id)
        // const _id = mongoose.Types.ObjectId(carritoId).valueOf()
        // console.log(_id)

        logger.info("usted esta en el index")
        res.render("index", {
            nombre: user.name,
            avatar: user.avatar,
            productos: productos,
            carrito: crearCarrito
        })
    }
    catch(error){
        loggerwarnFile.warn(`warning = ${error}`)
    }
})

router.get("/logout", async (req, res) => {
    try {
        logger.info("gracias por su visita!")
        req.session.destroy()
        const carrito = await miCarrito.mostrarTodoCarrito()
        const carritoId = carrito.forEach(e => mongoose.Types.ObjectId(e._id).valueOf())
        console.log(carritoId)
        await miCarrito.borrarCarritoPorId(carritoId)
        
        res.render("login")
    }
    catch(error){
        loggerwarnFile.warn(`warning = ${error}`)
    }
}) 

module.exports = router;