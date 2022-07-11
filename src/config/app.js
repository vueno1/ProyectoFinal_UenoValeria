const express = require ('express');
const app = express()
const productos = require("../rutas/productos.js") 
const carrito = require("../rutas/carrito") 
const usuario = require("../rutas/user")
const path = require("path")
const exphbs = require("express-handlebars")
const passport = require("../config/passport")
const MongoStore = require("./mongoconexion")
require("../config/mongoose")
require("../config/config")
const cookieParser = require("cookie-parser")
const session = require('express-session')
const Handlebars = require('handlebars')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')

app.use(express.json());
app.use(express.urlencoded({ extended:true }))

app.use(cookieParser())
app.use(session({
    store: MongoStore,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use(passport.initialize())
app.use(passport.session()) 

app.set('views', path.join(path.dirname(''), './src/views'))

app.engine('.hbs', exphbs.engine({
    handlebars: allowInsecurePrototypeAccess(Handlebars), 
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

app.use('/api/productos', productos);
app.use('/api/carrito', carrito);
app.use("/", usuario)

module.exports = app; 