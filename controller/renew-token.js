const { response } = require('express');
const { generateJWT } = require('../helpers/jwt');
const User = require('../models/user');


const renewToken = async (req, res = response) => {
  const {uid} = req.uid;
  const token = await generateJWT(uid); 
  const userDB = await User.findOne({ uid });
    userDB.token = token;
 
    res.json({
        ok:true,
        uid: req.uid,
        token: userDB.token

    });
}

module.exports = { renewToken }