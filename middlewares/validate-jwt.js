const { response } = require('express');
const jwt = require('jsonwebtoken');



const validateJWT = (req,res = response,  next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(400).json({
            ok: false,
            res: "unauthorized token",
        });
    }
  
    try {
        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;

        console.log(token);
        next();
    } catch (error) {
       return res.status(401).json({msg: error});
    }


}

module.exports = { validateJWT };