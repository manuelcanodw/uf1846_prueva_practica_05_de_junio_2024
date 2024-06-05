// empezamos cargando los modulos que vamos a usar
// express:
const express = require('express');
const  {router, departamentos} = require('./router.js');

const app = express();

// indicamos el puerto de la coneccion
const PORT = process.env.PORT || 3001;

// definimos el motor que usaremos para las plantillasº
app.set('view engine', 'ejs');

// configuramos express para poder usar el SELECT
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

// definimos cual es la carpeta que contiene los ficheros estaticos
app.use(express.static('public'));

// indicamos el uso de las rutas del fichero router.js
app.use(router);


app.listen(PORT, () => console.log(`ya estoy conectado en el servidos http://localhost:${PORT}`))
