const { Router } = require('express');
const { check } = require('express-validator');
const { crearControlMedico, updateControl, findControlForChild, deleteControl } = require('../controllers/controlController');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');

router.post('/new', [
    check('weight', 'indica el peso').notEmpty(),
    check('height', 'la altura es obligatoria').notEmpty(),
    check('headDiameter', 'El diametro creaneal es obligatorio').notEmpty(),
    validarCampos
], crearControlMedico);
router.get("/findcontrol/:id", findControlForChild);
router.patch('/update/:id', [check('weight', 'indica el peso').notEmpty(), check('height', 'la altura es obligatoria').notEmpty(), check('headDiameter', 'El diametro creaneal es obligatorio').notEmpty(), validarCampos], updateControl);
router.delete('/delete/:id', deleteControl);

module.exports = router;    