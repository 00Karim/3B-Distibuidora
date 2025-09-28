const mongoose = require("mongoose")
const { connectTestDB, disconnectTestDB, clearTestDB} = require("./testDBSetup") // importamos las funciones para conectarnos a la db en memoria, desconectarnos y borrar toda la data
const { describe, it, expect, beforeAll, afterAll, afterEach } = require("@jest/globals")
// it define una instancia de un test singular, por ejemplo: crear un producto
// describe sirve para agrupar tests, como una funcion ponele
// expects: chequea output. Por ejemplo, si crear un producto con nombre Apio --> expect(product.name).toBe("Apio")
// before all, engloba codigo que se ejecuta una vez antes de todas las pruebas
// afterAll, despues de todas las pruebas
// afterEach, despues de cada prueba singular

//IMPORTACION DE LOS MODELOS A PROBAR:
const ProductModel = require("../models/product.model")
const CategoryModel = require("../models/category.model")

let executeClearTest = false // usamos esta variable para decidir cuando queremos que se borren los datos de la bdd en memoria
// poruqe por ejemplo, si creamos una entidad y luego queremos usarla, eso no seria posible si dejamos que afterEach funcione
// libremente sin ninguna condicion
let executeDisconnect = false // usamos esta variabla para determinar cuando queremos desconectarnos de la bd. Si no hacemos esto
// al final de cada conjunto de pruebas se desconecta la base de datos y nos da errores de conexion despues

function deleteAndDisconnect(){
    executeClearTest = true
    executeDisconnect = true
}

beforeAll( async () => {
    await connectTestDB()
})
afterAll( async () => {
    if(executeDisconnect){
        await disconnectTestDB()
    }
})
afterEach( async () => {
    if (executeClearTest){
        await clearTestDB()
    }
})

describe("Pruebas de integracion con BDD del modelo de mongoose de Product ", () => {
    let idProduct = "" // declaramos la variable id product para poder usarla mas adelante en las otras pruebas que lo necesiten 
    it("Chequea si se puede crear un producto", async () => {
        const product = {
            name: "Almendras",
            price: 12000,
            image: "./img/almendras.jpg",
            description: "Viaje a visitar pacificamente la Patagonia",
            category: {
                _id: new mongoose.Types.ObjectId("652f3c9d9f1b146f8d8a1234"), // simula un id real aunque no exista en la bdd
                name: "Frutos Secos"
            },
            unitOfMeasure: "kg",
            stock: 100,
            glutenFree: false,
            brand: "Patagonia"
        };
        const newProduct = await ProductModel.createProduct(product)
        idProduct = newProduct._id // le asignamos el id del producto creado recientemente a la variable idProduct para usar en las otras operaciones
        expect(newProduct._id).toBeDefined() // si el id del producto no esta definido entonces directamente no existe por lo que salio mal la prueba
        expect(newProduct.name).toBe("Almendras")
        expect(newProduct.price).toBe(12000)
        expect(newProduct.category._id).toBeDefined()  
    })
    it("Chequea si se funciona un get del producto creado anteriormente", async () => {
        const foundProduct = await ProductModel.getProductById(idProduct)
        expect(foundProduct._id).toBeDefined()
        expect(foundProduct.name).toBe("Almendras")
        expect(foundProduct.category._id).toBeDefined()
    })
    it("Chequea si se modifica el producto creado anteriormente", async () => {
        const updatedProduct = await ProductModel.updateProduct(
            idProduct, 
            {name: "Chocolate"} 
        )
        expect(updatedProduct.name).toBe("Chocolate")
        })
    it("Chequea si se borra el producto creado anteriormente", async () => {
        await ProductModel.deleteProduct(idProduct)
        const deletedProduct = await ProductModel.getProductById(idProduct)
        expect(deletedProduct).toBeNull()
    })
})

describe("Pruebas de integracion con BDD del modelo de mongoose de Category ", () => {
    let idCategory = "" // declaramos la variable id category para poder usarla mas adelante en las otras pruebas que lo necesiten 
    it("Chequea si se puede crear una categoria", async () => {
        const category = {
            name: "Frutos Secos",
            subcategories: [
                {
                    name: "Frutos Secos Alemanes"
                },
                {
                    name: "Frutos Secos Asiaticos"
                }
            ]
        };
        const newCategory = await CategoryModel.createCategory(category)
        idCategory = newCategory._id // le asignamos el id de la category creada recientemente a la variable idCategory para usar en las otras operaciones
        expect(newCategory._id).toBeDefined() // si el id de la category no esta definido entonces directamente no existe por lo que salio mal la prueba
        expect(newCategory.name).toBe("Frutos Secos")
        expect(newCategory.subcategories[0].name).toBe("Frutos Secos Alemanes")  
    })
    it("Chequea si funciona un get de la category creada anteriormente", async () => {
        const foundCategory = await CategoryModel.getCategoryById(idCategory)
        expect(foundCategory._id).toBeDefined()
        expect(foundCategory.name).toBe("Frutos Secos")
        expect(foundCategory.subcategories[1].name).toBeDefined()
    })
    it("Chequea si se modifica la categoria creada anteriormente", async () => {
        const updatedCategory = await CategoryModel.updateCategory(
            idCategory, 
            {name: "Harinas"} 
        )
        expect(updatedCategory.name).toBe("Harinas")
        deleteAndDisconnect()
    })
    // it("Chequea si se borra la categoria creada anteriormente", async () => {
    //     await CategoryModel.deleteCategory(idProduct)
    //     const deletedProduct = await ProductModel.getProductById(idProduct)
    //     expect(deletedProduct).toBeNull()
    // })
})