const { response } = require("express");
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')
const User = require('../models/user');

const login = async (req, res = response) => {
    const { email, password } = req.body;
    try {

        const userDB = await User.findOne({ email });


        if (!userDB) {
            return res.sendStatus(400).json(
                {
                    ok: false,
                    msg: "login: user not found",
                });
        }
        const validatePassword = bcrypt.compareSync(password, userDB.password);


        if (!validatePassword) {
            return res.status(400).json(
                {
                    ok: false,
                    msg: "login: password is wrong",
                });
        }
        const token = await generateJWT(userDB.id);
        
            return res.json(
                {
                    ok: true ,
                    msg: "login: success",
                    user: userDB,
                    token: token
                });

        
    } catch (error) {
        return res.status(500).json({
            msg: 'user not found'
        });
    }

}

module.exports = { login }