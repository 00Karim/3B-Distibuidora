const mongoose = require("mongoose")
const Address = require("../models/entities/address")

class AddressModel {
    static getAddress = async(addressId) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(addressId))
                throw new Error(`Error, el ID del adress es invalido, ${e}`)

            consthttps://github.com/00Karim/3B-Distibuidora/pull/20/conflict?name=backend%252Fmodels%252Faddress.model.js&ancestor_oid=d866ddf326eaa293210f8176f065a87ebab6ac6c&base_oid=a326a5d4abbd7788e4b7fbc274e909dc0e468b80&head_oid=9a223015d0d13dd540b504686944758c6a8c2709 address = await Address.findById(addressId)
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