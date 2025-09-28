const mongoose = require("mongoose")
const Address = require("../models/entities/address")

class AddressModel {
    static getAddress = async(addressId) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(addressId))
                throw new Error(`Error, el ID del adress es invalido, ${e}`)

            const address = await Address.findById(addressId)
            return address
        }catch(e){
            throw new Error(`Error, no se pudo obtener el adress indicado, ${e}`)
        }
    }    

    static createAddress = async(adressData) => {
        try{    
            const newAddress = new Address(adressData)
            await newAddress.save()
            return newAddress
        }catch(e){
            throw new Error(`Error, no se pudo crear el adress indicado, ${e}`)
        }
    }
}

module.exports = AddressModel