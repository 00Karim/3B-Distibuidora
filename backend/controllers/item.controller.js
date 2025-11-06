const ItemServices = require("../services/itemServices")

class LocalItemController {
    // handleGetAllItems = async(res) => {
    //     try{
    //         const items = await ItemServices.getAll()
    //         return res.status(200).json(items)
    //     }catch(e){
    //         return res.status(500).json("Error interno del servidor")
    //     }
    // }

    // handleGetItemById = async(req, res) => {
    //     try{
    //         const item = await ItemServices.getById(req.params.id)
    //         return res.status(200).json(item)
    //     }catch(e){
    //         if(e.message.includes("encontrado")) return res.status(404).json({error: e.message})
    //         return res.status(500).json("Error interno del servidor")
    //     }
    // }

    handleCreateItem = async(req, res) => {
        try{
            const item = ItemServices.create(req.body)
            return res.status(201).json(item)
        }catch(e){
            if(e.message.includes("obligatorio")) return res.status(404).json({error: e.message})
            if(e.message.includes("correcto")) return res.status(400).json({error: e.message})
            return res.status(500).json("Error interno del servidor")
        }
    }

    handleUpdateItem = async(req, res) => {
        try{
            const {oldItem, newItem} = req.body
            const item = await ItemServices.update(oldItem, newItem)
            return res.status(200).json(item)
        }catch(e){
            if(e.message.includes("obligatorio")) return res.status(404).json({error: e.message})
            if(e.message.includes("correcto")) return res.status(400).json({error: e.message})
            return res.status(500).json("Error interno del servidor")
        }
    }

    // handleDeleteItem = async(req, res) => {
    //     try{
    //         const item = await ItemServices.delete(req.body.id)
    //         return res.status(200).json(item)
    //     }catch(e){
    //         if(e.message.includes("obligatorio")){ 
    //             return res.status(404).json({error: e.message})
    //         }
            
    //         return res.status(500).json({error: "Error interno del servidor"})
    //     }
    // }
}

module.exports = LocalItemController
