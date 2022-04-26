const mongoose = require("mongoose");
const URL = 'mongodb://localhost:27017/ecommerce';

//conexion a mongoose// 
try {
    mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })        
    console.log("conectado a mongoDB");  
    
}
catch(error) {
    console.error(error)
}