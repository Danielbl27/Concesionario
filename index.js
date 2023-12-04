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
//Vamos a añadir la base de datos de mongoDB
const mongoDB = require("mongodb");
//Vamos a cambiar el uri string a nuestro puerto
const uri = "mongodb://127.0.0.1:27017";
//Iniciamos la base de datos con nuestra uri
const client = new MongoClient(uri);
//Declaramos variables
let database = undefined;
let listaConcesionarios=undefined;
//Vamos a crear una funcion que haga que el usuario se conecte a la base de datos
async function connectBD(){
//esperamos hasta que se conecte el cliente, si no daria fallo
  await client.conect();
  database=client.db("concesionariosDB");
  listaConcesionarios =database.collection("concesionariosDB");




}


// Lista todos los concesionarios
app.get("/concesionarios",async (req, res) => {
    const cursorConcesionarios= await listaConcesionarios.find({})//al usar asi el find nos listara toda la base de datos
    const concesionarios=await cursorConcesionarios.toArray();
    res.json(concesionarios);
  });

// Añadir un nuevo concesionario
app.post("/concesionarios",async(req, res) => {
    const concesionario = await listaConcesionarios.insertOne(req.body);
    
    res.json({ message: "ok" });
  });
  
// Obtener un concesionario segun su ID
app.get("/concesionarios/:id",async (req, res) => {
    const id = req.params.id;
    const result = await listaConcesionarios.findOne({_id:new ObjectId(id)});
    res.json(result);
  });
  

// Actualizar un concesionario segun su ID
app.put("/concesionarios/:id",async (req, res) => {
    const id = req.params.id;
    concesionarios[id] = req.body;
    const resultado = await listaConcesionarios.updateOne({_id: new ObjectId(concesionarioId)},
    {
      $set:{
        nombre:concesionarioAct["nombre"],
        direccion:concesionarioAct["direccion"],
        coches:concesionarioAct["coches"],
      },
    }
    );
    res.json({ message: "ok" });
  });


// Borrar un concesionario
app.delete("/concesionarios/:id", async (req, res) => {
    const id = req.params.id;
    const concesionario=await listaConcesionarios.deleteOne({_id:new ObjectId(id)})
    res.json({ message: "ok" });
  });

//Obtener todos los cochces de un concesionario
app.get("/concesionarios/:id/coches", (req, res) => {
    const id = req.params.id;
    const coches = concesionarios[id].coches;
    res.json(coches);
  });

//Añadir un coche a un concesionario
app.post("/concesionarios/:id/coches", (req, res) => {
    const id = req.params.id;
    const nuevoCoche = req.body;
    concesionarios[id].coches.push(nuevoCoche);
    res.json({ message: "ok" });
   });

//Obtiene el coche cuyo id sea cocheId, del concesionario pasado por id
app.get("/concesionarios/:id/coches/:cocheId", (req, res) => {
    const id = req.params.id;
    const cocheId = req.params.cocheId;
    const coche = concesionarios[id].coches[cocheId];
    res.json(coche);
   });

//Actualiza el coche cuyo id sea cocheId, del concesionario pasado por id
app.put("/concesionarios/:id/coches/:cocheId", (req, res) => {
    const id = req.params.id;
    const cocheId = req.params.cocheId;
    concesionarios[id].coches[cocheId] = req.body;
    res.json({ message: "ok" });
   });

//Borra el coche cuyo id sea cocheId, del concesionario pasado por id
app.delete("/concesionarios/:id/coches/:cocheId", (req, res) => {
    const id = req.params.id;
    const cocheId = req.params.cocheId;
    concesionarios[id].coches.splice(cocheId, 1);
    res.json({ message: "ok" });
  });