import { MongoClient, ObjectId } from "mongodb";

// Conexión a Mongo Atlas
const client = new MongoClient("mongodb+srv://admin:admin@hibridas.3sxrdj2.mongodb.net/");
const db = client.db("AH20232CP1");

// Obtener juegos con filtros dinámicos
export async function getJuegos(filter = {}) {
  await client.connect();

  const filterMongo = { eliminado: { $ne: true } };

  if (filter.categoria !== undefined) {
    filterMongo.categoria = { $eq: filter.categoria };
  }

  if (filter.nombre !== undefined) {
    filterMongo.nombre = { $regex: filter.nombre, $options: "i" };
  }

  if (filter.editorial !== undefined) {
    filterMongo.editorial = { $eq: filter.editorial };
  }

  if (filter.precioMax !== undefined) {
    filterMongo.precio = { $lte: Number(filter.precioMax) };
  }

  return db.collection("juegos").find(filterMongo).toArray();
}

// Traer todos los juegos, incluso eliminados
export async function getAllJuegos() {
  await client.connect();
  return db.collection("juegos").find().toArray();
}

// Obtener un juego por su ID
export async function getJuegoById(id) {
  await client.connect();
  return db.collection("juegos").findOne({ _id: new ObjectId(id) });
}

// Guardar un nuevo juego
export async function guardarJuego(juego) {
  await client.connect();
  // Convertimos precio a número antes de guardar
  if (juego.precio !== undefined) {
    juego.precio = Number(juego.precio);
  }

  // Convertimos los años a números y además miramos que no sea anterior a 1900 ni posterior al año actual
  if (juego.year !== undefined) {
    juego.year = Number(juego.year);

    const currentYear = new Date().getFullYear();
    if (isNaN(juego.year) || juego.year < 1900 || juego.year > currentYear) {
      throw new Error(`El año debe ser entre 1900 y ${currentYear}`);
    }
  }

  const result = await db.collection("juegos").insertOne(juego);
  return { _id: result.insertedId, ...juego };
}

// Editar un juego (reemplazo completo de campos)
export async function editarJuego(juego) {
  await client.connect();
  const { _id, ...campos } = juego;

  // Convertimos precio a número antes de actualizar
  if (campos.precio !== undefined) {
    campos.precio = Number(campos.precio);
  }

  // Convertimos año a número y chequeamos que sea razonable
  if (campos.year !== undefined) {
    campos.year = Number(campos.year);

    const currentYear = new Date().getFullYear();
    if (isNaN(campos.year) || campos.year < 1900 || campos.year > currentYear) {
      throw new Error(`El año debe ser entre 1900 y ${currentYear}`);
    }
  }

  await db.collection("juegos").updateOne(
    { _id: new ObjectId(_id) },
    { $set: campos }
  );
  return juego;
}

// Actualizar parcialmente un juego
export async function actualizarJuego(juego) {
  await client.connect();
  const { _id, ...campos } = juego;

  // Convertimos precio a número antes de actualizar
  if (campos.precio !== undefined) {
    campos.precio = Number(campos.precio);
  }

  // Convertimos año a número y chequeamos que sea razonable
   if (campos.year !== undefined) {
    campos.year = Number(campos.year);

    const currentYear = new Date().getFullYear();
    if (isNaN(campos.year) || campos.year < 1900 || campos.year > currentYear) {
      throw new Error(`El año debe ser entre 1900 y ${currentYear}`);
    }
  }

  await db.collection("juegos").updateOne(
    { _id: new ObjectId(_id) },
    { $set: campos }
  );
  return juego;
}

// Marcar un juego como eliminado
export async function borrarJuego(id) {
  await client.connect();
  return db.collection("juegos").updateOne(
    { _id: new ObjectId(id) },
    { $set: { eliminado: true } }
  );
}
