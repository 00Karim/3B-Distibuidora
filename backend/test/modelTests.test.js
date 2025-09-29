const mongoose = require("mongoose")
const { connectTestDB, disconnectTestDB, clearTestDB} = require("./testDBSetup") // importamos las funciones para conectarnos a la db en memoria, desconectarnos y borrar toda la data
const { describe, it, expect, beforeAll, afterAll, afterEach } = require("@jest/globals")
// it define una instancia de un test singular, por ejemplo: crear un producto
// describe sirve para agrupar tests, como una funcion ponele
// expects: chequea output. Por ejemplo, si crear un producto con nombre Apio --> expect(product.name).toBe("Apio")
// before all, engloba codigo que se ejecuta una vez antes de todas las pruebas
// afterAll, despues de todas las pruebas
// afterEach, despues de cada prueba singular

//IMPORTACION DE LAS ENTIDADES NECESARIAS
const Product = require("../models/entities/product") // importo Product para poder asignar un producto al atributo product de item 

//IMPORTACION DE LOS MODELOS A PROBAR:
const ProductModel = require("../models/product.model")
const CategoryModel = require("../models/category.model")
const AddressModel = require("../models/address.model")
const PackageTypeModel = require("../models/packagingtype.model")
const ClientModel = require("../models/client.model")
const ItemModel = require("../models/item.model")
const UserModel = require("../models/user.model")

//IMPORTACION DE LOS ENUMS
const PackageType = require("../models/enums/PackageType")
const RoleType = require("../models/enums/RoleType")

//DECLARACION DE IDS DE DOCUMENTOS PARA USO GLOBAL
// declaramos la variables de id de cada clase para poder usarla mas adelante en operaciones que lo necesiten, 
// sobretodo para el get por id que se necesita cuando creamos un documento embebido 
let idAddress = ""
let idCategory = ""
let idClient = ""
let idPackagingType = ""
let idProduct = ""
let idItem = ""
let idUser = ""

let executeClearTest = false // usamos esta variable para decidir cuando queremos que se borren los datos de la bdd en memoria
// poruqe por ejemplo, si creamos una entidad y luego queremos usarla, eso no seria posible si dejamos que afterEach funcione
// libremente sin ninguna condicion
let executeDisconnect = false // usamos esta variabla para determinar cuando queremos desconectarnos de la bd. Si no hacemos esto
// al final de cada conjunto de pruebas se desconecta la base de datos y nos da errores de conexion despues

function deleteAndDisconnect(){ // al ejecutar esta funcion se va a borrar todas las coleciones de la db y desconectar de la conexion
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

// --PRUEBAS CATEGORY--
describe("Pruebas de integracion con BDD del modelo de mongoose de Category ", () => {
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
    })
    // it("Chequea si se borra la categoria creada anteriormente", async () => {
    //     await CategoryModel.deleteCategory(idProduct)
    //     const deletedProduct = await ProductModel.getProductById(idProduct)
    //     expect(deletedProduct).toBeNull()
    // })
})

// --PRUEBAS DE PRODUCT--
describe("Pruebas de integracion con BDD del modelo de mongoose de Product ", () => {
    let product = {} // lo declaramos antes para poder usarlo en todas las pruebas
    it("Chequea si se puede crear un producto", async () => {
        product = {
            name: "Almendras",
            price: 12000,
            image: "./img/almendras.jpg",
            description: "Viaje a visitar pacificamente la Patagonia",
            category: idCategory,
            unitOfMeasure: "kg",
            stock: 100,
            glutenFree: false,
            brand: "Patagonia"
        };
        const newProduct = await ProductModel.createProduct(product)
        console.log("PRODUCTO CREADO EN PRUEBAS PRODUCTO: ", newProduct)
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
        expect(foundProduct.category).toBeDefined()
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
        idProduct = (await ProductModel.createProduct(product))._id // creamos el objeto de nuevo para poder usarlo en otras operaciones mas adelante 
    })
})

