const userService = require("../services/userServices")

class LocalUserController {
    handleGetAllUsers = async(res) => {
        try{
            const users = await userService.getAll()
            return res.status(200).json(users)
        }catch(e){
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }

    handleGetUserById = async(req, res) => {
        try{
            const user = await userService.getById(req.params.id)
            if(!user) return res.status(400).json({error: "No se pudo encontrar el usuario"})
            return res.status(200).json(user)
        }catch(e){
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }

    handleCreateUser = async(req, res) => {
        try{
            const user = await userService.create(req.body)
            return res.status(201).json(user)
        }catch(e){
            if(e.message.includes("invalido")){ 
                return res.status(400).json({error: e.message})
            }
            if(e.message.includes("El email ya ha sido utilizado")){ 
                return res.status(409).json({error: e.message})
            }
            if(e.message.includes("nombre es obligatorio")){ 
                return res.status(400).json({error: e.message})
            }
            if(e.message.includes("contrasenia")){ 
                return res.status(400).json({error: e.message})
            }
            if(e.message.includes("rol")){ 
                return res.status(409).json({error: e.message})
            }
            
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }

    handleDeleteUser = async(req, res) => {
        try{
            const user = await userService.delete(req.params.id)
            return res.status(200).json(user)
        }catch(e){
            if(e.message.includes("no encontrado invalido")){ 
                return res.status(404).json({error: e.message})
            }
            
            return res.status(500).json({error: "Error interno del servidor"})
        }
    }
}

module.exports = LocalUserController