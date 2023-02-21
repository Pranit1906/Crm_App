const User = require('../../Models/user.model')
const objectConverter = require('../../Utilis/objectConverter')

exports.findById = async(req, res) => {
    const userId = req.params.userId;
    try {
        const users = await User.find({
            userId: userId
        }).exec()
        if (users) {
            res.status(200).send(objectConverter.userResponse(users))
        } else {
            res.status(200).send({
                message: `User with id ${userId} not Found`
            })
        }
    } catch (err) {
        res.status(500).send({
            message: `User with id ${userId} not Found`
        })
    }
}