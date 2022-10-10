const { productosDao } = require('../services/index');

class CategoriasController {
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

module.exports = CategoriasController