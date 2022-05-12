const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {

    test('Test GET /api/convert with valid input', (done) => {

        const input = '10L';

        chai.request(server)
        .get(`/api/convert?input=${input}`)
        .end((err, res) => {
            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.text, '{"initNum":10,"initUnit":"L","returnNum":2.64172,"returnUnit":"gal","string":"10 liters converts to 2.64172 gallons"}')

        });

        done();``

    });

    test('Test GET /api/convert with invalid unit', (done) => {

        const input = '32g';

        chai.request(server)
        .get(`/api/convert?input=${input}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, "invalid unit")

        });

        done();

    });

    test('Test GET /api/convert with invalid number', (done) => {

        const input = '3/7.2/4kg';

        chai.request(server)
        .get(`/api/convert?input=${input}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, "invalid number")

        });

        done();

    });

    test('Test GET /api/convert with invalid unit and number', (done) => {

        const input = '3/7.2/4kilomegagram';

        chai.request(server)
        .get(`/api/convert?input=${input}`)
        .end((err, res) => {

            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'text/html');
            assert.equal(res.text, "invalid number and unit")

        });

        done();

    });

    test('Test GET /api/convert with no number', (done) => {

        const input = 'kg';

        chai.request(server)
        .get(`/api/convert?input=${input}`)
        .end((err, res) => {
            if (err) console.log(err);

            assert.equal(res.status, 200);
            assert.equal(res.type, 'application/json');
            assert.equal(res.text, '{"initNum":1,"initUnit":"kg","returnNum":2.20462,"returnUnit":"lbs","string":"1 kilograms converts to 2.20462 pounds"}')

        });

        done();

    });

});