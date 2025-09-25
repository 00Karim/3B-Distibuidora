const Client = require("../models/entities/client")

class clientModel {
    static getAllClients = async() => {
        try{
            const client = Client.find()
            return client 
        }catch(e){
            throw new Error(`Error, no se pudieron obtener los clientes, ${e}`)
        }
    }
    
    static getClient = async(clientId) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(clientId))
                throw new Error(`Error, el ID ingresado no es valido ${e}`)

        }catch(e){

        }
    }
}

module.exports = clientModel;