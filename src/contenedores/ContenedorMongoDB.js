import mongoose from 'mongoose';
CRUD()

module.exports = async function CRUD() {

    //conexion a mongoose// 
    try {
        mongoose.connect('mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })        
        console.log("conectado a mongoDB");  
    }
    catch(error) {
        console.error(error)
    }
}

