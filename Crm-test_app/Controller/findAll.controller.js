const User = require('../../Models/user.model')
const objectConverter = require('../../Utilis/objectConverter')

var users;

exports.findAll = async(req, res) => {
    let userTypeReq = req.query.userTypeReq;
    let userStatusReq = req.query.userStatusReq;
    let userNamReq = req.query.namReq

    if (userNamReq) {
        try {
            users = await User.find({
                userName: userNamReq
            }).exec(); // using exec executes the query requested and return promise which gives us an array 
            //exec() The exec() method executes a search for a match in a specified string 
            //and returns a result array, or null.
        } catch (err) {
            res.status(500).send({
                message: 'Some Error Occurred'
            })
        }
    } else if (userTypeReq & userStatusReq) {
        try {
            users = await User.find({
                userType: userTypeReq,
                userStatus: userStatusReq
            }).exec();
        } catch (err) {
            res.status(500).send({
                message: 'Some Error Occurred'
            })
        }
    } else if (userTypeReq) {
        try {
            users = await User.find({
                userType: userTypeReq
            }).exec();
        } catch (err) {
            res.status(500).send({
                message: 'Some Error Occurred'
            })
        }
    } else if (userStatusReq) {
        try {
            users = await User.find({
                userStatus: userStatusReq
            }).exec();
        } catch (err) {
            res.status(500).send({
                message: 'Some Error Occurred'
            })
        }
    } else {
        try {
            users = await User.find().exec();
        } catch (err) {
            res.status(500).send({
                message: "Some Error Occurred"
            })
        }
    }
    if (users) {
        res.status(200).send(objectConverter.userResponse(users))
    } else {
        res.status(200).send({
            message: `User with Id ${userIdReq} not present`
        })
    }
}