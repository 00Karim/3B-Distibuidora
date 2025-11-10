const mongoose = require("mongoose")
const orderModel = require("../models/product.model")
const Product = require("../models/entities/product")
const User = require("../models/entities/user")
const Client = require("../models/entities/client")

const StatusType = require("../models/enums/StatusType")
const DeliveryType = require("../models/enums/DeliveryType")

const ALLOWED_ORDER_UPDATE = [
  "items",
  "status",
  "assignedEmployees",
  "delivery",
  "remarks",
  "packaging",
  "date"
]

class orderService {
    //Metodo para validar el ID
    static _isValidObjectId(id) {
        return !!id && mongoose.Types.ObjectId.isValid(id)
    }
    //Metodo para chequear los numeros ingresados, que sean validos o que no sean infinitos
    static _sanitizeNumber(value) {
        if (value === undefined || value === null) return undefined
        const n = Number(value)
        if (Number.isNaN(n) || !Number.isFinite(n)) return undefined
        return n
    }
    
    static getAll = async(filters = {}) => {
        try{
            const orders = await orderModel.getAllOrders(filters)
            return orders
        }catch(e){
            throw new Error(`Error de servicio en getAll Order, ${e}`)
        }
    }

    static getById = async(orderId) => {
        try{
            if (!this._isValidObjectId(orderId)) throw new Error("ID de pedido invalido")
            const order = await orderModel.getOrder(orderId)
            if(!order) throw new Error(`Error, pedido no encontrado`)
            return order
        }catch(e){
            throw new Error(`Error de servicio en getById Order, ${e}`)
        }
    }

    static create = async(data = {}) => {
        try{
            //Validaciones basicas de campos obligatorios
            if(!data.user) throw new Error(`Error, el usuario es obligatorio`)
            if(!data.client) throw new Error(`Error, el cliente es obligatorio`)
            if (!data.items || !Array.isArray(data.items) || data.items.length === 0) {
                throw new Error("Debe enviarse al menos un item en el pedido, es obligatorio")
            }
            if (!data.date) data.date = new Date()

            //Validacion existencia del usuario
            if(!this._isValidObjectId(data.user)) throw new Error(`El ID del usuario es invalido`)
            const user = await User.findById(data.user) 
            if(!user) throw new Error(`Error, no se encontro el usuario indicado`)

            //Validacion existencia del cliente
            // if(!this._isValidObjectId(data.client)) throw new Error(`El ID del cliente es invalido`)
            // const client = await Client.findById(data.client) 
            // if(!client) throw new Error(`Error, no se encontro el cliente indicado`)

            //Validacion del statys y tipo de envio
            if (data.status && !Object.values(StatusType).includes(data.status)) {
                throw new Error("Estado invalido")
            }
            if (data.delivery && !Object.values(DeliveryType).includes(data.delivery)) {
                throw new Error("Tipo de entrega invalido")
            }

            //Validacion de los productos en cada item
            let computedTotal = 0 //Calculo del total de los items
            const processedItems = []
            for(const rawItem of data.items){
                if(!rawItem.product) throw new Error(`Error, cada item debe tener un producto`)
                let product = null

                //Se busca y se asigna el producto por ID
                if(rawItem.product._id && this._isValidObjectId(rawItem.product._id)){
                    product = await Product.findById(rawItem.product._id)
                    if (!product) throw new Error("Producto referenciado en items no existe")
                }

                const amount = this._sanitizeNumber(rawItem.amount) ?? 1 // si no existe una amount entonces se defaultea a 1
                if (amount < 1) throw new Error("La cantidad de un item debe ser >= 1")
                
                //Se chequea el precio unitario del producto en el item
                const unitPrice = Number(product.price ?? 0)
                if (Number.isNaN(unitPrice) || !Number.isFinite(unitPrice) || unitPrice < 0) {
                  throw new Error("Precio unitario incorrecto para un producto en items")
                }

                //Recalculo del precio por item y el subtotal
                const totalPrice = unitPrice * amount
                computedTotal += totalPrice

                // Chequeo del stock del producto, si no hay suficiente stock para efectuar una venta entonces no se puede efectuar la venta
                if (product && typeof product.stock === "number" && product.stock < amount) {
                  throw new Error(`Stock insuficiente para el producto ${product._id || product.name}`)
                }

                // Construccion del Item normalizado, la idea es no confiar en client para enviar a la DB
                processedItems.push({
                    product: rawItem.product._id,
                    amount,
                    totalPrice,
                    weight: rawItem.weight,
                    isAvailable: rawItem.isAvailable === undefined ? (liveProduct ? !!liveProduct.inStock : true) : !!rawItem.isAvailable,
                    remarks: rawItem.remarks
                })
            }

            // Filtro final de otros campos para evitar el mass asignament
            const orderPayload = {
                items: processedItems,
                user: user._id,
                assignedEmployees: data.assignedEmployees,
                client: data.client,
                total: computedTotal,
                status: data.status ?? StatusType.REVISION,
                date: new Date(data.date),
                delivery: data.delivery ?? DeliveryType.STORE_PICK_UP,
                remarks: data.remarks,
                packaging: data.packaging 
            }

            const createdOrder = await orderModel.createOrder(orderPayload)
            return createdOrder
            } catch (e) {
            throw new Error(`Error en el create de Order, ${e}`)
            }
    }

