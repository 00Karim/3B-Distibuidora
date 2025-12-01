const AdressModel = require("../models/address.model")

class LocalAdressController {
    handleGetAdress = async(req, res) => {
        try{
            const adress = await AdressModel.getAdress(req.params.id)
            if(!adress) return res.status(400).json({error: "Adress no encontrada"})
            return res.status(200).json(adress)
        }catch(e){
            return res.status(500).json({error: "Error interno del servidor"})
        }
    } 

    handleCreateAdress = async(req, res) => {
        try{
            const adress = await AdressModel.createAddress(req.body)
            return res.status(201).json(adress)
        }catch(e){
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }
}

module.exports = new LocalAdressController()



