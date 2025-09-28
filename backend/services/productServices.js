const productModel = require("../models/product.model")

class productService {
    static getAll = async(filters = {}) => {
        try{
            const products = await productModel.getAllProducts(filters)
            return products
        }catch(e){
            throw new Error(`Error de servicio en getAll, ${e}`)
        }
    }

    static getById = async(productId) => {
        try{
            const product = await Product.findById(productId)
            if(!product){
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
            if(!data.category) throw new Error(`Error, la categoria es obligatorio`)
            if(!data.unitOfMeasure) throw new Error(`Error, la unidad de medida es obligatorio`)
            if(!data.stock) throw new Error(`Error, el stock es obligatorio`)
            if(!data.glutenFree) throw new Error(`Error, el campo libre de gluten es obligatorio`)

            const product = new Product.createProduct(data)
            return product
        }catch(e){
            throw new Error(`Error de servicio en create, ${e}`)
        }
    }

    static update = async(_id, data) => {
        try{
            if(!id || !mongoose.Types.ObjectId.isValid(_id)) throw new Error(`Error, el id es obligatorio`)
            if(data.price < 0) throw new Error(`Error, el precio no puede ser menor a 0`)
            if(data.stock < 0) throw new Error(`Error, el stock no puede ser menor a 0`)
            
            const updatedProduct = await Product.findByIdAndUpdate(
                _id,
                data,
                {new: true, runValidators: true}
            ).populate('category')

            return updatedProduct
        }catch(e){
            throw new Error(`Error de servicio en update, ${e}`)
        }
    }

    static delete = async(_id) => {
        try{
            if(!id || !mongoose.Types.ObjectId.isValid(_id)) throw new Error(`Error, el id es obligatorio`)
            const deletedProduct = await Product.findByIdAndDelete(_id)
            return deletedProduct
        }catch(e){
            throw new Error(`Error de servicio en delete, ${e}`)
        }   
    }
}

module.exports = productService