    static update = async(orderId, data = {}) => {
        try {
            if (!this._isValidObjectId(orderId)) throw new Error("Error de validacion: ID de pedido inválido")

            const payload = {}
            for (const key of ALLOWED_ORDER_UPDATE) {
                if (data[key] !== undefined) payload[key] = data[key]
            }

            // Si se estan actualizando Items, se rechequearn y se recalcula el subtotal 
            if (payload.items) {
                if (!Array.isArray(payload.items) || payload.items.length === 0) {
                    throw new Error("Error de validacion: lista de items vacía")
                }
                let newTotal = 0
                const processedItems = []
                for (const rawItem of payload.items) {
                if (!rawItem.product) throw new Error("Error de validación: item sin producto")

                const product = await Product.findById(rawItem.product._id);
                if (!product) throw new Error("Producto inexistente");

                const amount = this._sanitizeNumber(rawItem.amount) ?? 1;
                if (amount < 1) throw new Error("Cantidad de un item debe ser >= 1");

                const unitPrice = Number(product.price ?? 0)
                if (Number.isNaN(unitPrice) || !Number.isFinite(unitPrice) || unitPrice < 0) {
                    throw new Error("Datos invalidos: Precio unitario incorrecto para un producto en items")
                }

                const totalPrice = unitPrice * amount
                newTotal += totalPrice

                if (product && typeof product.stock === "number" && product.stock < amount) {
                    throw new Error(`Conflicto de estado: Stock insuficiente para el producto ${product._id || product.name}`)
                }

                processedItems.push({
                    product: rawItem.product._id,
                    amount,
                    totalPrice,
                    weight: rawItem.weight,
                    isAvailable: rawItem.isAvailable === undefined ? (liveProduct ? !!liveProduct.inStock : true) : !!rawItem.isAvailable,
                    remarks: rawItem.remarks
                })
                }

                payload.items = processedItems
                payload.total = newTotal
            }

            // Validacion del cambio de status
            if (payload.status) {
                if (!Object.values(StatusType).includes(payload.status)) throw new Error("Datos invalidos: Estado inválido")
                
                const currentOrder = await orderModel.getOrder(orderId)
                if (!currentOrder) throw new Error("Recurso no encontrado: pedido inexistente")
                if (currentOrder.status === StatusType.DELIVERED && payload.status !== StatusType.DELIVERED) {
                throw new Error("Conflicto de estado: no se puede volver a un estado anterior a 'Entregado'")
                }
            }

            // Validate assignedEmployees exist if updating
            if (payload.assignedEmployees) {
                if (!Array.isArray(payload.assignedEmployees)) throw new Error("Error de validacion: assignedEmployees no es un array")
                for (const empId of payload.assignedEmployees) {
                if (!this._isValidObjectId(empId)) throw new Error("Error de validacion: ID de empleado inválido")
                const emp = await User.findById(empId)
                if (!emp) throw new Error(`Recurso no encontrado: Empleado con id ${empId} no encontrado`)
                }
            }

            const updated = await orderModel.updateOrder(orderId, payload)
            if (!updated) throw new Error("Recurso no encontrado: pedido inexistente")
            return updated
        } catch (e) {
            throw new Error(`Error en el servicio de order update, ${e}`)
        }
    }

    static async delete(orderId) {
        try {
            if (!this._isValidObjectId(orderId)) throw new Error("ID de pedido invalido")
            const deleted = await orderModel.deleteOrder(orderId)
            if (!deleted) throw new Error("No se pudo eliminar el pedido o es inexistente")
            return deleted
        } catch (e) {
        throw new Error(`Error en el servicio de order delete, ${e}`)
        }
    }
}

module.exports = orderService