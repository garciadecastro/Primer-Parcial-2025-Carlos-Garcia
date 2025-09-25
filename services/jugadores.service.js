import { MongoClient, ObjectId } from "mongodb";

// Conexión a Mongo Atlas
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.3sxrdj2.mongodb.net/");
const db = client.db("AH20232CP1");
const collection = db.collection("jugadores");

// Obtener todos los jugadores (que no estén eliminados)
export async function getJugadores(filter = {}) {
  await client.connect();

  const filterMongo = { eliminado: { $ne: true } };

  if (filter.nombre !== undefined) {
    filterMongo.nombre = { $regex: filter.nombre, $options: "i" }; // búsqueda parcial y case-insensitive
  }

  if (filter.descripcion !== undefined) {
    filterMongo.descripcion = { $regex: filter.descripcion, $options: "i" };
  }

  return collection.find(filterMongo).toArray();
}

// Obtener un jugador por ID
export async function getJugadorById(id) {
  await client.connect();
  return collection.findOne({ _id: new ObjectId(id), eliminado: { $ne: true } });
}

// Guardar un nuevo jugador
export async function guardarJugador(jugador) {
  await client.connect();
  jugador.eliminado = false;
  const result = await collection.insertOne(jugador);
  return { _id: result.insertedId, ...jugador };
}

// Añadir o reemplazar juegos favoritos de un jugador
export async function actualizarJuegosFavoritos(idJugador, juegosIds) {
  await client.connect();

  // Normaliza el input y filtra vacíos
  const juegosArray = Array.isArray(juegosIds) ? juegosIds : (juegosIds ? [juegosIds] : []);
  const juegosObjectIds = juegosArray.filter(Boolean).map(id => new ObjectId(id));

  if (juegosObjectIds.length === 0) {
    
    const jugador = await collection.findOne(
      { _id: new ObjectId(idJugador) },
      { projection: { juegos: 1 } }
    );
    return { _id: idJugador, juegos: jugador?.juegos ?? [] };
  }

  // Agrega sin repetir y sin borrar lo que ya estaba
  await collection.updateOne(
    { _id: new ObjectId(idJugador) },
    { $addToSet: { juegos: { $each: juegosObjectIds } } }
  );

  // Devuelve el array resultante
  const jugador = await collection.findOne(
    { _id: new ObjectId(idJugador) },
    { projection: { juegos: 1 } }
  );
  return { _id: idJugador, juegos: jugador?.juegos ?? [] };
}


// Editar un jugador (actualiza todos los campos recibidos)
export async function editarJugador(jugador) {
  await client.connect();
  const { _id, ...campos } = jugador;

  await collection.updateOne(
    { _id: new ObjectId(_id) },
    { $set: campos }
  );

  return { _id, ...campos };
}

// Borrar jugador 
export async function borrarJugador(id) {
  await client.connect();
  await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { eliminado: true } }
  );
  return { _id: id, eliminado: true };
}
