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


module.exports = router;