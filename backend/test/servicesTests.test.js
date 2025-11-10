const mongoose = require("mongoose");

//IMPORTACION DE FUNCIONES PARA CONTROLAR EL CICLO DE VIDA DE LAS TESTS
require("./testLifeCycleFunctions") // esta es una importacion con efectos secundarios, cuando lo importamos tambien ejecuta el codigo adentro
                                    // por lo que aunque no lo estemos viendo, beforeAll (conectarnos a la db en memoria), afterAll (desconectarnos) 
                                    // y afterEach (reiniciar la db --> borrar toda la data = pruebas aisladas entre si) se definen aca

const { setupServicesTests }= require("./testLifeCycleFunctions")

const {
    describe,
    it,
    expect
} = require("@jest/globals");

// IMPORTACION DE FUNCIONES PARA CREAR OBJETOS DE DISTINTAS CLASES
const { createTempCategory, createTempAddress, createTempProduct } = require("../test/modelTestingSetup") 

//IMPORTACION DE MODELS PARA SOPORTE
const UserModel = require("../models/user.model");
const ItemModel = require("../models/item.model")
const ProductModel = require("../models/product.model")

//IMPORTACION DE LOS SERVICES A PROBAR
const ProductServices = require("../services/productServices")
const UserServices = require("../services/userServices")
const ItemServices = require("../services/itemServices")
const OrderServices = require("../services/orderServices")

//IMPORTACION DE LOS ENUMS
const PackageType = require("../models/enums/PackageType");
const RoleType = require("../models/enums/RoleType");
const DeliveryType = require("../models/enums/DeliveryType");
const MeasurementUnit = require("../models/enums/MeasurementUnit");

// IMPORTACION DE LAS FUNCIONES PARA CONTROLAS EL CICLO DE VIDA DE LA MEMORIA DE LAS TESTS

describe("Pruebas de integracion con la BDD de los services de Product", () => {
    let baseData = {}
    beforeEach(async () => { // hacemos que cada vez que empieze un test de producto se cree un diccionario con los atributos de producto 
        const category = await createTempCategory();
        baseData = Object.freeze({
        name: "Comida",
        price: 1000000,
        image: "https://imagen.com",
        description: "Comida rica",
        category: category._id,
        unitOfMeasure: MeasurementUnit.KG,
        stock: 3,
        glutenFree: false,
        brand: "Volkswagen"
        });
    });

    const build = (overrides = {}) => ({ ...baseData, ...overrides }); // con esta funcion podemos crear nuevos diccionarios iguales al de arriba, pero sacando o modificando el parametro que querramos. Ademas, la funcion nos devuelve un diciconario nuevo, asi que las tests mantienen el aislamiento
    it("Chequea que de error si no se ingresa el atributo name en create", async () => {
        const { name, ...dataSinName } = build();
        await expect(ProductServices.create(dataSinName))
            .rejects.toThrow("Error, el nombre es obligatorio");
    });
    it("Chequea que de error si no se ingresa el atributo price en create", async () => {
        const { price, ...dataSinPrice } = build();
        await expect(ProductServices.create(dataSinPrice))
            .rejects.toThrow("Error, el precio es obligatorio");
    });
    it("Chequea que de error si no se ingresa el atributo image en create", async () => {
        const { image, ...dataSinImage } = build();
        await expect(ProductServices.create(dataSinImage))
            .rejects.toThrow("Error, la imagen es obligatoria");
    });
    it("Chequea que de error si no se ingresa el atributo category en create", async () => {
        const { category, ...dataSinCategory } = build();
        await expect(ProductServices.create(dataSinCategory))
            .rejects.toThrow("Error, la categoria es obligatoria");
    });
    it("Chequea que de error si no se ingresa el atributo unitOfMeasure en create", async () => {
        const { unitOfMeasure, ...dataSinUnitOfMeasure } = build();
        await expect(ProductServices.create(dataSinUnitOfMeasure))
            .rejects.toThrow("Error, la unidad de medida es obligatoria");
    });
    it("Chequea que de error si no se ingresa el atributo stock en create", async () => {
        const { stock, ...dataSinStock } = build();
        await expect(ProductServices.create(dataSinStock))
            .rejects.toThrow("Error, el stock es obligatorio");
    });
    it("Chequea que de error si no se ingresa el atributo glutenFree en create", async () => {
        const { glutenFree, ...dataSinGlutenFree } = build();
        await expect(ProductServices.create(dataSinGlutenFree))
            .rejects.toThrow("Error, el campo libre de gluten es obligatorio");
    });
    it("Chequea que de error si se ingresa un id no valido o no se ingresa un id para modificar un producto", async () => {
        await expect(ProductServices.update("hola"))
            .rejects.toThrow("Error, el id es obligatorio");
    });
    it("Chequea que de error si se intenta cambiar el precio de un producto a menos que 0", async () => {
        const data = build();
        const nuevoProduct = await ProductServices.create(data);
        const idProduct = nuevoProduct._id;

        await expect(ProductServices.update(idProduct, { price: -90 }))
            .rejects.toThrow("Error, el precio no puede ser menor a 0"); 
    });
    it("Chequea que de error si se intenta cambiar el stock a un valor menor a 0", async () => {
        const data = build();
        const nuevoProduct = await ProductServices.create(data);
        const idProduct = nuevoProduct._id;

        await expect(ProductServices.update(idProduct, { stock: -1 }))
            .rejects.toThrow("Error, el stock no puede ser menor a 0"); 
    });
})

