const { carritosDao, usuariosDao } = require('../services/index');

class CarritoController {
    async saveCarrito(req, res, next) {
        let { id_prod } = req.body;
        let user = req.user;
        let nuevoProducto = {
            id_prod
        }
        carritosDao.save(nuevoProducto, user).then(result => {
            // console.log(result)
            if (result !== undefined) {
                res.status(200).json({
                    message: `Nuevo Carrito`,
                    result: result
                });
            } else {
                res.status(404).json({
                    error: `No se pudo guardar el Carrito`,
                });
            }
        });
    }

    async deleteCarrito(req, res, next) {
        let id = req.params.id;
        let user = req.user;
        carritosDao.deleteById(id, user.email).then(result => {
            if (result !== undefined) {
                res.status(200).json({
                    message: `Eliminar Carrito ${id}`,
                    result: result
                });
            } else {
                res.status(404).json({
                    error: `No se pudo eliminar el Carrito`,
                });
            }
        });
    }

    async productosCarrito(req, res, next) {
        let id = req.params.id;
        let user = req.user;
        carritosDao.getProductsById(id, user.email).then(result => {
            if (result !== undefined) {
                if (result === null) {
                    res.status(404).json({
                        error: `Carrito no encontrado para el id ${id}`,
                    });
                } else {
                    res.status(200).json({
                        message: `Carrito ID: ${id}`,
                        result: result
                    });
                }
            } else {
                res.status(404).json({
                    error: `El archivo no se puede leer`,
                });
            }
        });
    }

    async saveProductoCarrito(req, res, next) {
        let id = req.params.id;
        let { id_prod } = req.body;
        let editarCarrito = {
            id_prod
        }
        let user = req.user;
        carritosDao.addProductsById(id, editarCarrito, user.email).then(result => {
            // console.log(result)
            if (result !== undefined) {
                res.status(200).json({
                    message: `Editar Carrito ${id}`,
                    result: result
                });
            } else {
                res.status(404).json({
                    error: `No se pudo modificar el Carrito`,
                });
            }
        });
    }

    async updateCarrito(req, res, next) {
        let id = req.params.id;
        let user = req.user;
        usuariosDao.findUser(user.email).then(resultU => {
            console.log(resultU)
            carritosDao.comprarCarrito(id, resultU).then(result => {
                // console.log(result)
                if (result !== undefined) {
                    res.status(200).json({
                        message: `Editar Carrito ${id}`,
                        result: result
                    });
                } else {
                    res.status(404).json({
                        error: `No se pudo modificar el Carrito`,
                    });
                }
            });
        })
    }

    async deleteProductoCarrito(req, res, next) {
        let id = req.params.id;
        let id_prod = req.params.id_prod;
        let user = req.user;
        carritosDao.deleteProductById(id, id_prod, user.email).then(result => {
            if (result !== undefined) {
                res.status(200).json({
                    message: `Eliminar Producto Carrito ${id}`,
                    result: result
                });
            } else {
                res.status(404).json({
                    error: `No se pudo eliminar el Producto del Carrito`,
                });
            }
        });
    }

}

module.exports = CarritoController