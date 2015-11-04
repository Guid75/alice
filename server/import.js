'use strict';

const express = require('express');
const router = express.Router();
const models = require('./models');
const expressCsv = require('express-csv-middleware');

router.use(expressCsv({}, {
    delimiter: ';'
}));

router.post('/api/v1/import/students', (req, res) => {
    models.importStudentsFromCsvParsedArray(req.body, req.query.formation)
    .then((data) => {
        res.send(data);
    }, (err) => {

    });
});

module.exports = router;
