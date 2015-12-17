/**
 * Created by giles on 15/12/2015.
 */
module.exports = {
    getUser: function (req, res) {
        return res.json({id: req.user.id, username: req.user.username});
    }

}