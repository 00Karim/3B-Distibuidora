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
            await newClient.validate() // validamos el objeto pero sin guardarlo asi se aplican las restricciones que decidimos
            return newClient.toObject() // lo convertimos en objeto para ignorar toda la metadata innecesaria
        }catch(e){
            throw new Error(`Error creando el nuevo cliente, ${e}`)
        }
    }
}

module.exports = clientModel;