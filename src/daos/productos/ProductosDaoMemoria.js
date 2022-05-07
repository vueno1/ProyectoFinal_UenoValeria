const ContenedorMemoria = require("../../contenedores/ContenedorMemoria");

module.exports = class ProductosDaoMemoria extends ContenedorMemoria {

    constructor(){
      super()
    }
    
    async actualizarPorId(id, reemplazo) {
        try {
            const idNumber = Number(id)

            const contenido = this.mostrarTodo();
            const productoIndice = contenido.findIndex(producto => producto.id === idNumber);
            if (productoIndice === -1) return;

            contenido[productoIndice] = {
                nombre: reemplazo.nombre,
                descripcion: reemplazo.descripcion,
                codigo: reemplazo.codigo,
                foto: reemplazo.foto,
                precio: reemplazo.precio,
                stock: reemplazo.stock,
                id: contenido[productoIndice].id,
                timestamp: Date.now()
            };
            this.contenido = contenido;
            return contenido[productoIndice];
        } catch (error) {
            console.error(error);
        }
    }
};

