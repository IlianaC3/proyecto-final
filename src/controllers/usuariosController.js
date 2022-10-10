const { usuariosDao } = require('../services/index');

class UsuariosController {
    async loginUser(req, res){
        let msg = '';
        if(req.user.email === -1) {
           msg = 'Usuario no existe';
           req.logout(function(err) {
              if (err) { return next(err); }
              res.render('content/error', {data: msg});
           });
        } else if (req.user.email === 0) {
           msg = 'Contraseña incorrecta';
           req.logout(function(err) {
              if (err) { return next(err); }
              res.render('content/error', {data: msg});
           });
        } else {
           res.redirect('/');
        }
     
     }

     async signupUser(req, res) {
        let msg = '';
        if(req.user.data === -1) {
           msg = 'El usuario ya existe'
           req.logout(function(err) {
              if (err) { return next(err); }
              res.render('content/error', {data: msg});
            });
        } else {
             let user = {
                 email: req.body.username,
                 nombre: req.body.name,
                 password: req.body.password,
                 direccion: req.body.address,
                 telefono: `${req.body.prefix}${req.body.phone}`,
                 edad: req.body.age,
                 file: req.body.file
             }
             console.log("user a enviar", user)
             const result = await usuariosDao.save(user).then((result) => {
                console.log(result)
             });
             req.logout(function(err) {
                if (result !== null) {
                    res.status(200).json({
                        message: `Usuario registrado`,
                        result: user
                    });
                } else {
                    res.status(201).json({
                        error: `No registrado`,
                    });
                }
            })
        }
     }
}

module.exports = UsuariosController;