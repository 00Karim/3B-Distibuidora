const mongoose = require("mongoose");
const {
    connectTestDB,
    disconnectTestDB,
    clearTestDB,
} = require("./testDBSetup"); // importamos las funciones para conectarnos a la db en memoria, desconectarnos y borrar toda la data
const {
    describe,
    it,
    expect,
    beforeAll,
    afterAll,
    afterEach,
} = require("@jest/globals");
// it define una instancia de un test singular, por ejemplo: crear un producto
// describe sirve para agrupar tests, como una funcion ponele
// expects: chequea output. Por ejemplo, si crear un producto con nombre Apio --> expect(product.name).toBe("Apio")
// before all, engloba codigo que se ejecuta una vez antes de todas las pruebas
// afterAll, despues de todas las pruebas
// afterEach, despues de cada prueba singular

const {
    createTempCategory,
    createTempProduct,
    createTempAddress,
    createTempClient,
    createTempItem,
    createTempUser,
    createTempPackaging
} = require("./modelTestingSetup.js") // estas funciones las vamos a usar
// para poder aislar todas las pruebas sin necesitar de las otras para 
// usar las ids de los objetos o por ejemplo para no tener que usar una category
// creada en otra prueba para poder darle una category a un producto. Con estas 
// funciones vamos a crear todo lo que sea necesario para una clase dentro de la misma
// prueba

//IMPORTACION DE LAS ENTIDADES NECESARIAS
const Product = require("../models/entities/product"); // importo Product para poder asignar un producto al atributo product de item

//IMPORTACION DE LOS MODELOS A PROBAR:
const ProductModel = require("../models/product.model");
const CategoryModel = require("../models/category.model");
const AddressModel = require("../models/address.model");
const PackageTypeModel = require("../models/packagingType.model.js");
const ClientModel = require("../models/client.model");
const ItemModel = require("../models/item.model");
const UserModel = require("../models/user.model");

//IMPORTACION DE LOS ENUMS
const PackageType = require("../models/enums/PackageType");
const RoleType = require("../models/enums/RoleType");


beforeAll(async () => {
    await connectTestDB();
});
afterAll(async () => {
    await disconnectTestDB();
});
afterEach(async () => {
    await clearTestDB();
});

// --PRUEBAS CATEGORY--
describe("Pruebas de integracion con BDD del modelo de mongoose de Category ", () => {
    it("Chequea si se puede crear una categoria", async () => {
        const category = {
            name: "Frutos Secos",
            subcategories: [
                {
                    name: "Frutos Secos Alemanes",
                },
                {
                    name: "Frutos Secos Asiaticos",
                },
            ],
        };
        const newCategory = await CategoryModel.createCategory(category);
        expect(newCategory._id).toBeDefined(); // si el id de la category no esta definido entonces directamente no existe por lo que salio mal la prueba
        expect(newCategory.name).toBe("Frutos Secos");
        expect(newCategory.subcategories[0].name).toBe("Frutos Secos Alemanes");
    });
    it("Chequea si funciona un get de category", async () => {
        const category = await createTempCategory()
        const idCategory = category._id
        const foundCategory = await CategoryModel.getCategoryById(idCategory);
        expect(foundCategory._id).toBeDefined();
        expect(foundCategory.name).toBe("Frutos Secos");
        expect(foundCategory.subcategories[1].name).toBeDefined();
    });
    it("Chequea si se modifica la categoria creada", async () => {
        const category = await createTempCategory()
        const idCategory = category._id
        const updatedCategory = await CategoryModel.updateCategory(idCategory, {
            name: "Harinas",
        });
        expect(updatedCategory.name).toBe("Harinas");
    });
    // it("Chequea si se borra la categoria creada anteriormente", async () => {
    //     await CategoryModel.deleteCategory(idProduct)
    //     const deletedProduct = await ProductModel.getProductById(idProduct)
    //     expect(deletedProduct).toBeNull()
    // })
});

