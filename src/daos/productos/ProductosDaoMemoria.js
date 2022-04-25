const ContenedorMemoria = require("../../contenedores/ContenedorMemoria");

module.exports = class Producto extends ContenedorMemoria {
    
    async actualizarPorId(id, reemplazo) {
        try {
            const contenido = this.mostrarTodo();
            const productoIndice = contenido.findIndex(producto => producto.id === id);
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

