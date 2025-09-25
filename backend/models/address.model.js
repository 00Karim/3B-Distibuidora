const Adress = require("../models/entities/address")

class AddressModel {
    static getAdress = async(adressId) => {
        try{
            if(!mongoose.Types.objectId.isValid(adressId))
                throw new Error(`Error, el ID del adress es invalido, ${e}`)

            const adress = await Adress.findById(adressId)
            return adress
        }catch(e){
            throw new Error(`Error, no se pudo obtener el adress indicado, ${e}`)
        }
    }    

    static createAdress = async(adressData) => {
        try{    
            const newAdress = new Adress(adressData)
            newAdress.save()
            return newAdress
        }catch(e){
            throw new Error(`Error, no se pudo crear el adress indicado, ${e}`)
        }
    }
}

module.exports = AddressModel