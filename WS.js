var express = require('express');
var app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

async function findOneListingByName(client, propertyName) {
    const result = await client.db("FirstMongoDB").collection("Test Mongo").findOne({name: propertyName});
    if (result) {
        return result;
    } else {
        return `No listings found with the name '${propertyName}'`;
    }
}

app.get("/workprocess/:strname", async function (req, res) {
    var varname = req.params.strname;

    const uri = "mongodb+srv://dbUser:12345678910@cluster0.1au0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        var ran = await findOneListingByName(client,varname);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }

    let r = ran
    res.json(r);
});

app.listen(3000, function() {
    console.log('Aplicación ejemplo, escuchando el puerto 3000!');
});
