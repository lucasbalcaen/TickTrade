/**
 * Created by lucas on 6/01/2016.
 */

var IngelogdUser = require('../models/ingelogdeuser.js');

exports.create = function(req,res,userID)
{

    var entry = new IngelogdUser({
        userID: userID
    });

    entry.save();

    //res.redirect('index.html');
};

exports.delete = function(req,res,userID){
    var condition = { userID: userID};
    IngelogdUser.remove(condition,function(err){

    });
};

exports.zoekonoff = function(userID){

    var condition = { userID: userID};

    var query = IngelogdUser.findOne(condition);

    return query.exec(function(err,result){
       return result;
    });

};
