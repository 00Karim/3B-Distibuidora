const { Router } = require("express")
const LocalOrderController = require("../controllers/order.controller.js")

const Orders = Router();

Orders.get("/", LocalOrderController.handleGetAllOrders);
Orders.get("/:id", LocalOrderController.handleGetOrderById);
Orders.post("/", LocalOrderController.handleCreateOrder);
Orders.put("/:id", LocalOrderController.handleUpdateOrder);   
Orders.delete("/:id", LocalOrderController.handleDeleteOrder);

module.exports = Orders;