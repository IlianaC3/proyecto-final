const { carritosDao, usuariosDao, productosDao, chatDao } = require('../services/index');
const phones = require('../utils/countryCodes.json');

class Front {
    async Home(req, res) {
        console.log(req.user)
        let user = req.user
        const productos = await productosDao.getAll().then(result => { if(result == null) {
            return []
        } else {return result} });
        const categorias = await productosDao.getAllCategories().then(result => { if(result == null) {
            return []
        } else {return result} });
        const carrito = await carritosDao.findCarrito(user.email, false).then(result => { if(result == null) {
            return []
        } else {return result} });
        res.render('content/index', { data: productos, dataCar: carrito, user: user, datCat: categorias });
    }

    async Productos(req, res) {
        // console.log(req.user)
        let user = req.user;
        let data = req.params.categoria;
        const productos = await productosDao.getProductoByCategory(data).then(result => { if(result == null) {
            return []
        } else {return result} });
        const carrito = await carritosDao.findCarrito(user.email, false).then(result => { if(result == null) {
            return []
        } else {return result} });
        res.render('content/productos', { data: productos, user: user, dataCar: carrito});
    }

    async Chat(req, res) {
        let user = req.user
        const usuario = await usuariosDao.findUser(user.email).then(result => { return result });
        res.render('content/chat', { user: user, data: usuario });
    }

    async ChatIndividual(req, res) {
        const mensajes = await chatDao.getAllMessagesAutor(req.params.email).then(result => { return result });
        console.log(mensajes)
        res.render('content/chatEmail', { data: mensajes });
    }

    async Carrito(req, res) {
        console.log(req.user)
        let user = req.user
        const carrito = await carritosDao.findCarrito(user.email, false).then(result => { return result });
        res.render('content/carrito', { data: carrito });
    }

    async Usuario(req, res) {
        console.log(req.user)
        let user = req.user
        const usuario = await usuariosDao.findUser(user.email).then(result => { return result });
        res.render('content/usuario', { data: usuario });
    }

    async Administrador(req, res) {
        console.log("datos admin", req.user)
        if (req.query.admin) {
            const productos = await productosDao.getAll().then(result => { return result });
            res.render('content/admin', { data: productos });
        } else {
            res.render('content/unauthorized', {
                data: {
                    error: -1,
                    descripcion: 'Ruta /admin método vista no autorizada'
                }
            })
        }
    }

    async Agregar(req, res) {
        // console.log(req.user)
        const categorias = await productosDao.getAllCategories().then(result => { if(result == null) {
            return []
        } else {return result} });
        if (req.query.admin) {
            res.render('content/agregar', { datCat: categorias });
        } else {
            res.render('content/unauthorized', {
                data: {
                    error: -1,
                    descripcion: 'Ruta /agregar método agregar no autorizada'
                }
            })
        }
    }

    async Editar(req, res) {
        const categorias = await productosDao.getAllCategories().then(result => { if(result == null) {
            return []
        } else {return result} });
        if (req.user.admin) {
            const productos = await productosDao.getById(req.params.id).then(result => { return result });
            res.render('content/editar', { data: productos, datCat: categorias });
        } else {
            res.render('content/unauthorized', {
                data: {
                    error: -1,
                    descripcion: 'Ruta /editar método editar no autorizada'
                }
            })
        }
    }

    async Login(req, res) {
        const person = req.user;
        if (person) {
            res.redirect('/')
        } else {
            res.render('content/login');
        }
    }

    async Logout(req, res) {
        req.logout(function(err) {
            if (err) { return next(err); }
            res.render('content/logout');
        });
    }

    async Signup(req, res) {
        res.render('content/signup', { data: phones });
    }
}

module.exports = Front;