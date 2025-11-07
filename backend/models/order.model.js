const mongoose = require("mongoose")
const Order = require("./entities/order")
// const Client = require("../models/entities/client")

class OrderModel {
    static getAllOrders = async(filters = {}) => {
        const query = {}
        try{
            if(filters.status)
                query.status = filters.status

            if(filters.date)
                query.date = filters.date

            if(filters.delivery)
                query.delivery = filters.delivery

            // if(filters.clientName){
            //     const clients = await Client.find({
            //         name: { $regex: filters.clientName, $options: 'i'}
            //     })
            //     const clientIds = clients.map(client => client._id)
            //     query.client = { $in: clientIds}
            // }

            const orders = await Order.find(query)
                .populate('assignedEmployees')
                .populate('packaging')
                .sort({ date:-1 })
            
            return orders
        }catch(e){
            throw new Error(`Error, no se pudieron obtener los pedidos, ${e}`)
        }
    }
    
    static getOrder = async(orderId) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(orderId))
                throw new Error(`Error, Id del pedido invalido`)
            
            const order = await Order.findById(orderId).populate('assignedEmployees').populate('packaging')

            return order
        }catch(e){
            throw new Error(`Error, no se pudo obtener el pedido indicado, ${e}`)
        }
    }

    static createOrder = async(orderData) => {
        try{
            const newOrder = new Order(orderData)
            await newOrder.save()
            return newOrder
        }catch(e){
            throw new Error(`Error creando nuevo pedido, ${e}`)
        }
    }

    static updateOrder = async(orderId, orderData) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(orderId))
                throw new Error(`Error, Id del pedido invalido`)

            const updatedOrder = await Order.findByIdAndUpdate(
                orderId,
                orderData,
                {new: true, runValidators: true}
            )

            return updatedOrder
        }catch(e){
            throw new Error(`Error actualizando el pedido, ${e}`)
        }
    }

    static deleteOrder = async(orderId) => {
        try{
            if(!mongoose.Types.ObjectId.isValid(orderId))
                throw new Error(`Error, Id del pedido invalido`)

            const deletedOrder = await Order.findByIdAndDelete(orderId)

            return deletedOrder
        }catch(e){
            throw new Error(`Error eliminando el pedido, ${e}`)
        }
    }
}

module.exports = OrderModel;