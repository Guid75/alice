var express = require('express');
var expect = require('chai').expect;
var models = require('../../../server/models');
var request = require('supertest-as-promised');
var mongoose = require('mongoose');
var exec = require('child_process').exec;

var app = express();
app.use(models);

mongoose.connect('mongodb://localhost/alice-api-test', function (err) {
    if (err) {
        console.error(err);
        throw err;
    }

    // create a fake students collection
    child = exec("mongoimport students.json --drop --host=0.0.0.0 -c students --jsonArray -d alice-api-test", {
        cwd: __dirname
    }, function (error, stdout, stderr) {
        if (error !== null) {
            console.error('exec error: ' + error);
        }
    });
});

describe('Students', function () {
    it('get all students', function () {
        return request(app)
        .get('/api/v1/students')
        .expect(200)
        .then(function (res) {
            expect(res.body.length).to.equal(2);
            console.log(res.body);
        });
    });
});
