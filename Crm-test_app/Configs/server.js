if (process.env.NODE_ENV !== 'production') { // for NODE_ENV to work we set node as ENV in jest as shown below
    // "test": "jest --testEnvironment=node --runInBand --detectOpenHandles --coverage./tests",
    require("dotenv").config();
}

module.exports = {
    PORT: process.env.PORT
}