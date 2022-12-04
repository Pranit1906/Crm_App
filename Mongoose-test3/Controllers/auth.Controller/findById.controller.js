const User = require('../../Models/user.model')
const objectConverter = require('../../Utilis/objectConverter')

exports.findById = async(req, res) => {
    const userId = req.params.userId;
    try {
        const users = await User.find({
            userId: userId
        }).exec()
        res.status(200).send(objectConverter.userResponse(users))
    } catch (err) {
        res.status(500).send({
            message: `User with id ${userId} not Found`
        })
    }
}