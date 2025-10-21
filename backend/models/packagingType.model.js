const mongoose = require("mongoose");
const PackagingType = require("./entities/packagingType"); // your schema file

class PackagingTypeModel {

  static createPackagingType = async (packagingData) => {
    try {
      const packagingType = new PackagingType(packagingData);
      await packagingType.save();
      return packagingType;
    } catch (e) {
      throw new Error(`Error, no se pudo crear el tipo de empaque: ${e.message}`);
    }
  };

  static getAllPackagingTypes = async () => {
    try {
      const packagingTypes = await PackagingType.find();
      return packagingTypes;
    } catch (e) {
      throw new Error(`Error, no se pudieron obtener los tipos de empaque: ${e.message}`);
    }
  };

  static getPackagingTypeById = async (packagingTypeId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(packagingTypeId)) {
        throw new Error("Error, el ID no es válido");
      }

      const packagingType = await PackagingType.findById(packagingTypeId);
      return packagingType;
    } catch (e) {
      throw new Error(`Error, no se pudo obtener el tipo de empaque indicado: ${e.message}`);
    }
  };

  static updatePackagingType = async (packagingTypeId, packagingData) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(packagingTypeId)) {
        throw new Error("Error, el ID no es válido");
      }

      const packagingType = await PackagingType.findByIdAndUpdate(
        packagingTypeId,
        packagingData,
        { new: true, runValidators: true }
      );

      return packagingType;
    } catch (e) {
      throw new Error(`Error, no se pudo actualizar el tipo de empaque: ${e.message}`);
    }
  };

  static deletePackagingType = async (packagingTypeId) => {
    try {
      if (!mongoose.Types.ObjectId.isValid(packagingTypeId)) {
        throw new Error("Error, el ID no es válido");
      }

      const deleted = await PackagingType.findByIdAndDelete(packagingTypeId);
      return deleted;
    } catch (e) {
      throw new Error(`Error, no se pudo eliminar el tipo de empaque: ${e.message}`);
    }
  };
}

module.exports = PackagingTypeModel;