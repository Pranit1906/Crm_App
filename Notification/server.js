require("./CronsJob/crons")
const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const route = require("./Routes/notifi.routes");
const dbConfig = require('./Configs/db.configs');
const app = express();
const serverConfig = require('./Configs/server');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

mongoose.connect(dbConfig.db_URL, { family: 4 }, (err) => {
    if (err) {
        console.log('Error Occurred')
    } else {
        console.log('Connected to DB');
        app.listen(serverConfig.PORT, () => {
            console.log(`App is listening at port ${serverConfig.PORT}`)
        })
        app.use('/', route);
    }

})