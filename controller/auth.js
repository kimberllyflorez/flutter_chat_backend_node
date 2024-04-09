const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const { generateJWT } = require('../helpers/jwt')


const createUser = async (req, res = response) => {


    const { email, password } = req.body;
    try {
        const existEmail = await User.findOne({ email: email });
        if (existEmail) {
            return res.status(400).json({
                ok: false,
                msg: "this email already exist"
            });
        }
        const user = new User(req.body);
        //encript passwords
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        //Generate jwt
        const token = await generateJWT(user.id);

        res.json(
            {
                ok: true,
                msg: "create",
                token: token
            }
        );

    } catch (error) {

        console.log(error)
        res.status(500).json({
            msg: 'error'
        });

    }

}

module.exports = { createUser }