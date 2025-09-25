const Client = require("../models/entities/client")

class clientModel {
    static getClient = async(clientId) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(clientId))
                throw new Error(`Error, el ID ingresado no es valido ${e}`)

            const client = await Client.findById(clientId).populate('adress')

            return client
        }catch(e){
            throw new Error(`Error obteniendo los datos del cliente solicitado, ${e}`)
        }
    }

    static createClient = async(clientData) => {
        try{
            newClient = new Client(clientData)
            await newClient.save()

            return newClient
        }catch(e){
            throw new Error(`Error creando el nuevo cliente, ${e}`)
        }
    }
}

module.exports = clientModel;