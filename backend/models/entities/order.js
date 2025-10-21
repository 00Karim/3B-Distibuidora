const mongoose = require("mongoose")

const Item = require("./item")
const Client = require("./client")
const StatusType = require("../enums/StatusType")
const DeliveryType = require("../enums/DeliveryType")

const orderSchema = new mongoose.Schema({
    items: {type: [Item.schema], required: true}, // SUBDOCUMENTO
    user: { // DOCUMENTO REFERENCIADO
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User', 
            required: true
        },
    assignedEmployees: [{ // DOCUMENTO REFERENCIADO
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'User'
            }],
    total: {type: Number, required: true},
    status: { // ENUM: "pending" | "in_progress" | "completed" | "canceled" | "delivered"
                type: String,
                enum: Object.values(StatusType), 
                default: StatusType.REVISION, 
                required: true
            },
    date: {type: Date, required: true},
    delivery: { // ENUM: "city_of_origin" | "store_pick_up" | "outer_city"
                type: String, 
                enum: Object.values(DeliveryType),
                default: DeliveryType.STORE_PICK_UP, 
                required: true
            },
    client: {type: Client.schema, required: true}, // SUBDOCUMENTO
    remarks: {type: String},
    packaging: [{ // DOCUMENTO REFERENCIADO
                type: mongoose.Schema.Types.ObjectId,
                ref: 'PackagingType',
                required: true
            }]
})

module.exports = mongoose.model("Order", orderSchema)
