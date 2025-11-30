const PackagingType = require("../models/packagingType.model")

class LocalPackagingTypeController {
    handleGetPackagingType = async(req, res) => {
        try{
            const packagingType = await PackagingType.getPackagingType(req.params.id)
            return res.status(200).json(packagingType)
        }catch(e){
            if(e.message.includes("invalido")) return res.status(404).json({error: e.message})
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }

    handleCreatePackagingType = async(req, res) => {
        try{
            const packagingType = await PackagingType.createPackagingType(req.body)
            return res.status(201).json(packagingType)
        }catch(e){
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }

    handleUpdatePackagingType = async(req, res) => {
        try{
            const packagingType = await PackagingType.updatePackagingType(req.body)
            return res.status(200).json(packagingType)
        }catch(e){
            if(e.message.includes("El id")) return res.status(400).json({error: e.message})
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }
}

module.exports = LocalPackagingTypeController