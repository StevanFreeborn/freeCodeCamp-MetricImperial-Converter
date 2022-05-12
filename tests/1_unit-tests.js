const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');
const Units = require('../units');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function () {

    suite('Function convertHandler.getNum(input)', () =>{

        test('1. Whole number input', (done) => {

            const input = '32L';
            assert.equal(convertHandler.getNum(input), 32);

            done();

        })

        test('2. Decimal number input', (done) => {

            const input = '3.2L';
            assert.equal(convertHandler.getNum(input), 3.2);

            done();

        })

        test('3. Fractional input', (done) => {

            const input = '3/2L';
            assert.equal(convertHandler.getNum(input), 1.5);

            done();

        })

        test('4. Fraction input with decimal', (done) => {

            const input = '3/2.5L';
            assert.equal(convertHandler.getNum(input), 1.2);
            
            done();

        })

        test('5. Double fraction input', (done) => {

            const input = '3/2/5L';
            assert.equal(convertHandler.getNum(input), "invalid number");

            done();

        })

        test('6. No numerical input', (done) => {

            const input = 'L';
            assert.equal(convertHandler.getNum(input), 1);
            
            done();
        })

    });

    suite('Function convertHandler.getUnit(input)', () => {

        test('7. Read each valid input unit', (done) => {

            const validUnits = Object.keys(Units);

            validUnits.forEach(unit => {
                assert.equal(convertHandler.getUnit(`32${unit}`), unit);
            });

            done();
        })

        test('8. Invalid input unit', (done) => {

            const input = '3.2abc';
            assert.equal(convertHandler.getUnit(input), "invalid unit");

            done();

        })

    });

    suite('Function convertHandler.getReturnUnit(input)', () => {

        test('9. Return correct return unit', (done) => {

            const units = Object.keys(Units);

            units.forEach(unit => {
                assert.equal(convertHandler.getReturnUnit(unit), Units[unit].returnUnit);
            });

            done();

        });
    });

    suite('Function convertHandler.spellOutUnit(input)', () => {

        test('10. Spell out unit', (done) => {

            const units = Object.keys(Units);

            units.forEach(unit => {
                assert.equal(convertHandler.spellOutUnit(unit), Units[unit].name);
            });

            done();

        })

    });

    suite('Function convertHandler.convert(initNum, initUnit)', () => {

        test('11. Convert gal to L', (done) => {

            const initNum = 1;
            const initUnit = 'gal';
            assert.equal(convertHandler.convert(initNum, initUnit), 3.78541);

            done();

        });

        test('12. Convert l to gal', (done) => {

            const initNum = 3.78541;
            const initUnit = 'L';
            assert.equal(convertHandler.convert(initNum, initUnit), 1);

            done();

        });

        test('13. Convert mi to km', (done) => {

            const initNum = 1;
            const initUnit = 'mi';
            assert.equal(convertHandler.convert(initNum, initUnit), 1.60934);

            done();

        });

        test('14. Convert km to mi', (done) => {

            const initNum = 1.60934;
            const initUnit = 'km';
            assert.equal(convertHandler.convert(initNum, initUnit), 1);

            done();

        });

        test('15. Convert lbs to kg', (done) => {

            const initNum = 1;
            const initUnit = 'lbs';
            assert.equal(convertHandler.convert(initNum, initUnit), 0.45359);

            done();

        });

        test('16. Convert kg to lbs', (done) => {

            const initNum = 0.453592;
            const initUnit = 'kg';
            assert.equal(convertHandler.convert(initNum, initUnit), 1);

            done();

        });

    });

});