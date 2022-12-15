const jwt = require("jsonwebtoken")
const config = require('../Configs/config')

exports.tokenValidation = async(req, res, next) => {
    const authHeader = req.headers['authorization']
        // console.log(authHeader)
    const token = authHeader && authHeader.split(' ')[1]
        // const token = req.headers['authorization'].split('')[1];
        // console.log(token)
    if (!token) {
        return res.status(403).send({
            message: "Token Not Found"
        })

    }
    jwt.verify(token, config.secret, (err, decode) => {
        // console.log(config.secret)
        // console.log(err)
        if (err) {
            return res.status(401).send({
                message: "Unauthorized!"
            })
        }
        req.userId = decode.id;
        // console.log(req.userId)
        next()
    })
}