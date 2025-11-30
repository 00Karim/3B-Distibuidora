const ProductModel = require("../models/product.model")
const mongoose = require("mongoose")

class productService {
    static getAll = async(filters = {}) => {
        try{
            const products = await ProductModel.getAllProducts(filters)
            return products // TODO: Esto no chequea nada y hace que el getProduct en el model sea inutil, buscarle una funcion util o eliminar
        }catch(e){
            throw new Error(`Error de servicio en getAll, ${e}`)
        }
    }

    static getById = async(productId) => {
        try{
            const product = await ProductModel.getProductById(productId)
            if(!product){ // TODO: Esto no chequea nada y hace que el getProduct en el model sea inutil, buscarle una funcion util o eliminar
                throw new Error(`Error, producto no encontrado`)
            }
            return product
        }catch(e){
            throw new Error(`Error de servicio en getById, ${e}`)
        }
    }

    static create = async(data) => {
        try{
            if(!data.name) throw new Error(`Error, el nombre es obligatorio`)
            if(!data.price) throw new Error(`Error, el precio es obligatorio`)
            if(!data.image) throw new Error(`Error, la imagen es obligatoria`)
            if(!data.category) throw new Error(`Error, la categoria es obligatoria`)
            if(!data.unitOfMeasure) throw new Error(`Error, la unidad de medida es obligatoria`)
            if(!data.stock) throw new Error(`Error, el stock es obligatorio`)
            if(data.glutenFree === undefined) throw new Error(`Error, el campo libre de gluten es obligatorio`)

            const product = await ProductModel.createProduct(data)
            return product
        }catch(e){
            throw new Error(`Error de servicio en create, ${e}`)
        }
    }

    static update = async(_id, data) => {
        try{
            if(!_id || !mongoose.Types.ObjectId.isValid(_id)) throw new Error(`Error, el id es obligatorio`)
            if(data.price < 0) throw new Error(`Error, el precio no puede ser menor a 0`)
            if(data.stock < 0) throw new Error(`Error, el stock no puede ser menor a 0`)
            
            const updatedProduct = await ProductModel.updateProduct(
                _id,
                data,
                {new: true, runValidators: true}
            ) // el populate ya se hizo en el model

            return updatedProduct
        }catch(e){
            throw new Error(`Error de servicio en update, ${e}`)
        }
    }

    static delete = async(_id) => {
        try{
            if(!_id || !mongoose.Types.ObjectId.isValid(_id)) throw new Error(`Error, el id es obligatorio`)
            const deletedProduct = await ProductModel.deleteProduct(_id)
            return deletedProduct
        }catch(e){
            throw new Error(`Error de servicio en delete, ${e}`)
        }   
    }
}

module.exports = productService