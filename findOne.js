const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

async function findOneListingByName(client, propertyName) {
    const result = await client.db("FirstMongoDB").collection("Test Mongo").findOne({name: propertyName});
    if (result) {
        console.log(`Found a listing in the collection with the name '${propertyName}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${propertyName}'`);
    }
}

async function main(){

    const uri = "mongodb+srv://dbUser:12345678910@cluster0.1au0m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

    const client = new MongoClient(uri, {useUnifiedTopology: true});

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        await findOneListingByName(client,'alumno1');

    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}

main().catch(console.error);
