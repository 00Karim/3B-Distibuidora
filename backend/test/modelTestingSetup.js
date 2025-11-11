//MODELS
const CategoryModel = require("../models/category.model")
const ProductModel = require("../models/product.model")
const ItemModel = require("../models/item.model")
const AddressModel = require("../models/address.model")
const ClientModel = require("../models/client.model")
const UserModel = require("../models/user.model")
const PackagingTypeModel = require("../models/packagingType.model")
const OrderModel = require("../models/order.model")

//ENUMS
const PackageType = require("../models/enums/PackageType")
const RoleType = require("../models/enums/RoleType")

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
        totalPrice: 24000,
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
  const address = await createTempAddress();

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

const createTempOrder = async () => {
  const item = await createTempItem();          
  const client = await createTempClient();      
  const user = await createTempUser();          
  const packaging = await createTempPackaging();

  const total = item.totalPrice; 

  const orderData = {
    items: [item],                      
    user: user._id,                     
    assignedEmployees: [user._id],      
    total,                              
    status: "pending",                  
    date: new Date(),                   
    delivery: "store_pick_up",          
    client,                             
    remarks: "Pedido de prueba generado por createTempOrder",
    packaging: [packaging._id]          
  };

  return await OrderModel.createOrder(orderData);
};

module.exports = {createTempCategory, createTempProduct, createTempAddress, createTempClient, createTempItem, createTempUser, createTempPackaging, createTempOrder}