describe("Pruebas de integracion con BDD de los services de User", () => {
    let baseData = {}
    beforeEach(() => { // hacemos que cada vez que empieze un test de User se cree un diccionario con los atributos de user 
        baseData = Object.freeze({
            email: "usuario@gmail.com",
            password: "1234567",
            name: "Elusuario",
            role: RoleType.EMPLOYEE
        });
    });
    const build = (overrides = {}) => ({ ...baseData, ...overrides }); // con esta funcion podemos crear nuevos diccionarios iguales al de arriba, pero sacando o modificando el parametro que querramos. Ademas, la funcion nos devuelve un diciconario nuevo, asi que las tests mantienen el aislamiento
        it("Chequea que funcione el getById", async () => {
        const nuevoUser = await UserModel.createUser(build())
        const idUser = nuevoUser._id
        const userEncontrado = await UserServices.getById(idUser) 
        expect(userEncontrado.email).toBe("usuario@gmail.com")
    })
    it("Chequea que de error si se ingresa un email no valido", async () => {
        const dataConMailErroneo = build( {...build(), email: "hola.gmail.com"})
        await expect(UserServices.create(dataConMailErroneo)).rejects.toThrow("Email invalido")
    })
    it("Chequea que de error si se ingresa un email que ya fue usado en otro usuario en create", async () => {
        await UserModel.createUser(build())
        await expect(UserServices.create(build())).rejects.toThrow("El email ya ha sido utilizado")
    })
    it("Chequea que de error si se ingresa una contrasenia con menos de 6 caracteres en create", async () => {
        await expect(UserServices.create(build({...build(), password: "123"}))).rejects.toThrow("La contrasenia debe tener al menos 6 caracteres")
    })
    it("Chequea que de error si se ingresa un rol invalido en create", async () => {
        await expect(UserServices.create(build({...build(), role: "Jefe"}))).rejects.toThrow("Rol inválido")
    })
    it("Chequea que de error si se ingresa un id no valido en update", async () => {
        await expect(UserServices.update("id_123", build())).rejects.toThrow("ID inválido")
    })
    // a lo largo de las pruebas, vamos a usar este string "507f1f77bcf86cd799439011" para actuar como placeholder de un id ya que tiene el formato de un id valido pero no es el id de ningun documento en la bdd
    it("Chequea que de error si no se ingresan datos para actualizar en update", async () => {
        await expect(UserServices.update("507f1f77bcf86cd799439011", {})).rejects.toThrow("No se enviaron campos para actualizar")
    })
    it("Chequea que de error si se ingresa un email no valido en update", async () => {
        await expect(UserServices.update("507f1f77bcf86cd799439011", build({...build, email: "elmail.com"}))).rejects.toThrow("Email inválido")
    })
    it("Chequea que de error si se ingresa una contrasenia con menos de 6 caracteres en update", async () => {
        await expect(UserServices.update("507f1f77bcf86cd799439011" ,build({...build(), password: "123"}))).rejects.toThrow("La contraseña debe tener al menos 6 caracteres")
    })
    it("Chequea que de error si se ingresa un rol invalido en create", async () => {
        await expect(UserServices.update("507f1f77bcf86cd799439011", build({...build(), role: "Jefe"}))).rejects.toThrow("Rol inválido")
    })
    it("Chequea que de error si se ingresa un id invalido en delete", async () => {
        await expect(UserServices.delete("id_12345")).rejects.toThrow("ID invalido")
    })
    it("Chequea que de error si se el usuario que se intenta borrar no existe en delete", async () => {
        await expect(UserServices.delete("507f1f77bcf86cd799439011")).rejects.toThrow("Usuario no encontrado o no eliminado")
    })
})