// --PRUEBAS ADDRESS--
describe("Pruebas de integracion con BDD del modelo de mongoose Address", () => {
    it("Chequea si se puede crear una categoria", async () => {
        const address = {
            street: "Av. Libertador",
            number: "1234",
            city: "Buenos Aires",
            state: "CABA",
            postalCode: 1425
        };
        const newAddress = await AddressModel.createAddress(address)
        idAddress = newAddress._id // le asignamos el id de la address creada recientemente a la variable idAddress para usar en las otras operaciones
        expect(newAddress._id).toBeDefined() // si el id de la address no esta definido entonces directamente no existe por lo que salio mal la prueba
        expect(newAddress.street).toBe("Av. Libertador")
        expect(newAddress.postalCode).toBe(1425)  
    })
    it("Chequea si funciona un get de la address creada anteriormente", async () => {
        const foundAddress = await AddressModel.getAddress(idAddress)
        expect(foundAddress._id).toBeDefined()
        expect(foundAddress.street).toBe("Av. Libertador")
        expect(foundAddress.postalCode).toBe(1425)
    })
})
// --PRUEBAS PACKAGINGTYPE--
describe("Pruebas de integracion con BDD del modelo de mongoose de PackagingType ", () => {
    it("Chequea si se puede crear un packagingType", async () => {
        const packaging = {
            package: PackageType.BAG, // valor dentro del enum
            amount: 3
        };
        const newPackaging = await PackageTypeModel.createPackagingType(packaging)
        idPackagingType = newPackaging._id // le asignamos el id del packagigntype creada recientemente a la variable idPackagingType para usar en las otras operaciones
        expect(newPackaging._id).toBeDefined() // si el id de el packagignType no esta definido entonces directamente no existe por lo que salio mal la prueba
        expect(newPackaging.package).toBe(PackageType.BAG)
        expect(newPackaging.amount).toBe(3)  
    })
    it("Chequea si funciona un get del packagingType creado anteriormente", async () => {
        const foundPackaging = await PackageTypeModel.getPackagingType(idPackagingType)
        expect(foundPackaging._id).toBeDefined()
        expect(foundPackaging.package).toBe(PackageType.BAG)
        expect(foundPackaging.amount).toBe(3)
    })
    it("Chequea si se modifica el packaging type creado anteriormente", async () => {
        const updatedPackagingType = await PackageTypeModel.updatePackagingType(
            idPackagingType, 
            {amount: 6, package: PackageType.BOX} 
        )
        expect(updatedPackagingType.package).toBe(PackageType.BOX)
        expect(updatedPackagingType.amount).toBe(6)
    })
})
// --PRUEBAS CLIENT--
describe("Pruebas de integracion con BDD del modelo de mongoose de Client ", () => {
    let address = {} // address que vamos a usar como documento embebido dentro del client --> la definimos aca porque
    // hay dos tests que necesitan acceder a ella por lo que es necesario que este en el scope de todas las pruebas,
    // ademas al definirlo antes logramos que no se convierta en un documento de mongoose con toda su metadata
    it("Chequea si se puede crear un Cliente", async () => {
        address = await AddressModel.getAddress(idAddress);

        const client = {
            name: "Juan Pérez",
            whatsapp: "+5491122334455",
            email: "juanperez@example.com",
            dni: 38999888,
            address: address   
        };

        const newClient = await ClientModel.createClient(client)
        idClient = newClient._id // le asignamos el id del Client creado recientemente a la variable idClient para usar en las otras operaciones
        expect(newClient._id).toBeDefined() // si el id del Client no esta definido entonces directamente no existe por lo que salio mal la prueba
        expect(newClient.email).toBe("juanperez@example.com")
        expect(newClient.address.street).toBe("Av. Libertador")  
    })
    it("Chequea si funciona un get del cliente creado anteriormente", async () => {
        const foundClient = await ClientModel.getClient(idClient)
        expect(foundClient._id).toBeDefined()
        expect(foundClient.email).toBe("juanperez@example.com")
        expect(foundClient.address.street).toBe("Av. Libertador")
    })
})

