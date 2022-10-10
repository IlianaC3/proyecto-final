const { collUsuarios } = require('../../db/collections')
const { parseJSON , renameField } = require('../../../utils/functions');
const bcrypt = require('bcrypt');
const { connectionFinal } = require('../../db/connections')
const nodemailer = require('../../../utils/emailMsg')

const fs = require('fs');

class Contenedor {
    constructor() {
        this.coleccion = collUsuarios 
    }

    async save(usuario) {
        console.log("este es  usuario", usuario);

		try {
            connectionFinal();
            //guardar foto con fs
            let url = '';
            if (usuario.file != '') {
                let base64Data = usuario.file.split(';')[1];
                let formato = usuario.file.split(';')[0].split('/')[1];
                // console.log(formato)
                url = `./public/fotos/${new Date().getTime()}.${formato}`;
    
                let fileFinal = Buffer.from(base64Data, 'base64')
                // console.log(fileFinal)
                let saveData = await fs.promises.writeFile(url, fileFinal,  {encoding: 'base64'});
            } else {
                url = 'https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_960_720.png'
            }
            
            // console.log(saveData)
            console.log(usuario)
            let userObject = {};
            const usuarioInfo = await this.coleccion.find({ 'email': usuario.email }, { __v: 0 });
            console.log("usuario info", usuarioInfo);
            if (usuarioInfo.length < 1) {
                let salt = bcrypt.genSaltSync(10);
				let hash = bcrypt.hashSync(usuario.password, salt);
                userObject = {
                    email: usuario.email,
                    nombre: usuario.nombre,
                    direccion: usuario.direccion,
                    edad: usuario.edad,
                    telefono: usuario.telefono,
                    foto: url,
                    password: hash,
                    isAdmin: false
                };
                let doc = await this.coleccion.create(userObject);
                console.log("doc", doc)
                doc = parseJSON(doc)
                //envio de mensaje
                const sendMail = await nodemailer.sendMailRegistration(userObject)
                return userObject
            } else {
                return null;
            }
            
        } catch(error) {
            console.log(error)
            return undefined;
        }
	}

	async loginUser(usuario) {
		try {
            console.log("llega aqui")
            connectionFinal();
            console.log(usuario)
            const docs = await this.coleccion.findOne({ 'email': usuario.email }, { __v: 0 })
            console.log(docs)
            // docs = docs.map(parseJSON);
            let hash = docs.password;
            // console.log(docs.password, usuario.password);
			let verify = bcrypt.compareSync(usuario.password, hash);
            // console.log(hash, usuario.password, verify)
			if (verify) {
                let info = {
                    email: docs.email,
                    nombre: docs.nombre,
                    admin: docs.isAdmin
                }
                return info
            } else {
                return null
            }
            } catch (error) {
                return undefined
        }
	}

    async checkUser(user) {
        try {
            connectionFinal();
            const docs = await this.coleccion.findOne({ 'email': user }, { __v: 0 })
            console.log(docs)
            docs = docs.map(parseJSON)
            docs = docs.map(d => renameField(d, '_id', 'id'));
            
            let result = docs[0]
            return result === undefined ? false : true
        } catch {
            return false;
        }
    }

    async findUser(user) {
        try {
            connectionFinal();
            const docs = await this.coleccion.findOne({ 'email': user }, { __v: 0 })
            console.log("doc ", docs)
            // docs = docs.map(parseJSON)
            // docs = docs.map(d => renameField(d, '_id', 'id'));
            
            let result = docs
            console.log("hasta aqui el result", result)
            return result === undefined ? null : [ result ]
        } catch(e) {
            console.log(e);
            return "Error al leer archivo";
        }
    }

}

module.exports = Contenedor;