describe("Pruebas de integracion con BDD de los services de Item", () => {
    let baseData
    beforeEach( async () => { // hacemos que cada vez que empieze un test de Item se cree un diccionario con los atributos de Item 
        const product = await createTempProduct()
        baseData = Object.freeze({
            product: product, 
            pricePerUnit: 12000,
            amount: 2,
            weight: 0,          
            totalPrice: 24000,    
            isAvailable: true,
            remarks: "Pedido piola",
        });
    });
    const build = (overrides = {}) => ({ ...baseData, ...overrides }); // con esta funcion podemos crear nuevos diccionarios iguales al de arriba, pero sacando o modificando el parametro que querramos. Ademas, la funcion nos devuelve un diciconario nuevo, asi que las tests mantienen el aislamiento

    it("Chequea que de error si no se ingresa un product en create", async () => {
        const data = build({ product: undefined });
        await expect(ItemServices.create(data)).rejects.toThrow("Error, el producto es obligatorio")
    });

    it("Chequea que de error si no se ingresa un totalPrice en create", async () => {
        const data = build({ totalPrice: undefined });
        await expect(ItemServices.create(data)).rejects.toThrow("Error, el precio total es obligatorio y debe ser mayor a cero");
    });

    it("Chequea que de error si totalPrice no es mayor que 0 en create", async () => {
        const data = build({ totalPrice: 0 });
        await expect(ItemServices.create(data)).rejects.toThrow("Error, el precio total es obligatorio y debe ser mayor a cero");
    });;

    it("Chequea que de error si weight > 0 y totalPrice != pricePerUnit * weight", async () => {
        const data = build({ weight: 3, amount: 1, totalPrice: 500 }); 
        await expect(ItemServices.create(data)).rejects.toThrow("Error, el precio total por item no es correcto");
    });

    it("Chequea rama amount: da error si totalPrice != pricePerUnit * amount", async () => {
        const data = build({ weight: 0, amount: 3, totalPrice: 250 }); // 100*3=300
        await expect(ItemServices.create(data)).rejects.toThrow("Error, el precio total por item no es correcto");
    });
    it("Chequea que de error si isAvailable=false", async () => {
        const data = build({ isAvailable: false });
        await expect(ItemServices.create(data)).rejects.toThrow("Error, la disponibilidad es obligatoria");
    });
    it("Chequea que se pueda crear un item valido con una amount", async () => {
        const data = build({ pricePerUnit: 150, amount: 4, weight: 0, totalPrice: 600, isAvailable: true });
        const item = await ItemServices.create(data);
        expect(item).toMatchObject({ totalPrice: 600, amount: 4, weight: 0 });
    });

    it("Chequea que se pueda crear un item valido con un weight", async () => {
        const data = build({ pricePerUnit: 80, amount: 1, weight: 2.5, totalPrice: 200, isAvailable: true });
        const res = await ItemServices.create(data);
        expect(res).toMatchObject({ totalPrice: 200, weight: 2.5 });
    });
    // #####################################################
    // #####################################################
    // #####################################################
    // #####################################################
    it("Chequea que de error si se ingresa un product inexistente en update", async () => {
        const oldItem = await ItemServices.create(build());
        const fakeId = new mongoose.Types.ObjectId().toString();

        const data = build({
            product: { _id: fakeId } // le ponemos al product una id de un producot que no existe
        });

        await expect(ItemServices.update(oldItem, data)).rejects.toThrow("Error, el producto ingresado no existe");
    });

    it("Chequea que de error si se ingresa un product sin stock en update", async () => {
        const oldItem = await ItemServices.create(baseData);

        // creamos un producto real sin stock
        const noStock = await ProductModel.createProduct({
            name: "Producto piola",
            price: 1,
            image: "imagen.jpg",
            description: "Es un producto",
            category: [new mongoose.Types.ObjectId()],
            unitOfMeasure: MeasurementUnit.UNIT,
            stock: 0,
            glutenFree: false,
            brand: "marca",
        });

        const data = {
            product: { _id: noStock._id },
        };

        await expect(ItemServices.update(oldItem, data)).rejects.toThrow("Error, el producto ingresado no tiene stock");
    });

    it("Chequea que de error si totalPrice no coincide con pricePerUnit * weight (cuando vienen ambos) en update", async () => {
        const oldItem = await ItemServices.create(baseData);

        const data = {
            pricePerUnit: 100,
            weight: 3,
            totalPrice: 500, // 100 * 3 = 300 -> mismatch
        };

        await expect(ItemServices.update(oldItem, data)).rejects.toThrow("Error, el precio total por item no es correcto");
    });

    it("Chequea rama amount: da error si totalPrice != pricePerUnit * amount en update", async () => {
        const oldItem = await ItemServices.create(baseData);

        const data = {
            pricePerUnit: 100,
            amount: 3,
            totalPrice: 250, // 100 * 3 = 300 -> mismatch
        };

        await expect(ItemServices.update(oldItem, data)).rejects.toThrow("Error, el precio total por item no es correcto");
    });

    it("Chequea que de error si amount viene sin totalPrice en update", async () => {
        const oldItem = await ItemServices.create(baseData);

        const data = {
            amount: 5,
        };

        await expect(ItemServices.update(oldItem, data)).rejects.toThrow("Error, no puede cambiar la cantidad sin cambiar el precio total");
    });

    it("Chequea que de error si weight viene sin totalPrice en update", async () => {
        const oldItem = await ItemServices.create(baseData);

        const data = {
            weight: 1.5,
        };

        await expect(ItemServices.update(oldItem, data)).rejects.toThrow("Error, no puede cambiar el peso sin cambiar el precio total");
    });

    it("Chequea que no se pueda actualizar pricePerUnit sin que cambie el precio total en update", async () => {
        const oldItem = await ItemServices.create(baseData);

        const data = {
            pricePerUnit: 15000,
        };

        await expect(ItemServices.update(oldItem, data)).rejects.toThrow("Error no se puede cambiar el pricePerUnit sin cambiar el precio total");
    });

    it("Chequea que no se pueda actualizar totalPrice sin ingresar weight, amount o pricePerUnit en update", async () => {
        const oldItem = await ItemServices.create(baseData);

        const data = {
            totalPrice: 99999,
        };

        await expect(ItemServices.update(oldItem, data)).rejects.toThrow("Error, no se puede cambiar el totalPrice sin cambiar el peso, la cantidad o el pricePerUnit");
    });

    it("Chequea que se pueda actualizar amount + totalPrice coherentes en update", async () => {
        const oldItem = await ItemServices.create(baseData);

        const data = {
            pricePerUnit: 200,
            amount: 4,
            totalPrice: 800, 
        };

        const updated = await ItemServices.update(oldItem, data);
        expect(updated).toMatchObject({
            pricePerUnit: 200,
            amount: 4,
            totalPrice: 800,
        });
    });

    it("Chequea que se pueda actualizar weight + totalPrice coherentes en update", async () => {
        const oldItem = await ItemServices.create(baseData);

        const data = {
            pricePerUnit: 80,
            weight: 2.5,
            totalPrice: 200, 
        };

        const updated = await ItemServices.update(oldItem, data);
        expect(updated).toMatchObject({
            pricePerUnit: 80,
            weight: 2.5,
            totalPrice: 200,
        });
    });
})