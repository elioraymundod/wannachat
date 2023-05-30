const preferencias = require('../Models/Preferencias');
const express = require('express');
const router = express.Router();

router.post('/preferencias', (req, res) => {
    preferencias.insertPreferencia(req.body)
        .then(user => {
            res.status(200).send({
                mesage: 'Se creo la preferencia correctamente'
            });
        })
        .catch(err => {
            console.error(err);
            res.status(500).send({
                mesage: 'Error al crear una preferencia'
            });
        });
});


router.get('/get/preferencias/:user', (req, res) => {
    preferencias.getPreferencias(req.params.user)
        .then(preferencias => {
            res.status(200).send(preferencias);
        })
        .catch(err => {
            console.error(err);
            res.status(404).send({
                mesage: 'Error al obtener datos'
            });
        });

});


module.exports = router;