const { Router } = require("express")
const LocalItemController = require("../controllers/item.controller.js")

const Items = Router();

Items.post("/", LocalItemController.handleCreateItem);
Items.put("/", LocalItemController.handleUpdateItem);

module.exports = Items;