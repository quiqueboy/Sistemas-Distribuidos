var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: false}));

app.get("/", async function (req, res) {
    let r = {'dato': 1,'valor': 'Nio'};
    res.json(r);
});

app.get("/ruta1", async function (req, res) {
    let r = {'dato': 1,'valor': 'Nio'};
    res.json(r);
});

app.get("/ruta2:numero", async function (req, res) {
    const ran = Math.floor(Math.random() * (req.params.numero));;
    let r = {'Random': ran};
    res.json(r);
});

app.put('/generasiguiente/:number', (req, res) => {
    let r = {'dato': req.params.number};
    res.json(r);
});

app.get("/ruta3", async function (req, res) {
    let r = {};
    res.json(r);
});

app.get("/ruta4", async function (req, res) {
    let r = {};
    res.json(r);
});

app.get("/ruta5/subruta/todos", async function (req, res) {
    let r = {Entradas: req.body};
    res.json(r);
});

app.get("/ruta6/crear", async function (req, res) {
    let r = {};
    res.json(r);
});

app.get("/ruta7/echo", async function (req, res) {
    let r = { texto: req.query.texto, nombre: req.query.nombre, proyecto:req.query.proyecto};
    res.json(r);
});

app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
