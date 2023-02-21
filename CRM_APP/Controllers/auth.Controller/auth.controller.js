const User = require('../../Models/user.model')
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
const config = require("../../Configs/config.secret")

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
        //console.log(userObj)
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
        console.log(err);
        return res.status(500).send({
            message: "Failure in signUp!"
        })
    }
}

exports.Login = async(req, res) => {
    const body = req.body;
    const userId = body.userId;
    const password = body.password;
    try {
        const user = await User.findOne({ userId: userId });
        // console.log(user)
        if (user == null) {
            res.status(404).send({
                message: "User Not Found!"
            })
            return;
        }

        if (user.userStatus != "APPROVED") {
            return res.status(200).send({
                message: "User Not Authorized to Login"
            })
        }
        // we have password stored in DB in hashed format
        //verifying pwd we shall receieve pwd in string format

        var validPassword = bcrypt.compareSync( //compareSync will do comparison betwn plain and hashed pwd
                body.password, // this is plain text -> string
                user.password // hashed password  -> string 
            )
            //console.log(validPassword);
        if (!validPassword) {
            res.status(401).send({
                message: "Invalid Password",
                accessToken: null
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
    } catch (err) {
        res.status(500).send({
            message: "Failure in Login!"
        })
    }

}