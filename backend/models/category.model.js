const mongoose = require("mongoose")
const Category = require("../models/entities/category")

class CategoryModel{
    static getAllCategories = async() => {
        try{
            const categories = await Category.find()

            return categories
        }catch(e){
            throw new Error(`Error, no se pudo obtener las categorias, ${e}`)
        }
    }

    static getCategoryById = async(categoryId) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(categoryId)){
                throw new Error("Error, el ID no es valido")
            }

            const category = await Category.findById(categoryId)

            return category
        }catch(e){
            throw new Error(`Error, no se pudo obtener la categoria indicada por ID`)
        }
    }

    static createCategory = async(categoryData) => {
        try{
            const category = new Category(categoryData)
            category.save()
            return category
        }catch(e){
            throw new Error(`Error, no se pudo crear una nueva categoria`)
        }
    }

    static updateCategory = async(idCategory, categoryData) => {
        try{
           if(!mongoose.Types.ObjectId.isValid(idCategory)){
                throw new Error("Error, el ID no es valido")
            }
            
            const category = await Category.findByIdAndUpdate(
                idCategory,
                categoryData,
                {new: true, runValidators: true}
            )

            return category
        }catch(e){
            throw new Error(`Error, no se pudo actualizar la categoria indicada, ${e}`)
        }
    }
}

module.exports = CategoryModel 