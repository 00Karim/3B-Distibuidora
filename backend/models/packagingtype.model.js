const PackagingType = require("../models/entities/packagingType")

class packagingModel {
    static getPackagingType = async(packagingTypeId) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(packagingTypeId))
                throw new Error(`El id del tipo de packaging es invalido, ${e}`)

            const packagingType = await PackagingType.findById(packagingTypeId) 
            return packagingType
        }catch(e){
            throw new Error(`Error buscando el tipo de packaging, ${e}`)
        }
    }    

    static createPackagingType = async(packagingTypeData) => {
        try{
            const packagingType = new PackagingType(packagingTypeData)
            await packagingType.save()
            return packagingType
        }catch(e){
            throw new Error(`Error creando el tipo de packaging, ${e}`)
        }
    }

    static updatePackagingType = async(packagingTypeId, packagingTypeData) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(packagingTypeId))
                throw new Error(`El id del tipo de packaging es invalido, ${e}`)

            const newPackagingType = new PackagingType(
                packagingTypeId,
                packagingTypeData,
                {new: true, runValidators: true}
            )

            return newPackagingType
        }catch(e){
            throw new Error(`Error actualizando el tipo de packaging, ${e}`)
        }
    }
}

module.exports = packagingModel;