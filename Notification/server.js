require("./CronsJob/crons")
const mongoose = require("mongoose");
const express = require('express');
const bodyParser = require('body-parser');
const route = require("./Routes/notifi.routes")
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost/notification', { family: 4 }, (err) => {
    if (err) {
        console.log('Error Occurred')
    } else {
        console.log('Connected to DB');
        app.listen(port, () => {
            console.log(`App is listening at port ${port}`)
        })
        app.use('/', route);
    }

})