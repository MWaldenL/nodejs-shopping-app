const { User } = require('../models/user');

module.exports = async function(req, res, next) {
    const user = await User.findById(req.user._id)
    if (!user.isSeller) {
        return res.status(403).send('User has no seller privileges');
    }
    next();
}