const views = require('./routesInit')

const UsuariosController = require('../controllers/usuariosController');
const Usuario = new UsuariosController();

const passport = require('../utils/passport')

views.post('/login', passport.authenticate('authentication'), Usuario.loginUser)
views.post('/signup', passport.authenticate('registration'), Usuario.signupUser)

module.exports = views;