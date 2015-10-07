var express = require('express');
var expect = require('chai').expect;
var models = require('../../../server/models');
var request = require('supertest-as-promised');
var mongoose = require('mongoose');
var exec = require('child_process').exec;
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(models);

// mongoose.connect('mongodb://localhost/alice-api-test', function (err) {
//     if (err) {
//         console.error(err);
//         throw err;
//     }

    // create a fake students collection
    child = exec("mongoimport timeslots.json --drop --host=0.0.0.0 -c timeslots --jsonArray -d alice-api-test", {
        cwd: __dirname
    }, function (error, stdout, stderr) {
        if (error !== null) {
            console.error('exec error: ' + error);
        }
    });
// });

// the following command is used to drop a database 'mongo <dbname> --eval "db.dropDatabase()"''

describe('Timeslots', function () {
    it('get all timeslots', function () {
        return request(app)
        .get('/api/v1/timeslots')
        .expect(200)
        .then(function (res) {
        });
    });
    it('should add a timeslot', function () {
        return request(app)
        .post('/api/v1/timeslots')
        .set('Content-Type', 'application/json')
        .send({firstDate: '2015-07-15T09:15:10.887Z', lastDate: '2015-07-15T11:15:10.887Z'})
        .expect(201)
        .then(function (res) {
            expect(res.body.firstDate).to.equal('2015-07-15T09:15:10.887Z');
            expect(res.body.lastDate).to.equal('2015-07-15T11:15:10.887Z');
        });
    });
});
