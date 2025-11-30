const { Router } = require("express")
const LocalProductController = require("../controllers/product.controller.js")

const Products = Router();

Products.get("/", LocalProductController.handleGetAllProducts);
Products.get("/:id", LocalProductController.handelGetProductById);
Products.post("/", LocalProductController.handleCreateProduct);
Products.put("/:id", LocalProductController.handleUpdateProduct);   
Products.delete("/:id", LocalProductController.handleDeleteProduct);

module.exports = Products;