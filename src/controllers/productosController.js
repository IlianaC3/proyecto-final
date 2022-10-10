const { productosDao } = require('../services/index');

class ProductosController {
    async getProductos(req, res, next) {
        productosDao.getAll().then(result => {
            if (result !== undefined) {
                res.status(200).json({
                    message: `Productos`,
                    result: result
                });
            } else {
                res.status(404).json({
                    error: `Error al leer archivo`,
                });
            }
        });
        
    }

    async getProductoById(req, res, next) {
        let id = req.params.id;
        productosDao.getById(id).then(result => {
            if (result !== undefined) {
                if (result === null) {
                    res.status(404).json({
                        error: `Producto no encontrado para el id ${id}`,
                    });
                } else {
                    res.status(200).json({
                        message: `Producto ID: ${id}`,
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

    async getProductoByCategory(req, res, next) {
        let data = req.params.data;
        productosDao.getProductoByCategory(data).then(result => {
            if (result !== undefined) {
                if (result === null) {
                    res.status(404).json({
                        error: `Producto no encontrado para la categoria ${data}`,
                    });
                } else {
                    res.status(200).json({
                        message: `Producto Categoria: ${data}`,
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

    async saveProducto(req, res, next) {
        // console.log(req.body)
        let { title, description, price, thumbnail, stock, category } = req.body;
        
        let nuevoProducto = {
            title,
            description,
            price,
            thumbnail,
            stock,
            category
        }
        if(req.query.admin) {
            productosDao.save(nuevoProducto).then(result => {
                // console.log(result)
                if (result !== undefined) {
                    res.status(200).json({
                        message: `Nuevo producto`,
                        result: result
                    });
                } else {
                    res.status(404).json({
                        error: `No se pudo guardar el producto`,
                    });
                }
            });
        } else {
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
        
    }

    async updateProducto(req, res, next) {
        let id = req.params.id;
        let { code, title, description, price, thumbnail, stock, category } = req.body;
        let editarProducto = {
            code,
            title,
            description,
            price,
            thumbnail,
            stock,
            category
        }
        if(req.query.admin) {
            productosDao.updateById(id, editarProducto).then(result => {
                if (result !== undefined) {
                    res.status(200).json({
                        message: `Editar producto ${id}`,
                        result: result
                    });
                } else {
                    res.status(404).json({
                        error: `No se pudo modificar el producto`,
                    });
                }
            });
        } else {
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
    }

    async deleteProducto(req, res, next) {
        let id = req.params.id;
        if(req.query.admin) {
            productosDao.deleteById(id).then(result => {
                if (result !== undefined) {
                    res.status(200).json({
                        message: `Eliminar producto ${id}`,
                        result: result
                    });
                } else {
                    res.status(404).json({
                        error: `No se pudo eliminar el producto`,
                    });
                }
            });
        } else {
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
    }

    //Categorias
    async getCategorias(req, res, next) {
        productosDao.getAllCategories().then(result => {
            if (result !== undefined) {
                res.status(200).json({
                    message: `Categorias`,
                    result: result
                });
            } else {
                res.status(404).json({
                    error: `Error al leer archivo`,
                });
            }
        });
        
    }

    async saveCategoria(req, res, next) {
        // console.log(req.body)
        let { name } = req.body;
        
        let nueva = {
            name
        }
        if(req.query.admin) {
            productosDao.saveCategory(nueva).then(result => {
                // console.log(result)
                if (result !== undefined) {
                    res.status(200).json({
                        message: `Nueva categoría`,
                        result: result
                    });
                } else {
                    res.status(404).json({
                        error: `No se pudo guardar la categoría`,
                    });
                }
            });
        } else {
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
        
    }

    async updateCategory(req, res, next) {
        let id = req.params.id;
        let { code, name } = req.body;
        let editar = {
            code,
            name
        }
        if(req.query.admin) {
            productosDao.updateCategoryById(id, editar).then(result => {
                if (result !== undefined) {
                    res.status(200).json({
                        message: `Editar categoria ${id}`,
                        result: result
                    });
                } else {
                    res.status(404).json({
                        error: `No se pudo modificar la categoria`,
                    });
                }
            });
        } else {
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
    }

    async deleteCategory(req, res, next) {
        let id = req.params.id;
        if(req.query.admin) {
            productosDao.deleteByIdCat(id).then(result => {
                if (result !== undefined) {
                    res.status(200).json({
                        message: `Eliminar categoria ${id}`,
                        result: result
                    });
                } else {
                    res.status(404).json({
                        error: `No se pudo eliminar la categoria`,
                    });
                }
            });
        } else {
            res.status(404).json({
                error: `No tienes acceso`,
            });
        }
    }
}

module.exports = ProductosController