const itemModel = require("../models/item.model")

class itemService {
    static getAll = async() => {
        try{
            const items = await itemModel.getAllItems()
            return items
        }catch(e){
            throw new Error(`Error de servicio en getAll Item, ${e}`)
        }
    }

    static getById = async(itemId) => {
        try{
            const item = await itemModel.getItem(itemId)
            if(!item){
                throw new Error(`Error, item no encontrado`)
            }
            return item
        }catch(e){
            throw new Error(`Error de servicio en getById Item, ${e}`)
        }
    }

    static create = async(data) => {
        try{
            if(!data.product) throw new Error(`Service: Error, el producto es obligatorio`)
            if(!data.totalPrice || !data.totalPrice < 0) throw new Error(`Service: Error, el precio total es obligatorio y debe ser mayor a cero`)
            if(data.weight > 0){
                if(data.totalPrice != (data.pricePerUnit*data.weight)) throw new Error(`Error, el precio total por item no es correcto`)
            } else{
                if(data.totalPrice != (data.pricePerUnit*data.amount)) throw new Error(`Error, el precio total por item no es correcto`)                
            }
            if(!data.isAvailable) throw new Error(`Service: Error, tiene que indicarse la disponibilidad`)

            const item = new itemModel.createItem(data)
            return item
        }catch(e){
            throw new Error(`Error de servicio en create Item, ${e}`)
        }
    }

    static update = async(_id, data) => {
        try{
            if(!_id || !mongoose.Types.ObjectId.isValid(_id)) throw new Error(`Error, el id es obligatorio`)
            if(!data.totalPrice || !data.totalPrice < 0) throw new Error(`Service: Error, el precio total es obligatorio y debe ser mayor a cero`)
            if(data.weight > 0){
                if(data.totalPrice != (data.pricePerUnit*data.weight)) throw new Error(`Error, el precio total por item no es correcto`)
            } else{
                if(data.totalPrice != (data.pricePerUnit*data.amount)) throw new Error(`Error, el precio total por item no es correcto`)                
            }
            if(!data.isAvailable) throw new Error(`Service: Error, tiene que indicarse la disponibilidad`)
            
            const updatedItem = await itemModel.findByIdAndUpdate(
                _id,
                data,
                {new: true, runValidators: true}
            ).populate('product')

            return updatedItem
        }catch(e){
            throw new Error(`Error de servicio en update Item, ${e}`)
        }
    }

    static delete = async(_id) => {
        try{
            if(!id || !mongoose.Types.ObjectId.isValid(_id)) throw new Error(`Error, el id es obligatorio`)
            const deletedItem = await itemModel.findByIdAndDelete(_id)
            return deletedItem
        }catch(e){
            throw new Error(`Error de servicio en delete Item, ${e}`)
        }   
    }
}

module.exports = itemService