const bcrypt = require("bcryptjs")
const userModel = require("../models/user.model")

exports.signup = async(req, res) => {
    const body = req.body;
    let userStatus = body.userStatus;
    const userType = body.userType;
    if (userType == "CUSTOMER") {
        userStatus = "APPROVED";
    } else {
        userStatus = "PENDING";
    }

    const userObj = {
        name: body.name,
        userId: body.userId,
        email: body.email,
        userType: userType,
        userStatus: userStatus,
        password: bcrypt.hashSync(body.password, 8)
    }
    try {
        const userResponse = await userModel.create(userObj);
        //Add data mappers/ data scrubbers in future
        const responseObj = {
            name: userResponse.name,
            userId: userResponse.userId,
            email: userResponse.email,
            userType: userResponse.userType,
            userStatus: userResponse.userStatus,
            createdAt: userResponse.createdAt,
            updatedAt: userResponse.updatedAt
        }
        res.status(201).send(responseObj); //The HTTP 201 Created success status response code indicates that 
    } //the request has succeeded and has led to the creation of a resource.
    catch (error) {
        res.status(500).send({ //The HTTP status code 500 is a generic error response. 
            //It means that the server encountered an unexpected condition that prevented it from fulfilling the request.
            message: 'Failure in signup!'
        });
    }
}

exports.signin = async(req, res) => {
    //retrieve input  from req object
    const body = req.body;
    const userId = body.userId;
    const password = body.password;

    try {
        const user = await userModel.findOne({ userId: userId });

        if (user === null) {
            res.status(400).sen({
                message: "User Not Found!"
            })
        }
        if (userStatus !== 'APPROVED') {
            res.status(200).send({
                message: 'User is not authorized for login '
            })
        }

        var passwordIsValid = bcrypt.compareSync(
            password,
            user.password
        )

        if (!passwordIsValid) {
            res.status(401).send({
                message: 'Invalid Password'
            })
            return;
        }

        var token = jwt.sign({ id: user.userId }, config.secret, {
            expiresIn: 86400 //24 hrs
        });
        res.status(200).send({
            name: user.name,
            userId: user.userId,
            email: user.email,
            userTypes: user.userType,
            userStatus: user.userStatus,
            accessToken: token
        });

    } catch (error) {
        res.status(500).send({
            message: 'Failure in signup!'
        });
    }

}