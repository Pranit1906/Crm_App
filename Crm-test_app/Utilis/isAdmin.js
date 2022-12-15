const { userType } = require('./constant')
const User = require("../Models/user.model")

exports.isAdmin = async(req, res, next) => {
    const user = await User.findOne({
            userId: req.params.userId
        })
        // console.log(user)
    if (user && user.userType == userType.admin) {
        next();
    } else {
        return res.status(403).send({
            message: "Admin is Required"
        })
    }
}