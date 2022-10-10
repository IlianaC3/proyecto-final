const express = require('express');
const { Router } = express;
const ProductosController = require('../controllers/productosController');
const Producto = new ProductosController();
const router = new Router();

router.get('/', Producto.getProductos);

router.get('/:id', Producto.getProductoById);

router.get('/categorias/:data', Producto.getProductoByCategory);

router.post('/', Producto.saveProducto);

router.put('/:id', Producto.updateProducto);

router.delete('/:id', Producto.deleteProducto);

module.exports = router;
