const Category = require("../models/category.model")

const category = new Category({
    name: "Frutos Secos"
})

const savedCategory = await category.save()

console.log(`Categoria creada correctamente: ${savedCategory._id}`)