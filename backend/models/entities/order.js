const mongoose = require("mongoose")

const Item = require("./item")
const User = require("./user")
const PackagingType = require("./packagingType")
const Client = require("./client")
const StatusType = require("../enums/StatusType")
const DeliveryType = require("../enums/DeliveryType")

const orderSchema = new mongoose.Schema({
    items: {type: [Item.schema], required: true},
    user: {type: mongoose.Types.ObjectId(User), required: true},
    assignedEmployees: {type: [User.schema], required: true},
    total: {type: Number, required: true},
    status: {   
                type: String,
                enum: Object.values(StatusType), 
                default: StatusType.REVISION, 
                required: true
            },
    date: {type: Date, required: true},
    delivery: {
                type: String, 
                enum: Object.values(DeliveryType),
                default: DeliveryType.STORE_PICK_UP, 
                required: true
            },
    client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
    remarks: {type: String},
    packaging: {
                    type: [PackagingType.schema], 
                    required: true,
                    default: () => [ new PackagingType() ]
            }
})

module.exports = mongoose.model("Order", orderSchema)
