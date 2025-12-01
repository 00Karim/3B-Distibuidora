const express = require("express")

const rutasCategories = require("./categoryRoutes.js") 
const rutasProductos = require("./productRoutes.js")
const rutasUsers = require("./userRoutes.js")
const rutasItems = require("./itemRoutes.js")
const rutasPackaging = require("./packagingRoutes.js")
const rutasAddress = require("./addressRoutes.js")
const rutasClient = require("./clientRoutes.js")
const rutasOrder = require("./orderRoutes.js")

const routerGeneral = express.Router();

routerGeneral.use("/categories", rutasCategories);
routerGeneral.use("/products", rutasProductos)
routerGeneral.use("/users", rutasUsers)
routerGeneral.use("/items", rutasItems)
routerGeneral.use("/packagings", rutasPackaging)
routerGeneral.use("/addresses", rutasAddress)
routerGeneral.use("/clients", rutasClient)
routerGeneral.use("/orders", rutasOrder)

module.exports = routerGeneral;