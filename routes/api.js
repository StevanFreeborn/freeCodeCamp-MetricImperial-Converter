'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {

    let convertHandler = new ConvertHandler();

    app.route('/api/convert').get((req, res) => {

        const input = req.query.input;
        
        const getNumResult = convertHandler.getNum(input);
        const getUnitResult = convertHandler.getUnit(input);
        
        if (getNumResult == 'invalid number' && getUnitResult== 'invalid unit') 
            return res.status(400).send(`${getUnitResult} and ${getNumResult}`);

        if (getNumResult == 'invalid number') 
            return res.status(400).send(getNumResult);

        if (getUnitResult == 'invalid unit') 
            return res.status(400).send(getUnitResult);

        const convertResult = convertHandler.convert(getNumResult, getUnitResult);
        const getReturnUnitResult = convertHandler.getReturnUnit(getUnitResult);
        const getStringResult = convertHandler.getString(getNumResult, getUnitResult, convertResult, getReturnUnitResult);

        res.status(200).json({
            initNum: getNumResult,
            initUnit: getUnitResult,
            returnNum: convertResult,
            returnUnit: getReturnUnitResult,
            string: getStringResult
        })

    });

};