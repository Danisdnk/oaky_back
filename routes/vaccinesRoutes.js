const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createAppliedVaccine, findVaccinesChild, updateVaccine, deleteVaccine } = require('../controllers/vaccinesController');
const { validarCampos } = require('../middlewares/validar-campos');

router.post('/new', createAppliedVaccine);
router.get('/find/:id', findVaccinesChild);
router.patch('/update/:id', updateVaccine);
router.delete('/delete/:id', deleteVaccine)
module.exports = router;
