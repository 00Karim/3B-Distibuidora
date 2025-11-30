const mongoose = require("mongoose");
const Category = require("./models/entities/category.js");
const Product = require("./models/entities/product.js");


const seedCategories = [
  {
    name: "Frutos secos",
    subcategories: [
      { name: "Almendras", subcategories: [] },
      { name: "Nueces", subcategories: [] },
      { name: "Castañas de Cajú", subcategories: [] },
      { name: "Pistachos", subcategories: [] }
    ]
  },
  {
    name: "Deshidratados",
    subcategories: [
      { name: "Pasas de uva", subcategories: [] },
      { name: "Ciruelas", subcategories: [] },
      { name: "Banana Chips", subcategories: [] }
    ]
  },
  {
    name: "Harinas",
    subcategories: [
      { name: "Harina de almendras", subcategories: [] },
      { name: "Harina integral", subcategories: [] },
      { name: "Harina de coco", subcategories: [] }
    ]
  },
  {
    name: "Semillas",
    subcategories: [
      { name: "Chía", subcategories: [] },
      { name: "Lino", subcategories: [] },
      { name: "Girasol", subcategories: [] },
      { name: "Sésamo", subcategories: [] }
    ]
  },
  {
    name: "Cereales",
    subcategories: [
      { name: "Avena", subcategories: [] },
      { name: "Granola", subcategories: [] }
    ]
  },
  {
    name: "Chocolates",
    subcategories: [
      { name: "Chocolate 60%", subcategories: [] },
      { name: "Chocolate 70%", subcategories: [] },
      { name: "Chocolate con leche", subcategories: [] }
    ]
  }
];

const sampleProducts = (categoryMap) => [
  {
        name: "Almendras Enteras",
        brand: "3B",
        price: 2300,
        description: "Almendras naturales premium.",
        category: [categoryMap["Almendras"]],
        unitOfMeasure: "kg",
        stock: 40,
        image: "/public/img/almendras-enteras.jpg",
        glutenFree: true
    },
    {
        name: "Nueces Peladas",
        brand: "3B",
        price: 2600,
        description: "Nuez mariposa premium.",
        category: [categoryMap["Nueces"]],
        unitOfMeasure: "kg",
        stock: 30,
        image: "/public/img/nueces-peladas.jpg",
        glutenFree: true
    },
    {
        name: "Pistachos",
        brand: "3B",
        price: 3200,
        description: "Pistachos tostados sin sal.",
        category: [categoryMap["Pistachos"]],
        unitOfMeasure: "kg",
        stock: 20,
        image: "/public/img/pistachos.jpg",
        glutenFree: true
    },
    {
        name: "Banana Chips",
        brand: "3B",
        price: 1600,
        description: "Rodajas crocantes de banana deshidratada.",
        category: [categoryMap["Banana Chips"]],
        unitOfMeasure: "kg",
        stock: 50,
        image: "/public/img/banana-chips.jpg",
        glutenFree: true
    },
    {
        name: "Pasas de Uva",
        brand: "3B",
        price: 1100,
        description: "Pasas rubias de calidad premium.",
        category: [categoryMap["Pasas de uva"]],
        unitOfMeasure: "kg",
        stock: 60,
        image: "/public/img/pasas-de-uva.jpg",
        glutenFree: true
    },
    {
        name: "Harina de Almendras",
        brand: "3B",
        price: 3500,
        description: "Harina apta para recetas keto.",
        category: [categoryMap["Harina de almendras"]],
        unitOfMeasure: "kg",
        stock: 15,
        image: "/public/img/harina-de-almendras.webp",
        glutenFree: true
    },
    {
        name: "Avena Instantánea",
        brand: "Quaker",
        price: 1400,
        description: "Avena instantánea fortificada.",
        category: [categoryMap["Avena"]],
        unitOfMeasure: "kg",
        stock: 90,
        image: "/public/img/avena-instantanea.webp",
        glutenFree: false
    },
    {
        name: "Granola Natural",
        brand: "3B",
        price: 1400,
        description: "Granola artesanal crujiente.",
        category: [categoryMap["Granola"]],
        unitOfMeasure: "kg",
        stock: 70,
        image: "/public/img/granola-natural.jpg",
        glutenFree: false
    },
    {
        name: "Semillas de Chía",
        brand: "3B",
        price: 1300,
        description: "Semillas de chía premium.",
        category: [categoryMap["Chía"]],
        unitOfMeasure: "kg",
        stock: 55,
        image: "/public/img/semillas-de-chia.jpg",
        glutenFree: true
    },
    {
        name: "Castañas de Cajú",
        brand: "3B",
        price: 3000,
        description: "Cajú natural sin sal.",
        category: [categoryMap["Castañas de Cajú"]],
        unitOfMeasure: "kg",
        stock: 22,
        image: "/public/img/castanas-de-caju.webp",
        glutenFree: true
    }
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB conectado correctamente");

    //si se ejecuta el sistema en dev entonces se van a crear categorias y productos por default para poder probar el sistema
    if (process.env.NODE_ENV === "development") {
      console.log("Modo desarrollo: creando productos...");

      let allCategories = await Category.find();
    
      if (allCategories.length === 0) {
        await Category.insertMany(seedCategories);
        console.log("Categorías insertadas");
        allCategories = await Category.find();
      } else {
        console.log("Categorías ya existentes, no se insertan");
      }

      
      const categoryMap = {};
      const flatten = (cat) => {
        categoryMap[cat.name] = cat._id;
        if (cat.subcategories && cat.subcategories.length > 0) {
          cat.subcategories.forEach(flatten);
        }
      };

      allCategories.forEach(flatten);
      const prodCount = await Product.countDocuments();

      if (prodCount === 0) {
        const productsToInsert = sampleProducts(categoryMap);
        await Product.insertMany(productsToInsert);
        console.log("Productos insertados con IDs reales de categoría");
      } else {
        console.log("Productos ya existentes, no se insertan");
      }
    }

  } catch (err) {
    console.error("Error conectando MongoDB", err);
    process.exit(1);
  }
};

module.exports = { connectDB };