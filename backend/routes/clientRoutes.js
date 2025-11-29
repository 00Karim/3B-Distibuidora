const { Router } = require("express")
const LocalClientController = require("../controllers/client.controller.js")

const Clients = Router();

Clients.post("/", LocalClientController.handleCreateClient);

module.exports = Clients;