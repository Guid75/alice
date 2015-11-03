const express = require('express');
const expect = require('chai').expect;
const models = require('../../../server/models');
const request = require('supertest-as-promised');
const mongoose = require('mongoose');
const exec = require('child_process').exec;
const bodyParser = require('body-parser');
const importRouter = require('../../../server/import');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(models.router);
app.use(importRouter);

var con = mongoose.connect('mongodb://localhost/alice-api-test', function (err) {
    if (err) {
        console.error(err);
        throw err;
    }
});

mongoose.connection.on('open', function () {
    con.connection.db.dropDatabase();

    // create a fake students collection
    child = exec("mongoimport students.json --drop --host=0.0.0.0 -c students --jsonArray -d alice-api-test", {
        cwd: __dirname
    }, function (error, stdout, stderr) {
        if (error !== null) {
            console.error('exec error: ' + error);
        }
    });
});

// the following command is used to drop a database 'mongo <dbname> --eval "db.dropDatabase()"''

describe('Students', function () {
    it('get all students', function () {
        return request(app)
        .get('/api/v1/students')
        .expect(200)
        .then(function (res) {
        });
    });

    it('should add a student', function () {
        return request(app)
        .post('/api/v1/students')
        .set('Content-Type', 'application/json')
        .send({firstName: 'Donald', lastName: 'Duck'})
        .expect(201)
        .then(function (res) {
            expect(res.body.firstName).to.equal('Donald');
            expect(res.body.lastName).to.equal('Duck');
        });
    });

    it('should import a student CSV text', function () {
        return request(app)
        .post('/api/v1/import/students')
        .set('Content-Type', 'text/csv')
        .send('Guillaume;Denry;1ere Agri\nVincent;Denry;Terminale Horti')
        .expect(200);
    });
});
