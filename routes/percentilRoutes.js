const { Router } = require('express');
const { check } = require('express-validator');
const { deletePercentil, crearPercentil, editarPercentil } = require('../controllers/percentilController');
const router = Router();

const { validarCampos } = require('../middlewares/validar-campos');


router.post('/new', [check('weight', 'indica el peso').notEmpty(), check('height', 'la altura es obligatoria').notEmpty(), check('headDiameter', 'El diametro creaneal es obligatorio').notEmpty(), validarCampos], crearPercentil);

router.patch('/update/:id', [check('weight', 'indica el peso').notEmpty(), check('height', 'la altura es obligatoria').notEmpty(), check('headDiameter', 'El diametro creaneal es obligatorio').notEmpty(), validarCampos], editarPercentil);

router.post('/delete', deletePercentil);

module.exports = router;