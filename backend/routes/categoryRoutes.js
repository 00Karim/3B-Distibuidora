const { Router } = require("express")
const LocalCategoryController = require("../controllers/category.controller.js")

const Categories = Router();

Categories.get("/", LocalCategoryController.handleGetAllCategories);
Categories.get("/:id", LocalCategoryController.handleGetCategoryById);
Categories.post("/", LocalCategoryController.handleCreateCategory);
Categories.put("/:id", LocalCategoryController.handleUpdateCategory);   
Categories.delete("/:id", LocalCategoryController.handleDeleteCategory);

module.exports = Categories;