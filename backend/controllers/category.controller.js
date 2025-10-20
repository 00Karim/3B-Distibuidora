const CategoryModel = require("../models/category.model")

class LocalCategoryController {
    handleGetAllCategories = async(res) => {
        try{
            const categories = await CategoryModel.getAllCategories()
            return res.status(200).json(categories)
        }catch(e){
            return res.status(500).json("Error interno del servidor")
        }
    }

    handleGetCategoryById = async(req, res) => {
        try{
            const category = await CategoryModel.getCategoryById(req.params.id)
            return res.status(200).json(category)
        }catch(e){
            if(e.message.includes("valido")) return res.status(404).json({error: e.message})
            return res.status(500).json("Error interno del servidor")
        }
    }

    handleCreateCategory = async(req, res) => {
        try{
            const category = await CategoryModel.createCategory(req.body)
            return res.status(200).json(category)
        }catch(e){
            if(e.message.includes("no se pudo")) return res.status(500).json({error: e.message})
        }
    }

    handleUpdateCategory = async(req, res) => {
        try{
            const category = await CategoryModel.updateCategory(req.body)
            return res.status(200).json(category)
        }catch(e){
            if(e.message.includes("valido")) return res.status(404).json({error: e.message})
            return res.status(500).json("Error interno del servidor")
        }
    }
}

module.exports = LocalCategoryController