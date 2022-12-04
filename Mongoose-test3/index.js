//parse in javascript:-https://developer.mozilla.org/en-US/docs/Glossary/Parse

const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const router = require("../Mongoose-test3/Routes/auth.routes")

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
mongoose.connect("mongodb://localhost/demodb7", { family: 4 }, (err) => {
        if (err) {
            console.log("Error Occured")
        } else {
            console.log("Connected to Db")

            app.listen(port, () => {
                console.log(`App listening at //localhost:-${port}`)
            })
            app.use("/", router)
        }
    })
    /* 
     Use to push code in github
      git commit -m "initial commit"
       git push origin main
       */