const { Router } = require('express');
const { check } = require('express-validator')
const { createUser } = require('../controller/auth');
const { login } = require('../controller/login');
const { validarFiles } = require('../middlewares/validate-files');
const { CustomValidation } = require('express-validator/src/context-items');
const { renewToken } = require('../controller/renew-token');
const {validateJWT} = require('../middlewares/validate-jwt');

const router = Router();


router.post('/new', [
    check("name", "name is required").not().isEmpty(),
    check("email", "email required").isEmail(),
    check("password", "minimun 8 characters").not().isEmpty(),
    validarFiles
], createUser);


router.post('/', [
    check("email", "email required").isEmail(),
    check("password", "minimun 8 characters").not().isEmpty(),
    validarFiles

], login);

router.get('/renew', validateJWT, renewToken);
              
module.exports = router;