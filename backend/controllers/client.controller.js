const ClientModel = require("../models/client.model")

class LocalClientController {
    // handleGetClient = async(req, res) => {
    //     try {
    //         const client = await ClientModel.getClient(req.params.id)
    //         if(!client) return res.status(400).json({error: "Error, no se encontro el cliente"})
    //         return res.status(200).json(client)
    //     }catch(e){
    //         return res.status(500).json({error: "Error interno del servidor"})
    //     }
    // }

    handleCreateClient = async(req, res) => {
        try{
            const client = await ClientModel.createClient(req.body)
            return res.status(200).json(client)
        }catch(e){
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }
}

module.exports = new LocalClientController()