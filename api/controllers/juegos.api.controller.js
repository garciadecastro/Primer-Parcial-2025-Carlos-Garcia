// Importamos el servicio para que nos traiga los datos
import * as services from "../../services/juegos.service.js"


export function getJuegos(req, res){
    services.getJuegos()
        .then ( juegos => res.status(200).json( juegos ))
}



export function getJuegoById(req, res){
    const id = req.params.id
    services.getJuegoById(id)
        .then(juego => {
            if(juego){
                res.status(200).json(juego)
            }else{
                res.status(404).json({ message: "Recurso no encontrado" })
            }
        })
}


// ACÁ VAN A IR LOS CONTROLADORES DE LA API
export function createJuego(req, res) {
  const juego = {
    nombre: req.body.nombre,
    editorial: req.body.editorial,
    precio: req.body.precio,
    year: req.body.year,
    categoria: req.body.categoria
  }

  services.guardarJuego(juego)
    .then((nuevoJuego) => res.status(201).json(nuevoJuego))
    .catch(err => res.status(500).json({ message: err }))
}


export function deleteJuego(req, res){
  const id = req.params.id

  services.borrarJuego(id)
    .then((idBorrado) => 
      res.status(202).json({ message: `el id:${id} se elimino correctamente.` })
    )
    .catch((err) => 
      res.status(500).json({ message: `el id:${id} NO se elimino.` })
    )
}

export function reemplazarJuego(req, res){
  const id = req.params.id
  const juego = {
    id: id,
    nombre: req.body.nombre,
    editorial: req.body.editorial,
    precio: req.body.precio,
    year: req.body.year,
    categoria: req.body.categoria
  }

  services.editarJuego(juego)
    .then(juegoEditado => res.status(202).json(juegoEditado))
    .catch(err => res.status(500).json({ message: "No se pudo actualizar" }))
}

export function actualizarJuego(req, res){
  const id = req.params.id
  const juego = {
    id: id,
    nombre: req.body.nombre,
    editorial: req.body.editorial,
    precio: req.body.precio,
    year: req.body.year,
    categoria: req.body.categoria
  }

  services.actualizarJuego(juego)
    .then(juegoEditado => res.status(202).json(juegoEditado))
    .catch(err => res.status(500).json({ message: "No se pudo actualizar." }))
}
