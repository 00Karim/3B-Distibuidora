const PackagingType = require("../models/packagingType.model")

class LocalPackagingTypeController {

    handleGetAllPackagingTypes = async (req, res) => {
        try {
            const packagingTypes = await PackagingType.getAllPackagingTypes();
            return res.status(200).json(packagingTypes);
        } catch (e) {
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }

    handleGetPackagingType = async(req, res) => {
        try{
            const packagingType = await PackagingType.getPackagingTypeById(req.params.id)
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
            const packagingType = await PackagingType.updatePackagingType(req.params.id, req.body)
            return res.status(200).json(packagingType)
        }catch(e){
            if(e.message.includes("El id")) return res.status(400).json({error: e.message})
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }

    handleDeletePackagingType = async (req, res) => {
        try {
            const packagingType = await PackagingType.deletePackagingType(req.params.id);
            return res.status(200).json(packagingType);
        } catch (e) {
            if (e.message.includes("válido")) {return res.status(400).json({ error: e.message });}
            return res.status(500).json({ error: "Error interno del servidor" });
        }
    }
}

module.exports = new LocalPackagingTypeController();
