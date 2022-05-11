const units = {
    gal: {
        name: 'gallon',
        returnUnit: 'l'
    },
    l: {
        name: 'liter',
        returnUnit: 'gal'
    },
    mi: {
        name: 'miles',
        returnUnit: 'km'
    },
    km: {
        name: 'kilometer',
        returnUnit: 'mi'
    },
    lbs: {
        name: 'pounds',
        returnUnit: 'kg'
    },
    kg: {
        name: 'kilograms',
        returnUnit: 'lbs'
    }
}

module.exports = units;