// --PRUEBAS ITEM--
describe("Pruebas de integracion con BDD del modelo de mongoose Item ", () => {
    let product = {}
    it("Chequea si se puede crear un Item", async () => {
        product = await ProductModel.getProductById(idProduct) // geteamos el prduct creado antes para asignarselo al atributo product como documento embebido
        console.log("PRODUCTO CREADO EN PRUEBAS ITEM: ", product)
        const item = {
            "product": product,
            "pricePerUnit": 1200,
            "totalPrice": 2400,
            "amount": 2,
            "weight": 2,
            "isAvailable": true,
            "remarks": "Entrega en 24hs"
        }
        console.log("ITEM JSON EN JS: ", item)
        const newItem = await ItemModel.createItem(item)
        idItem = newItem._id // le asignamos el id del packagigntype creada recientemente a la variable idPackagingType para usar en las otras operaciones
        expect(newItem._id).toBeDefined() // si el id de el packagignType no esta definido entonces directamente no existe por lo que salio mal la prueba
        expect(newItem.pricePerUnit).toBe(1200)
        expect(newItem.amount).toBe(2)
        expect(newItem.remarks).toBe("Entrega en 24hs")  
    })
    it("Chequea si funciona un get del item creado anteriormente", async () => {
        const foundItem = await ItemModel.getItem(idItem)
        expect(foundItem._id).toBeDefined()
        expect(foundItem.pricePerUnit).toBe(1200)
        expect(foundItem.amount).toBe(2)
        expect(foundItem.remarks).toBe("Entrega en 24hs")
        expect(foundItem.product.name).toBe("Almendras")
    })
    it("Chequea si se modifica el item creado anteriormente", async () => {
        const updatedItem = await ItemModel.updateItem(
            idItem, 
            {isAvailable: false, totalPrice: 9999} 
        )
        console.log(updatedItem)
        expect(updatedItem.isAvailable).toBe(false)
        expect(updatedItem.totalPrice).toBe(9999)
        expect(updatedItem.product.category).toBeDefined()
    })
})

// --PRUEBAS DE USER--
// describe("Pruebas de integracion con BDD del modelo de mongoose de User ", () => {
//     let user = {} // lo declaramos antes para poder usarlo en todas las pruebas
//     it("Chequea si se puede crear un user", async () => {
//         user = {
//             "email": "juan.perez@example.com",
//             "password": "$2b$10$Xj2g8n6tF3kL3ZJg6pVd7u9/abcHashedPassword123", 
//             "name": "Juan Pérez",
//             "role": RoleType.EMPLOYEE,
//             "creationDate": "2025-09-29T19:45:00.000Z"
//         }
//         const newUser = await UserModel.createUser(user)
//         console.log("USUARIO CREADO EN PRUEBAS USER: ", newUser)
//         idUser = newUser._id // le asignamos el id del usuario creado recientemente a la variable idUser para usar en las otras operaciones
//         expect(newUser._id).toBeDefined() // si el id del usuario no esta definido entonces directamente no existe por lo que salio mal la prueba
//         expect(newUser.email).toBe("juan.perez@example.com")
//         expect(newUser.role).toBe(RoleType.EMPLOYEE)  
//     })
//     it("Chequea si se funciona un get del user creado anteriormente", async () => {
//         const foundUser = await UserModel.getUser(idUser)
//         expect(foundUser._id).toBeDefined()
//         expect(foundUser.password).toBe("$2b$10$Xj2g8n6tF3kL3ZJg6pVd7u9/abcHashedPassword123")
//         expect(foundUser.role).toBe(RoleType.EMPLOYEE)
//     })
//     it("Chequea si se borra el user creado anteriormente", async () => {
//         await UserModel.deleteUser(idUser)
//         const deletedUser = await UserModel.getUser(idUser)
//         expect(deletedUser).toBeNull()
//         idUser = (await UserModel.createUser(user))._id // creamos el objeto de nuevo para poder usarlo en otras operaciones mas adelante (para poder usarlo en Order)
//         deleteAndDisconnect()
//     })
// })
