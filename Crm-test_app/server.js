const express = require("express")
const mongoose = require("mongoose")
const serverConfig = require("./Configs/server")
const dbConfig = require("./Configs/dbConfig")
const route = require('./Routes/auth.routes')
const app = express();

mongoose.connect(dbConfig.DB_URL, { family: 4 })
const db = mongoose.connection;

db.on('error', () => {
    console.log('Error in connecting to db')
})

db.once('open', () => {
    console.log("Connection to DB is Successful!", dbConfig.DB_URL)
})

app.use(express.json())

app.use("/", route)

module.exports = app.listen(serverConfig.PORT, () => {
    console.log(`App is listening at port :${serverConfig.PORT}`)
})