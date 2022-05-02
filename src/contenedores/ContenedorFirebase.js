//esto lo copio de la pagina de firebase 
var admin = require("firebase-admin");

//aca le pongo la ruta donde esta mi key (generada en firebase)
var serviceAccount = require("../../key/proyectofinalbackend-2cb48-firebase-adminsdk-db0fq-36aefbc511.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  //necesitamos la URL de la base de datos: 
  databaseURL: "https://proyectofinalbackend-2cb48.firebaseio.com"
});

console.log("base Firebase inicializada");

//--------------------------------------------------------------------------------------------------

const db = admin.firestore();
//definir la base de datos 

module.exports = class ContenedorFirebase {

    constructor (nombreColeccion) {
        this.collection = db.collection(nombreColeccion)
    }

    async mostrarTodo() {
        try {
            console.log("READ")
            const querySnapShot = await this.collection.get()
            let docs = querySnapShot.docs;
            
            const response = docs.map((doc) =>({
                id: doc.id,
                nombre: doc.data().nombre,
                descripcion: doc.data().descripcion,
                codigo: doc.data().codigo,
                foto:doc.data().foto,
                precio: doc.data().precio,
                stock: doc.data().stock,
                timestamp:doc.data().timestamp                      
            }));
            return response

        } catch (error) {
            console.error(error);
        }
    }

    async guardar(objeto) {
        try{ 
            objeto.timestamp = Date.now()
            console.log("SAVED")
            let doc = this.collection.doc()
            await doc.create(objeto)
            return await this.mostrarTodo()
        }
        catch(error) {
            console.log(error)
        }
    }

    async actualizarPorId(id, reemplazo) {
        try {                  
            console.log("UPDATED")
            const doc = this.collection.doc(`${id}`)   
            await doc.update({
                nombre: reemplazo.nombre,
                descripcion: reemplazo.descripcion,
                codigo: reemplazo.codigo,
                foto: reemplazo.foto,
                precio: reemplazo.precio, 
                stock: reemplazo.stock,
                id: id, 
                timestamp: Date.now()
            })
            
            return await this.mostrarTodo()
        }
        catch(error) {
            console.log(error.message)
        }
    }

    async borrarPorId(id) {
        try {
            console.log("DELETE BY ID ")
            const doc = this.collection.doc(`${id}`) 
            await doc.delete()
            return this.mostrarTodo()
        }
        catch(error) {
            console.log(error.message)
        }
    }

}


