// Importación de express
import express from 'express';
// Importación de rutas
import JuegosRoute from './routes/juegos.routes.js';
import JuegosApiRoute from './api/routes/juegos.api.routes.js';
import JugadoresRoute from './routes/jugadores.routes.js'; 
import JugadoresApiRoute from './api/routes/jugadores.api.routes.js';


const app = express();
const PORT = 3333;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas

app.use('/api/juegos', JuegosApiRoute);
app.use('/api/jugadores', JugadoresApiRoute);
app.use(JugadoresRoute);
app.use(JuegosRoute);


app.listen(PORT, () => 
  console.log(`Funcionando en: http://localhost:${PORT}/juegos`)
);
