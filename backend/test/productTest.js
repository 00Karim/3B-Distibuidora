const Product = require("../models/product.model")

const product = new Product({
    name: "Almendras",
    price: 12000,
    image: "./img/almendras.jpg",
    description: "Ipsum nashe dou nazi",
    category: {
        _id: "19021902jkskjsas",
        name: "Frutos Secos"
    },
    unitOfMeasure: "kg",
    stock: 100,
    glutenFree: false,
    brand: "Patagonia Nashe"
}) 

const savedProduct = await product.save()

console.log(`Product creado correctamente: ${savedProduct._id}`)