// --PRUEBAS DE PRODUCT--
describe("Pruebas de integracion con BDD del modelo de mongoose de Product ", () => {
    it("Chequea si se puede crear un producto", async () => {
        const category = await createTempCategory()
        const categories = [category._id, category._id] 
        const product = {
            name: "Almendras",
            price: 12000,
            image: "./img/almendras.jpg",
            description: "Almendra exotica de los alpes Paraguayos",
            category: categories,
            unitOfMeasure: "kg",
            stock: 100,
            glutenFree: false,
            brand: "Almugre",
        };
        const newProduct = await ProductModel.createProduct(product);
        console.log("NUEVO PRODUCTO: ", newProduct);
        expect(newProduct._id).toBeDefined(); // si el id del producto no esta definido entonces directamente no existe por lo que salio mal la prueba
        expect(newProduct.name).toBe("Almendras");
        expect(newProduct.price).toBe(12000);
        for (const category in newProduct.category) {
            expect(category).toBeDefined();
        }
    });
    it("Chequea si se funciona un get de un producto", async () => {
        const product = await createTempProduct()
        const idProduct = product._id
        const foundProduct = await ProductModel.getProductById(idProduct);
        expect(foundProduct._id).toBeDefined();
        expect(foundProduct.name).toBe("Almendras");
        expect(foundProduct.category).toBeDefined();
    });
    it("Chequea si se modifica un producto", async () => {
        const product = await createTempProduct()
        const idProduct = product._id
        const updatedProduct = await ProductModel.updateProduct(idProduct, {
            name: "Chocolate",
        });
        expect(updatedProduct.name).toBe("Chocolate");
    });
    it("Chequea si se borra un producto", async () => {
        const product = await createTempProduct()
        const idProduct = product._id
        await ProductModel.deleteProduct(idProduct);
        const deletedProduct = await ProductModel.getProductById(idProduct);
        expect(deletedProduct).toBeNull();
    });
});
// --PRUEBAS ADDRESS--
describe("Pruebas de integracion con BDD del modelo de mongoose Address", () => {
    it("Chequea si se puede crear una address", async () => {
        const address = {
            street: "Av. Libertador",
            number: "1234",
            city: "Buenos Aires",
            state: "CABA",
            postalCode: 1425,
        };
        const newAddress = await AddressModel.createAddress(address);
        expect(newAddress.street).toBe("Av. Libertador");
        expect(newAddress.postalCode).toBe(1425);
    });
    // it("Chequea si funciona un get de la address creada anteriormente", async () => {
    //     const foundAddress = await AddressModel.getAddress(idAddress)
    //     expect(foundAddress._id).toBeDefined()
    //     expect(foundAddress.street).toBe("Av. Libertador")
    //     expect(foundAddress.postalCode).toBe(1425)
    // })
});
// --PRUEBAS PACKAGINGTYPE--
describe("Pruebas de integracion con BDD del modelo de mongoose de PackagingType ", () => {
    it("Chequea si se puede crear un packagingType", async () => {
        const packaging = {
            package: PackageType.BAG, // valor dentro del enum
            amount: 3,
        };
        const newPackaging = await PackageTypeModel.createPackagingType(
            packaging
        );
        expect(newPackaging._id).toBeDefined(); // si el id de el packagignType no esta definido entonces directamente no existe por lo que salio mal la prueba
        expect(newPackaging.package).toBe(PackageType.BAG);
        expect(newPackaging.amount).toBe(3);
    });
    it("Chequea si funciona un get de packagingType", async () => {
        const packaging = await createTempPackaging()
        const idPackagingType = packaging._id
        const foundPackaging = await PackageTypeModel.getPackagingTypeById(
            idPackagingType
        );
        expect(foundPackaging._id).toBeDefined();
        expect(foundPackaging.package).toBe(PackageType.BAG);
        expect(foundPackaging.amount).toBe(3);
    });
    it("Chequea si se modifica el packaging type", async () => {
        const packaging = await createTempPackaging()
        const idPackagingType = packaging._id
        const updatedPackagingType = await PackageTypeModel.updatePackagingType(
            idPackagingType,
            { amount: 6, package: PackageType.BOX }
        );
        expect(updatedPackagingType.package).toBe(PackageType.BOX);
        expect(updatedPackagingType.amount).toBe(6);
    });
});
// --PRUEBAS CLIENT--
describe("Pruebas de integracion con BDD del modelo de mongoose de Client ", () => {
    it("Chequea si se puede crear un Cliente", async () => {
        const address = await createTempAddress() 

        const client = {
            name: "Juan Pérez",
            whatsapp: "+5491122334455",
            email: "juanperez@example.com",
            dni: 38999888,
            address: address,
        };

        const newClient = await ClientModel.createClient(client);
        expect(newClient.email).toBe("juanperez@example.com");
        expect(newClient.address.street).toBe("Av. Libertador");
    });
    // it("Chequea si funciona un get del cliente creado anteriormente", async () => {
    //     const foundClient = await ClientModel.getClient(idClient)
    //     expect(foundClient._id).toBeDefined()
    //     expect(foundClient.email).toBe("juanperez@example.com")
    //     expect(foundClient.address.street).toBe("Av. Libertador")
    // })
});

// --PRUEBAS ITEM--
describe("Pruebas de integracion con BDD del modelo de mongoose Item ", () => {
    it("Chequea si se puede crear un Item", async () => {
        const product = await createTempProduct()
        const item = {
            product: product,
            pricePerUnit: 1200,
            totalPrice: 2400,
            amount: 2,
            weight: 2,
            isAvailable: true,
            remarks: "Entrega en 24hs",
        };
        const newItem = await ItemModel.createItem(item);
        console.log("ITEM CREADO: ", newItem);
        console.log(
            "CATEGORIA 1: ",
            newItem.product.category[0],
            "\nCATEGORIA 2: ",
            newItem.product.category[1]
        );
        expect(newItem.totalPrice).toBe(2400);
        expect(newItem.amount).toBe(2);
        expect(newItem.remarks).toBe("Entrega en 24hs");
        expect(newItem.product.category[0]).toBeDefined();
    });
    // it("Chequea si funciona un get del item creado anteriormente", async () => {
    //     const foundItem = await ItemModel.getItem(idItem)
    //     expect(foundItem._id).toBeDefined()
    //     expect(foundItem.pricePerUnit).toBe(1200)
    //     expect(foundItem.amount).toBe(2)
    //     expect(foundItem.remarks).toBe("Entrega en 24hs")
    //     expect(foundItem.product.name).toBe("Almendras")
    // })
    it("Chequea si se modifica un item", async () => {
        const category = createTempCategory()
        const item = await createTempItem()
        const updatedItem = await ItemModel.updateItem(item, {
            weight: 2,
            isAvailable: false,
        });
        expect(updatedItem.isAvailable).toBe(false);
        expect(updatedItem.weight).toBe(2);
    });
});

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
