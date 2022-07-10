const multer = require("multer")

const filesStorageEngine = multer.diskStorage({

    destination:(req, file, cb) =>{
        cb(null, "../../public")
    },
    
    filename: (req, file, cb) =>{
        cb(null, Date.now() + '--' + file.originalname)
    }
})

const upload = multer({storage:filesStorageEngine})

module.exports = multer