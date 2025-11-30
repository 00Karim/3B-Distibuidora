const { Router } = require("express")
const LocalAddressController = require("../controllers/adress.controller.js")

const Address = Router();

Address.post("/", LocalAddressController.handleCreateAdress);

module.exports = Address;