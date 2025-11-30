const { Router } = require("express")
const LocalPackagingController = require("../controllers/packagingType.controller.js")

const Packaging = Router();

Packaging.get("/", LocalPackagingController.handleGetAllPackagingTypes);
Packaging.get("/:id", LocalPackagingController.handleGetPackagingType);
Packaging.post("/", LocalPackagingController.handleCreatePackagingType);
Packaging.put("/:id", LocalPackagingController.handleUpdatePackagingType);   
Packaging.delete("/:id", LocalPackagingController.handleDeletePackagingType);

module.exports = Packaging;