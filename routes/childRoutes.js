const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createChild, updateChild, findChild, deleteChild } = require('../controllers/adminChild');
const { validarCampos } = require('../middlewares/validar-campos');


router.post('/new',
    [
        check('name', 'El nombre es obligatorio')
            .notEmpty(),

        check('sex', 'El nombre es obligatorio')
            .notEmpty(),

        check('bornDate', 'El nombre es obligatorio')
            .notEmpty(),

        check('bloodType', 'El nombre es obligatorio')
            .notEmpty(),

        check('allergies', 'El nombre es obligatorio')
            .notEmpty(),

        validarCampos
    ],
    createChild);
router.get('/findchild/:id', findChild);
router.patch('/update/:id', updateChild);
router.delete('/deletechild/:id', deleteChild)
module.exports = router;