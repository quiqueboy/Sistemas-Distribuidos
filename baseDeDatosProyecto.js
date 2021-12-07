const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

async function findOneListingByName(client, propertyName) {
    const result = await client.db("sistemasDistribuidos").collection("proyectoFinal").findOne({numeroDeEstacionDeMedicion: propertyName});
    if (result) {
        console.log(`Found a listing in the collection with the name '${propertyName}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${propertyName}'`);
    }
}

async function main(){

    const uri = "mongodb+srv://dbUser:SisDis20221@cluster0.dmzzf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await findOneListingByName(client,5);

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
