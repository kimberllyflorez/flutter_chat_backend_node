const { Router } = require('express');
const {validateJWT} = require('../middlewares/validate-jwt');
const {getUsers} = require('../controller/users');
const router = Router();



router.get('/', validateJWT, getUsers);
              
module.exports = router;