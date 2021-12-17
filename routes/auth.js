const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { crearUsuario, loginUsuario, revalidarToken, userChangePasswordReset, updatePassword, findParentChild, findParentId, userPasswordReset } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/new',
    [
        check('name', 'El nombre es obligatorio').notEmpty(),

        check('email', 'El email es obligatorio').isEmail(),

        check('password', 'El pass es obligatorio').notEmpty(),

        check('cellphone', 'El cel es obligatorio').isNumeric().notEmpty(),

        check('documentIdentity', 'El DNI ingresado ya esta registrado').isNumeric().notEmpty(),

        validarCampos
    ],
    crearUsuario);

router.get("/findchildren/", findParentChild);
router.get("/findparentid/:id", findParentId);
router.post('/login', [check('email', 'El mail es obligatorio').isEmail(),check('password', 'el pasword es obligatorio').notEmpty(), validarCampos], loginUsuario);
router.get('/renew', revalidarToken);

router.post('/resetpassword', userPasswordReset);
router.post('/resetcode', userChangePasswordReset);
router.patch('/updatepassword', updatePassword);

module.exports = router;
