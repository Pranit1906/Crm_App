const User = require('../Models/user.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const config = require("../Configs/config")

exports.signup = async(req, res) => {
    const body = req.body;
    const userType = body.userType;
    let userStatus = body.userStatus;
    if (userType == "CUSTOMER" || userType == "ADMIN") {
        userStatus = "APPROVED";
    } else {
        userStatus = "PENDING";
    }

    const userObj = {
            name: body.name,
            userId: body.userId,
            emailId: body.emailId,
            userType: userType,
            userStatus: userStatus,
            password: bcrypt.hashSync(body.password, 8)
        }
        // console.log(userObj)
    try {
        const userResponse = await User.create(userObj);
        const response = {
            name: userResponse.name,
            userId: userResponse.userId,
            emailId: userResponse.emailId,
            userType: userResponse.userType,
            userStatus: userResponse.userStatus,
            createdAt: userResponse.createdAt,
            updateAt: userResponse.updatedAt
        }
        return res.status(201).send({ response })
    } catch (err) {
        // console.log(err);
        return res.status(500).send({
            message: "Failure in signUp!"
        })
    }
}

exports.Login = async(req, res) => {
        const body = req.body;
        const userId = body.userId;
        const password = body.password;
        // try {
        const user = await User.findOne({ userId: userId });
        // console.log(user)
        if (user == null) {
            res.status(400).send({
                message: "User Not Found!"
            })
            return;
        }

        if (user.userStatus != "APPROVED") {
            res.status(200).send({
                message: "User Not Authorized to Login"
            })
            return;
        }
        var validPassword = bcrypt.compareSync(
                body.password,
                user.password
            )
            // console.log(validPassword);
        if (!validPassword) {
            res.status(401).send({
                message: "Invalid Password"
            })
            return;
        }

        var token = jwt.sign({ id: user.userId }, config.secret, {
            expiresIn: 86400 //24 hrs
        });

        const userResp = {
            name: user.name,
            userId: user.userId,
            emailId: user.emailId,
            userType: user.userType,
            userStatus: user.userStatus,
            accessToken: token
        }

        res.status(200).send(userResp);
    }
    //      catch (err) {
    //         res.status(500).send({
    //             message: "Failure in Login!"
    //         })
    //     }

// }