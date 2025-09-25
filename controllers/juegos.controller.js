import * as service from "../services/juegos.service.js";
import * as views from "../views/juegos.views.js";

// Listar juegos (con filtros si vienen en query)
export function getJuegos(req, res) {
  // vamos a tener filtros desde query  para nombre, categoria, editorial y precioMax.
  // filtros sanitizados
  const filtros = {
    nombre: req.query.nombre && req.query.nombre.trim() !== "" ? req.query.nombre : undefined,
    categoria: req.query.categoria && req.query.categoria.trim() !== "" ? req.query.categoria : undefined,
    editorial: req.query.editorial && req.query.editorial.trim() !== "" ? req.query.editorial : undefined,
    precioMax: req.query.precioMax && req.query.precioMax !== "" ? Number(req.query.precioMax) : undefined
  };

  service.getJuegos(filtros).then((juegos) => {
    res.send(views.createJuegosListPage(juegos, req.query));
  }).catch(err => {
    console.error("Error obteniendo juegos:", err);
    res.send(views.errorPage());
  });
}

// Ver un juego por su ID
export function getJuegoById(req, res) {
  const id = req.params.id;
  service.getJuegoById(id).then((juego) => {
    if (juego) {
      res.send(views.createDetailPage(juego));
    } else {
      res.send(views.errorPage());
    }
  }).catch(err => {
    console.error("Error obteniendo juego:", err);
    res.send(views.errorPage());
  });
}

// Mostrar formulario para nuevo juego
export function formularioNuevoJuego(req, res) {
  res.send(views.formularioNuevoJuego());
}

// Guardar nuevo juego
export function guardarJuego(req, res){
  const juego = {
    nombre: req.body.nombre,
    editorial: req.body.editorial,
    precio: req.body.precio,
    year: req.body.year,
    categoria: req.body.categoria,
    imagen: req.body.imagen // aquí guardamos URL de la imagen
  };

  service.guardarJuego(juego)
    .then( juegoGuardado => res.send( views.createDetailPage(juegoGuardado) ) )
    .catch(err => {
      console.error("Error guardando juego:", err);
      res.send(views.errorPage());
    });
}

// Formulario de edición
export function formularioEditarJuego(req, res){
  const id = req.params.id;
  return service.getJuegoById(id)
    .then( juego => res.send( views.formularioEditarJuego(juego) ))
    .catch(err => {
      console.error("Error cargando formulario de edición:", err);
      res.send(views.errorPage());
    });
}

export function editarJuego(req, res) {
  const id = req.params.id; // el id viene de la URL

  // el objeto recibe también la imagen desde el formulario
  const juego = {
    _id: id,
    nombre: req.body.nombre,
    editorial: req.body.editorial,
    precio: req.body.precio,
    year: req.body.year,
    categoria: req.body.categoria,
    imagen: req.body.imagen
  };

  service.editarJuego(juego)
    .then(juegoEditado => res.send(views.createDetailPage(juegoEditado)))
    .catch(err => {
      console.error("Error editando juego:", err);
      res.send(views.errorPage());
    });
}


// Formulario de borrado
export function formularioBorrarJuego(req, res){
  const id = req.params.id;
  service.getJuegoById(id)
    .then( (juego) => res.send(views.formularioBorrarJuego(juego)) )
    .catch(err => {
      console.error("Error cargando formulario de borrado:", err);
      res.send(views.errorPage());
    });
}

// Borrar juego
export function borrarJuego(req, res){
  const id = req.params.id;
  service.borrarJuego(id)
    .then(() => res.send( views.borrarExito(id) ))
    .catch(err => {
      console.error("Error borrando juego:", err);
      res.send(views.errorPage());
    });
}
