/*
    db.js file has 3 functions as shown below:-
  1. connect helps creating connections
  2. closeDatabase:- helps in closing database
  3. clearDatabase:- helps in clearing and dropping all documents and collections from database

We need db.js file due to reasons as mentioned below....
1. So to test we need to mock DB, we need to create connections, clear values in DB after every test.
2. Every test will be independent of each other.
3. At the End we need to close connections with DB, we need few funtions.
4. Such DB based related functions will be stored here.

//01:05:00

*/

const mongoose = require('mongoose')
const { MongoMemoryServer } = require('mongodb-memory-server')
let mongodb;
//Connect part
exports.connect = async() => {
    if (!mongodb) {
        mongodb = await MongoMemoryServer.create();
        const uri = mongodb.getUri();
        await mongoose.connect(uri);
    }
}

//Close Database part
exports.closeDatabase = async() => {
    await mongoose.connection.dropCollection();
    await mongoose.connection.close();
    if (mongodb) {
        await mongodb.stop();
    }
}

//Clear Database part

exports.clearDatabase = async() => {
    const collections = mongoose.connection.collections;
    for (let key of collections) {
        let collection = collections[key];
        await collection.deleteMany();
    }
}