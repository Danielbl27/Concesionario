/**
 * Tres formas de almacenar valores en memoria en javascript:
 *      let: se puede modificar
 *      var: se puede modificar
 *      const: es constante y no se puede modificar
 */

// Importamos las bibliotecas necesarias.
// Concretamente el framework express.
const express = require("express");

// Inicializamos la aplicación
const app = express();

// Indicamos que la aplicación puede recibir JSON (API Rest)
app.use(express.json());

// Indicamos el puerto en el que vamos a desplegar la aplicación
const port = process.env.PORT || 8080;

// Arrancamos la aplicación
app.listen(port, () => {
  console.log(`Servidor desplegado en puerto: ${port}`);
});

// Definimos una estructura de datos
// (temporal hasta incorporar una base de datos)
let concesionarios = [
    {
      nombre: "ConcesionarioOpel",
      direccion: "Direccion1",
      coches: [
        { modelo: "Corsa", cv: 100, precio: 15000 },
        { modelo: "Astra", cv: 120, precio: 18000 },
        { modelo: "Mokka", cv: 150, precio: 20000 },
        { modelo: "Zafira", cv: 110, precio: 13000 },
      ],
    },
    {
      nombre: "ConcesionarioSeat",
      direccion: "Direccion2",
      coches: [
        { modelo: "Cordoba", cv: 100, precio: 15000 },
        { modelo: "Ateca", cv: 120, precio: 28000 },
        { modelo: "Tarraco", cv: 150, precio: 10000 },
        { modelo: "Arona", cv: 120, precio: 13000 },
      ],
    },
  
  ];

// Lista todos los concesionarios
app.get("/concesionarios", (req, res) => {
    res.json(concesionarios);
  });

// Añadir un nuevo coche
app.post("/coches", (request, response) => {
  coches.push(request.body);
  response.json({ message: "ok" });
});

// Obtener un solo coche
app.get("/coches/:id", (request, response) => {
  const id = request.params.id;
  const result = coches[id];
  response.json({ result });
});

// Actualizar un solo coche
app.put("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches[id] = request.body;
  response.json({ message: "ok" });
});

// Borrar un elemento del array
app.delete("/coches/:id", (request, response) => {
  const id = request.params.id;
  coches = coches.filter((item) => coches.indexOf(item) !== id);

  response.json({ message: "ok" });
});
