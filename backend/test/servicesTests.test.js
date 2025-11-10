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
const { createTempCategory, createTempAddress } = require("../test/modelTestingSetup") 

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
const UserModel = require("../models/user.model");

// IMPORTACION DE LAS FUNCIONES PARA CONTROLAS EL CICLO DE VIDA DE LA MEMORIA DE LAS TESTS

describe("Pruebas de integracion con la BDD de los services de Product", () => {
    let baseData = {}
    beforeEach(async () => { // hacemos que cada vez que empieze un test de producto se cree un diccionario con el formato de producto 
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
    beforeEach(() => { // hacemos que cada vez que empieze un test de User se cree un diccionario con el formato de user 
        baseData = Object.freeze({
            email: "usuario@gmail.com",
            password: "1234567",
            name: "Elusuario",
            role: RoleType.EMPLOYEE
        });
    });

    const build = (overrides = {}) => ({ ...baseData, ...overrides }); // con esta funcion podemos crear nuevos diccionarios iguales al de arriba, pero sacando o modificando el parametro que querramos. Ademas, la funcion nos devuelve un diciconario nuevo, asi que las tests mantienen el aislamiento
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
    it("Chequea que de error si no se ingresan datos para actualizar", async () => {
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
})
