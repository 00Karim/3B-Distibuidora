// const mongoose = require("mongoose")
const Client = require("../models/entities/client")

class clientModel {
    // static getClient = async(clientId) => {
    //     try{
    //         if(!mongoose.Types.ObjectId.isValid(clientId))
    //             throw new Error('Error, el ID ingresado no es valido')

    //         const client = await Client.findById(clientId)

    //         return client
    //     }catch(e){
    //         throw new Error(`Error obteniendo los datos del cliente solicitado, ${e}`)
    //     }
    // }

    static createClient = async(clientData) => {
        try{
            const newClient = new Client(clientData)
            await newClient.save()

            return newClient
        }catch(e){
            throw new Error(`Error creando el nuevo cliente, ${e}`)
        }
    }
}

module.exports = clientModel;