const { Router } = require('express');
const { check } = require('express-validator');
const { eliminarEstudioMedico, editarEstudioMedico, crearEstudioMedico } = require('../controllers/medicalStudyController');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');


router.post('/new', [
    check('date', 'indica la fecha del estudio').notEmpty().isDate(),
    check('name', 'el nombre del estudio es obligatorio').notEmpty(),
    check('description', 'describa el estudio a ser realizado').notEmpty(),
     validarCampos
], crearEstudioMedico);

router.patch('/update/:id',  [
    check('date', 'indica la fecha del estudio').notEmpty().isDate(),
    check('name', 'el nombre del estudio es obligatorio').notEmpty(),
    check('description', 'describa el estudio a ser realizado').notEmpty(),
     validarCampos
], editarEstudioMedico);

router.post('/delete', eliminarEstudioMedico);

module.exports = router;