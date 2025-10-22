//MODELS
const CategoryModel = require("../models/category.model")
const ProductModel = require("../models/product.model")
const ItemModel = require("../models/item.model")
const AddressModel = require("../models/address.model")
const ClientModel = require("../models/client.model")
const UserModel = require("../models/user.model")
const PackagingTypeModel = require("../models/packagingType.model")

//ENUMS
const PackageType = require("../models/enums/PackageType")

const createTempCategory = async() => {
    const category = {
        name: "Frutos Secos",
        subcategories: [{ name: "Alemanes" }, { name: "Asiáticos" }],
    };
    return await CategoryModel.createCategory(category);
}

const createTempProduct = async () => {
    const category = await createTempCategory();
    const product = {
        name: "Almendras",
        price: 12000,
        image: "./img/almendras.jpg",
        description: "Producto de prueba",
        category: [category._id],
        unitOfMeasure: "kg",
        stock: 100,
        glutenFree: true,
        brand: "TestBrand",
    };
    return await ProductModel.createProduct(product);
}

const createTempItem = async () => {
    const product = await createTempProduct();
    const item = {
        product,
        totalPrice: 2400,
        amount: 2,
        weight: 2,
        isAvailable: true,
        remarks: "Entrega inmediata",
    };
    return await ItemModel.createItem(item);
}

const createTempAddress = async () => {
  const addressData = {
    street: "Av. Libertador",
    number: "1234",
    city: "Buenos Aires",
    state: "CABA",
    postalCode: 1425
  };

  return await AddressModel.createAddress(addressData);
}

const createTempClient = async () => {
  const address = await createAddressFixture();

  const clientData = {
    name: "Juan Pérez",
    whatsapp: "+5491122334455",
    email: "juanperez@example.com",
    dni: 38999888,
    address: address
  };

  return await ClientModel.createClient(clientData);
}

const createTempUser = async () => {
  const userData = {
    email: "juan.perez@example.com",
    password: "$2b$10$hashedExample1234567890",
    name: "Juan Pérez",
    role: RoleType.EMPLOYEE,
    creationDate: new Date()
  };

  return await UserModel.createUser(userData);
}

const createTempPackaging = async () => {
  const packaging = {
    package: PackageType.BAG, // valor dentro del enum
    amount: 3
  };

  return await PackagingTypeModel.createPackagingType(packaging);
};

module.exports = {createTempCategory, createTempProduct, createTempAddress, createTempClient, createTempItem, createTempUser, createTempPackaging}