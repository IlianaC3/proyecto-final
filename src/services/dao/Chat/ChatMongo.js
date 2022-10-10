const { collUsuarios, collMensaje } = require('../../db/collections')
const { parseJSON , renameField } = require('../../../utils/functions');
const { connectionFinal } = require('../../db/connections')
const chatsNorm = require('../../../utils/normalizer')


class Contenedor {
    constructor() {
        this.autorColl = collUsuarios;
        this.mensajesColl = collMensaje;
        this.autorObject = {
            id: 0,
            nombre: '',
            apellido: '',
            edad: 0,
            avatar: '',
            alias: '',
        }
        this.object = {
            text: '',
            timestamp: '',
            autor: {}
        }
    }
    async save(chat) {
		try {
            connectionFinal();
            const AutorInfo = await this.autorColl.find({ 'id': chat.autor.email }, { __v: 0 });
            if (AutorInfo.length > 0) {
                this.autorObject = {
                    id: chat.autor.email,
                    email: chat.autor.email,
                    nombre: AutorInfo[0].nombre,
                    edad: AutorInfo[0].edad,
                    avatar: AutorInfo[0].foto,
                }
            } else {
                this.autorObject = {
                    id: chat.autor.email,
                    nombre: chat.autor.nombre,
                    edad: chat.autor.edad,
                    avatar: chat.autor.foto,
                }
                const SaveInfoAutor = await this.autorColl.create(this.autorObject);
            }
            this.object = {
                text: chat.text,
                timestamp: new Date(),
                autor: this.autorObject
            }
            let doc = await this.mensajesColl.create(this.object);
            doc = parseJSON(doc)
            return 'Mensaje enviado' +  doc
        } catch(error) {
            console.log(e);
            return undefined;
        }
	}

	async getAll() {
		try {
            connectionFinal();
            let docs = await this.mensajesColl.find({}, { __v: 0 }).lean()
            console.log("esta es el resultado", docs)
            docs = docs.map(parseJSON)
            return chatsNorm(docs)
        } catch (error) {
            return undefined;
        }
	}

    async getAllMessagesAutor(id) {
		try {
            connectionFinal();
            let docs = await this.mensajesColl.find({'autor.id': id}, { __v: 0 })
            console.log("esta es el resultado individual", docs)
            docs = docs.map(parseJSON)
            return docs
        } catch (error) {
            return undefined;
        }
	}

}

module.exports = Contenedor;