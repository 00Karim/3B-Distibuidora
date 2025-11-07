// const mongoose = require("mongoose")
const Item = require("../models/entities/item")
const ProductModel = require("../models/product.model")

class ItemModel {
    // static getAllItems = async() => {
    //     try{
    //         const items = await Item.find()

    //         return items
    //     }catch(e){
    //         throw new Error(`Error, no se pudo obtener los items, ${e}`)
    //     }
    // }

    // static getItem = async(itemId) => {
    //     try{
    //         if(!mongoose.Types.ObjectId.isValid(itemId)){
    //             throw new Error(`Error, el ID del item es invalido`)
    //         }
    //         const item = await Item.findById(itemId)
    //         return item
    //     }catch(e){
    //         throw new Error(`Error, no se pudo obtener el item, ${e}`)
    //     }
    // }

    static createItem = async(itemData) => {
        try{
            const item = new Item(itemData)
            await item.validate() // validamos el objeto pero sin guardarlo asi se aplican las restricciones que decidimos
            const productObject = await ProductModel.getProductById(item.product)
            item.product = productObject // convertimos el producto en un objeto embebido manualmente porque sino tenemos que guardar a item en la bdd y es innecesario
            console.log("ITEM EN CREATE ITEM: ", item)
            return item.toObject() // lo convertimos en objeto para ignorar toda la metadata innecesaria
        }catch(e){
            throw new Error(`Error, no se pudo crear el item, ${e}`)
        }
    }

    static updateItem = async(oldItem, newItemData) => {
        const itemAttributes = ["product", "pricePerUnit", "totalPrice", "amount", "weight", "isAvailable", "remarks"]
        try{
            for(const attribute of itemAttributes){
                if (newItemData[attribute] !== undefined){
                    oldItem[attribute] = newItemData[attribute]
                }
            }
            return oldItem // ahora esta modificado
        }catch(e){
            throw new Error(`Error, no se pudo actualizar el Item, ${e}`)
        }
    }
}

module.exports = ItemModel