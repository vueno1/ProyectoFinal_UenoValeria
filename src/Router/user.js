const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const Usuario = require('../models/user')
const passport = require('../config/passport')
require("../config/mongoose")
const { miCarrito, misProductos } = require("../daos/index")
const twilioClient = require("../config/twilio")
require("dotenv").config() 
const transporter = require("../config/nodemailer")
const upload = require("../config/multer")

const log4js = require("../config/log")
const logger = log4js.getLogger()

router.get("/login", async (req, res) => {
    try{
        res.render("login")
    }
    catch(error){
        logger.warn(`warning = ${error}`)
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
        logger.warn(`warning = ${error}`)
    }
})

router.get("/register",  (req, res) => {
    try{
        res.render("register")
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
})

router.post("/register" , upload.single("avatar"), async (req,res) =>{
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

        const mailUsuarioNuevo = {
            from: "servidor",
            to: process.env.MAIL_ADMIN,
            subject: "nuevo Usuario Registrado",
            html: `datos del usuario: ${user}`
        }
        await transporter.sendMail(mailUsuarioNuevo)
        logger.info("informacion enviada por mail al administrador")    
        
        res.redirect("/login")
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
})

router.get("/index", async (req, res) => {
    try{   
        const productos = await misProductos.mostrarTodo()
        const user = await Usuario.findById({
            _id: req.user._id
        })        
        const carrito = await miCarrito.mostrarTodo()
        res.render("index", {
            nombre: user.name,
            avatar: user.avatar,
            productos: productos,
            carrito: carrito
        })
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
})

router.get("/enviarMensajes" , async (req,res) =>{
    try {
        const carrito = await miCarrito.mostrarTodo()
        const user = await Usuario.findById({
            _id: req.user._id
        })

        if(carrito.length >=1) {
            const mailPedidos = {
                from: "servidor",
                to: process.env.MAIL_ADMIN,
                subject: `pedido del usuario = ${user.email}`,
                html: `datos del pedido = ${carrito}`
            }
            await transporter.sendMail(mailPedidos)
            logger.info("pedido enviado por mail al administrador")

            twilioClient.messages
            .create({
                body: `${user.email} realizo un pedido`,
                from: process.env.TWILIO_WHATSAPP,
                to: process.env.WHATSAPP
            })
            .then(message => logger.info(`whatsapp enviado = ${message.sid}`))
            .done()

            twilioClient.messages.create({
                body: `Hemos recibido su pedido, la misma se encuentra en proceso`,
                from: process.env.TWILIO_SMS,
                to: `+${user.phone}`
            })
            .then(message=> logger.info(`sms enviado = ${message.sid}`))
            .done()
        }
        res.redirect("/index")
    } catch(e) {
        logger.warn(e)
    }
})

router.get("/logout", async (req, res) => {
    try {
        logger.info("Adios y gracias por su compra!")
        req.session.destroy() 
        const carrito = await miCarrito.mostrarCarrito()
        if(carrito) {
            await miCarrito.borrarCarritoPorId(carrito._id)     
        }
        res.redirect("/login")        
    }
    catch(error){
        logger.warn(`warning = ${error}`)
    }
}) 

module.exports = router; 