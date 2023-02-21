const { userType } = require('./constants')
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
            //403 is a client is forbidden from accessing a valid URL.
            message: "Admin is Required"
        })
    }
}