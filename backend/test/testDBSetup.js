const mongoose = require("mongoose")
const { MongoMemoryServer } = require("mongodb-memory-server") // nos permite crear un server temporal de mongodb en memoria

// este archivo sirve para minimizar el codigo que se usa en las test
// ademas porque todo el codigo dbajo no nos importa para la test en 
// si, este es solo el setup del entorno que nos permite simular la db para hacer pruebas

let mongoServer; // la declaramos aca afuera asi el resto de las funciones pueden acceder a su valor

async function connectTestDB() {
    mongoServer = await MongoMemoryServer.create(); // creamos el server
    const uri = mongoServer.getUri() // extraemos la uri del server para poder conectarnos
    await mongoose.connect(uri) // nos conectamos como siempre pero usando el server en memoria que creamos recien
};

// usamos la siguiente funcion para cortar la conexion con el servidor en memoria, de esta forma luego 
// podemos borrarlo ya que no nos sirve de nada que siga en pie (solo lo usamos para el test)
async function disconnectTestDB(){
    await mongoose.disconnect() // nos desconectamos del server
    await mongoServer.stop() // apagamos el servidor en memoria 
}

async function clearTestDB(){
    const collections = mongoose.connection.collections; // esto nos devuelve todas las collecciones en el siguiente formato json --> {<nombre coleccion>: Collection {<data acerca de la coleccion}}
    for (const key in collections) { // teniendo en cuenta lo dicho arriba, la key en connections vendria a ser el nombre de la collecion
        await collections[key].deleteMany({}) // por cada nombre hacemos un delete asi que terminamos borrando todo
    }
}

module.exports = {connectTestDB, disconnectTestDB, clearTestDB}