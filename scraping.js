var express = require('express');
var app = express();

const axios = require('axios');
const cheerio = require('cheerio');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({extended: false}));

async function cheerioExample(pagina) {
    let contaminantes='';
    let riesgo='';
    const pageContent = await axios.get(pagina);
    const $ = cheerio.load(pageContent.data);
    const indice = $('#basedatoscalidadaire_col_uno').find('#renglondosdatoscalidadaireahora');
    let dato1 = $('#basedatoscalidadaire_col_uno').find('#renglontresdatoscalidadaireahora').each((i, el) =>{
      switch (i) {
        case 1:
          contaminantes = $(el).text();
          break;
        case 2:
          riesgo = $(el).text();
          break;
      }
    })

    const calidad = $('#basedatoscalidadaire_col_dos').find('#renglondosdatoscalidadaireahora');
    const contaminante = $('#basedatoscalidadaire_col_dos').find('#renglontresdatoscalidadaireahora');
    const indice1 = $('#basedatoscalidadaire_col_dos').find('#rengloncuatrodatoscalidadaireahora');
    const estacion = $('#basedatoscalidadaire_col_dos').find('#rengloncincodatoscalidadaireahora');

    const hora = $('#calidadairehora');
    const temperatura = $('#calidadairetemperaturaahora');
    const fecha = $('#calidadairefechaahora');


    const hor = hora.text().trim();
    const tempe = temperatura.text().trim();
    const fec = fecha.text().trim().replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g,' ');
    const ind= indice.text().trim().replace('Índice AIRE Y SALUD: ','').replace(' ●','');
    const conta = contaminantes.replace('Contaminante(s): ','');
    const ries = riesgo.replace('Riesgo: ','');
    const cali = calidad.text().trim().replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g,' ').replace('Calidad del aire: ','').replace(' ●','');
    const conta2 = contaminante.text().trim().replace(/(\r\n|\n|\r)/gm, '').replace(/\s+/g,' ').replace('Contaminante: ','');
    const indi = indice1.text().trim().replace('Índice:','');
    const est = estacion.text().trim().replace('Estación: ','');
    return {hor, tempe, fec, ind, conta, ries, cali, conta2, indi, est}
}


app.get("/scraping", async function (req, res) {

    var pag = req.body.pagina;

    console.log(pag);

    var ran = await cheerioExample(pag);

    res.json(ran);

});

app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
