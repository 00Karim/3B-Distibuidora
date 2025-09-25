const mongoose = require("mongoose")
const Product = require("../models/entities/product")

class productModel {
    // vamos a hacer todos los metodos estaticos porque vamos a usar los metodos para hacer
    // operaciones sobre la base de datos y no sobre objetos instanciados con esta clase
    static getAllProducts = async(filters = {}) =>{
        const query = {}
        try{
            //Aplicar filtros
            if(filters.name){ //Filtro por nombre
                query.name = new RegExp(filters.name, 'i');
            }
            if(filters.minPrice){//Filtro para precio minimo
                query.price = { ...query.price, $gte: parseFloat(filters.minPrice)}
            }
            if(filters.maxPrice){//Filtro para precio maximo
                query.price = { ...query.price, $lte: parseFloat(filters.maxPrice)}
            }
            if(filters.category){//Filtro por categoria
                query.category = filters.category;
            }
            if(filters.glutenFree){//Filtro por libre de gluten si o no
                query.glutenFree = true
            }
            else{
                query.glutenFree = false
            }
            if(filters.brand){
                query.brand = filters.brand
            }

            const products = await Product.find(query)
                .populate('category')
                .sort({name: 1})

            return products //Devuelve un array de productos que cumplan con los filtros

        }catch(e){
            throw new Error(`Error, no se pudieron obtener los productos, ${e}`)
        }
    }

    static getProductById = async(productId) => {
        try {
            if(!mongoose.Types.ObjectId.isValid(productId))
                throw new Error(`Error, Id del producto invalido`)

            const product = await Product.findById(productId).popualte('category')
            
            return product
        }catch(e){
            throw new Error(`Error obteniendo producto, ${e}`)
        }
    }

    static createProduct = async(productData) => {
        try{
            const product = new Product(productData)
            await product.save()
            return product
        }catch(e){
            throw new Error(`Error creando nuevo producto, ${e}`)
        }
    }

    static updateProduct = async(productId, updateData) => {
        try{
            if(!mongoose.Types.objectId.isValid(productId)){
                throw new Error("El ID del producto a editar es invalido")
            }

            const updatedProduct = await Product.findByIdAndUpdate(
                productId,
                updateData,
                {new: true, runValidators: true}
            ).populate('category')

            return updatedProduct
        }catch(e){
            throw new Error(`Error, no se pudo actualizar el producto, ${e}`)
        }
    }

    static deleteProduct = async(productId) => {
        try{
            if(!mongoose.ObjectId.Types.isValid(productId)){
                throw new Error("Error, el ID no es valido")
            }

            const deletedProduct = await Product.findByIdAndDelete(productId)

            return deletedProduct
        }catch(e){
            throw new Error(`Error, no se pudo eliminar el producto seleccionado, ${e}`)
        }
    }

    static updateStock = async(productId, newStock) => {
        try{
            if(!mongoose.ObjectId.Types.isValid(productId)){
                throw new Error("Error, el ID no es valido")
            }
            //Se chequea que el numero de stock a editar no haga que el stock total sea menos a 0
            //Se puede tanto sumar como restar stock
            if((productId.stock + newStock) < 0){
                throw new Error("Error, el stock no puede ser menor a 0")
            }

            const product = await Product.findById('productId')
            product.stock += newStock
            await product.save()

            return product
        }catch(e){
            throw new Error(`Error, no se pudo actualizar el stock del producto seleccionado, ${e}`)
        }
    }
}

module.exports = productModel