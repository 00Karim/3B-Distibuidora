const mongoose = require("mongoose")
const User = require("./entities/user")

class UserModel {
        static getAllUsers = async() => {
            try{
                const user = User.find()
                return user 
            }catch(e){
                throw new Error(`Error, no se pudieron obtener los usuarios, ${e}`)
            }
        }
        
        static getUser = async(userId) => {
            try{
                // if(!mongoose.Types.ObjectId.isValid(userId))
                //     throw new Error(`Error, el ID ingresado no es valido`)
    
                const user = await User.findById(userId)
                return user
            }catch(e){
                throw new Error(`Error, no se pudo obtener el usuario indicado ${e}`)
            }
        }

        static getUserByEmail = async(userEmail) => {
            try{
                const user = await User.findOne({ email: userEmail })
                return user
            }catch(e){
                throw new Error(`Error, el usuario no pudo encontrarse por email ${e}`)
            }
        }

        static createUser = async(userData) => {
            try{
                console.log("DATA QUE LLEGA AL MODELO DEL USER: ", userData);
                const newUser = new User(userData)
                console.log("USUARIO NUEVO CREADO: ", newUser);
                await newUser.save()

                return newUser
            }catch(e){
                throw new Error(`Error, no se pudo crear el usuario indicado ${e}`)
            }
        }

        // static updateUser = async(userId, userData) => {
        //     try{
        //         if(!mongoose.Types.ObjectId.isValid(userId))
        //             throw new Error(`Error, el ID ingresado no es valido ${e}`)

        //         const updatedUser = await User.findByIdAndUpdate(
        //             userId,
        //             userData,
        //             {new: true, runValidators: true}
        //         )

        //         return updatedUser

        //     }catch(e){
        //         throw new Error(`Error, no se pudo actualizar el usuario indicado ${e}`)
        //     }
        // }

        static deleteUser = async(userId) => {
            try{
                if(!mongoose.Types.ObjectId.isValid(userId))
                    throw new Error(`Error, el ID ingresado no es valido`)

                const userDeleted = await User.findByIdAndDelete(userId)
                return userDeleted
            }catch(e){
                throw new Error(`Error, no se pudo eliminar el usuario indicado ${e}`)
            }
        }
}

module.exports = UserModel;