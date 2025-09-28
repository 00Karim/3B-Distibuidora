const mongoose = require("mongoose")
const bcrypt = require("bcrypt") // para hashear contrasenias
const UserModel = require("../models/user.model")
const RoleType = require("../enums/RoleType")

const ALLOWED_USER_UPDATE = ["name", "email", "password", "role"]

class userService {
    //Metodo para validar el ID
    static _isValidObjectId(id) {
        return !!id && mongoose.Types.ObjectId.isValid(id)
    }
    //Metodo para chequear los numeros ingresados sean validos, tanto por contenido como por tipo
    static _sanitizeString(str, maxLen = 200) {
        if (str === undefined || str === null) return undefined
        const s = String(str).trim()
        if (s.length === 0) return undefined
        if (s.length > maxLen) throw new Error("Texto demasiado largo")
        return s
    }
    //Chequeo del mail ingresado
    static _validateEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return regex.test(email)
    }
    //Chequeo de la contrasenia ingresada y hasheo
    static async _hashPassword(password) {
        const saltRounds = 10
        return await bcrypt.hash(password, saltRounds)
    }

    static async getAll() {
        try {
            const users = await UserModel.getAllUsers()
            return users
        } catch (e) {
            throw new Error(`Error en el servicio user getAll, ${e}`)
        }
    }

    static async getById(userId) {
        try {
            if (!this._isValidObjectId(userId)) throw new Error("ID inválido")
            const user = await UserModel.getUser(userId)
            if (!user) throw new Error("Usuario no encontrado")
            return user
        } catch (e) {
            throw new Error(`Error en el service getById User, ${e}`)
        }
    }

    static async create(data = {}) {
        try {
        const email = this._sanitizeString(data.email, 50)
        if (!email || !this._validateEmail(email)) {
            throw new Error("Email inválido")
        }

        const name = this._sanitizeString(data.name, 50)
        if (!name) throw new Error("El nombre es obligatorio")

        if (!data.password || String(data.password).length < 6) {
            throw new Error("La contrasenia debe tener al menos 6 caracteres")
        }
        const hashedPassword = await this._hashPassword(data.password)

        if (!data.role || !Object.values(RoleType).includes(data.role)) {
            throw new Error("Rol inválido")
        }

        const userPayload = {
            email,
            password: hashedPassword,
            name,
            role: data.role
        }

        const newUser = await UserModel.createUser(userPayload)
        return newUser
        } catch (e) {
        throw new Error(`UserService.create: ${e.message || e}`)
        }
    }

    static async update(userId, data = {}) {
        try {
            if (!this._isValidObjectId(userId)) throw new Error("ID inválido")
            if (!data || Object.keys(data).length === 0) {
                throw new Error("No se enviaron campos para actualizar")
            }

            // Filtrar campos permitidos
            const payload = {}
            for (const key of ALLOWED_USER_UPDATE) {
                if (data[key] !== undefined) payload[key] = data[key]
            }

            // Validaciones específicas
            if (payload.email) {
                payload.email = this._sanitizeString(payload.email, 100)
                if (!this._validateEmail(payload.email)) {
                throw new Error("Email inválido")
                }
            }

            if (payload.name) {
                payload.name = this._sanitizeString(payload.name, 100)
            }

            if (payload.password) {
                if (String(payload.password).length < 6) {
                throw new Error("La contraseña debe tener al menos 6 caracteres")
                }
                payload.password = await this._hashPassword(payload.password)
            }

            if (payload.role) {
                if (!Object.values(RoleType).includes(payload.role)) {
                throw new Error("Rol inválido")
                }
            }

            const updatedUser = await UserModel.updateUser(userId, payload)
            if (!updatedUser) throw new Error("Usuario no encontrado o no actualizado")

            return updatedUser
        } catch (e) {
        throw new Error(`Error en el servicio de User update, ${e}`)
        }
    }

    static async delete(userId) {
        try {
            if (!this._isValidObjectId(userId)) throw new Error("ID inválido")
            const deleted = await UserModel.deleteUser(userId)
            if (!deleted) throw new Error("Usuario no encontrado o no eliminado")
            return deleted
        } catch (e) {
            throw new Error(`Error de servicio de User delete, ${e}`)
        }
    }
}

module.exports = userService
