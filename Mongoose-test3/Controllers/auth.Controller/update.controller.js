const User = require('../../Models/user.model')


exports.update = async(req, res) => {
    const userId = req.params.userId;
    try {
        const users = await User.findOneAndUpdate({
            userId: userId
        }, {
            userName: req.body.userName,
            userStatus: req.body.userStatus,
            userType: req.body.userType
        }).exec();
        res.status(200).send({
            message: 'User record updated successfully'
        })
    } catch (err) {
        res.status(500).send({
            message: 'Some Error Occurred'
        });
    }

}