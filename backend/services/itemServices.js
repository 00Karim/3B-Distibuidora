const itemModel = require("../models/item.model")
const ProductModel = require("../models/product.model")

class itemService {
    // static getAll = async() => {
    //     try{
    //         const items = await itemModel.getAllItems()
    //         return items
    //     }catch(e){
    //         throw new Error(`Error de servicio en getAll Item, ${e}`)
    //     }
    // }

    // static getById = async(itemId) => {
    //     try{
    //         const item = await itemModel.getItem(itemId)
    //         if(!item){
    //             throw new Error(`Error, item no encontrado`)
    //         }
    //         return item
    //     }catch(e){
    //         throw new Error(`Error de servicio en getById Item, ${e}`)
    //     }
    // }

    static create = async(data) => {
        try{
            if(!data.product) throw new Error(`Error, el producto es obligatorio`)
            if(!data.totalPrice || data.totalPrice < 0) throw new Error(`Error, el precio total es obligatorio y debe ser mayor a cero`)
            if(data.weight > 0){
                if(data.totalPrice != (data.pricePerUnit*data.weight)) throw new Error(`Error, el precio total por item no es correcto`)
            } else{
                if(data.totalPrice != (data.pricePerUnit*data.amount)) throw new Error(`Error, el precio total por item no es correcto`)                
            }
            if(!data.isAvailable) throw new Error(`Error, la disponibilidad es obligatoria`)

            const item = await itemModel.createItem(data)
            return item
        }catch(e){
            throw new Error(`Error de servicio en create Item, ${e}`)
        }
    }

    static update = async(oldItem, newItem) => {
        const newData = {
            product: newItem.product ? newItem.product : undefined,
            pricePerUnit: newItem.pricePerUnit ? newItem.pricePerUnit : undefined,
            totalPrice: newItem.totalPrice ? newItem.totalPrice : undefined,
            amount: newItem.amount ? newItem.amount : undefined,
            weight: newItem.weight ? newItem.weight : undefined,
            isAvailable: newItem.isAvailable === true || newItem.isAvailable === false ? newItem.isAvailable : undefined,
            remarks: newItem.remarks ? newItem.remarks : undefined,
        }
        try{
            if (newData.product){
                const nuevoProduct = await ProductModel.getProductById(newData.product._id)
                console.log("PRODUCTO EN ITEM SERVICES: ", nuevoProduct)
                if (!nuevoProduct){
                    throw new Error("Error, el producto ingresado no existe")
                }
                if (nuevoProduct.stock === 0){
                    throw new Error("Error, el producto ingresado no tiene stock")
                }
            }
            if (newData.totalPrice){
                if(newData.weight && newData.pricePerUnit){
                    if(newData.totalPrice != (newData.pricePerUnit*newData.weight)) throw new Error(`Error, el precio total por item no es correcto`)
                } else if (newData.amount && newData.pricePerUnit){
                    if(newData.totalPrice != (newData.pricePerUnit*newData.amount)) throw new Error(`Error, el precio total por item no es correcto`)                
                } else if (!newData.amount && !newData.weight && !newData.pricePerUnit) {
                    throw new Error("Error, no se puede cambiar el totalPrice sin cambiar el peso, la cantidad o el pricePerUnit")
                } 
            }
            if (newData.amount){
                if(!newData.totalPrice){
                    throw new Error("Error, no puede cambiar la cantidad sin cambiar el precio total")
                }
            }
            if (newData.weight){
                if(!newData.totalPrice){
                    throw new Error("Error, no puede cambiar el peso sin cambiar el precio total")
                }
            }
            if (newData.pricePerUnit){
                if(!newData.totalPrice){
                    throw new Error("Error no se puede cambiar el pricePerUnit sin cambiar el precio total")
                }
            }
            
            const updatedItem = await itemModel.updateItem(
                oldItem,
                newData,
            )

            return updatedItem
        }catch(e){
            throw new Error(`Error de servicio en update Item, ${e}`)
        }
    }

    // static delete = async(_id) => {
    //     try{
    //         if(!id || !mongoose.Types.ObjectId.isValid(_id)) throw new Error(`Error, el id es obligatorio`)
    //         const deletedItem = await itemModel.findByIdAndDelete(_id)
    //         return deletedItem
    //     }catch(e){
    //         throw new Error(`Error de servicio en delete Item, ${e}`)
    //     }   
    // }
}

module.exports = itemService