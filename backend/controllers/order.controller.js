const OrderService = require("../services/orderServices")

class LocalOrderController {
    handleGetAllOrders = async(req, res) => {
        try{
            const orders = OrderService.getAll(req.params.filters)
            return res.status(200).json(orders)
        }catch(e){
            return res.status(500).json("Error interno del servidor")
        }
    }

    handleGetOrderById = async(req, res) => {
        try{
            const order = OrderService.getById(req.params.id)
            return res.status(200).json(order)
        }catch(e){
            if(e.message.includes("encontrado")) return res.status(404).json({error: e.message})
            if(e.message.includes("invalido")) return res.status(400).json({error: e.message})
            return res.status(500).json("Error interno del servidor")
        }
    }

    handleCreateOrder = async(req, res) => {
        try{
            const order = await OrderService.create(req.body)
            return res.status(201).json(order)
        }catch(e){
            if(e.message.includes("obligatorio" || "invalido" || "cada item")) 
                return res.status(400).json({error: e.error})
            if(e.message.includes("encontro" || "producto referenciado")) 
                return res.status(404).json({error: e.error})
            if(e.message.includes("cantidad de un item" || "precio unitario incorrecto")) 
                return res.status(422).json({error: e.error})
            if(e.message.includes("stock insuficiente")) 
                return res.status(409).json({error: e.error})
            return res.status(500).json("Error interno del servidor")
        }
    }

    handleUpdateOrder = async(req, res) => {
        try{
            const order = await OrderService.update(req.params.id, req.body)
            return res.status(200).json(order)
        }catch(e){
            if(e.message.includes("error de validacion"))
                return res.status(400).json({error: e.message})
            if(e.message.includes("recurso no econtrado"))
                return res.status(404).json({error: e.message})
            if(e.message.includes("conflicto de estado"))
                return res.status(409).json({error: e.message})
            if(e.message.includes("datos invalidos"))
                return res.status(422).json({error: e.message})
            
            return res.status(500).json("Error interno del servidor")
        }
    }

    handleDeleteOrder = async(req, res) => {
        try{
            const order = await OrderService.delete(req.params.id)
            return res.status(200).json(order)
        }catch(e){
            if(e.message.includes("invalido"))
                return res.status(400).json({error: e.message})
            if(e.message.includes("inexistente"))
                return res.status(404).json({error: e.message})

            return res.status(500).json({error: "Error interno del servidor"})
        }
    }
}

module.exports = LocalOrderController