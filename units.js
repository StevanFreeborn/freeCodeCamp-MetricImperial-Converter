const units = {
    gal: {
        name: 'gallons',
        returnUnit: 'L'
    },
    L: {
        name: 'liters',
        returnUnit: 'gal'
    },
    mi: {
        name: 'miles',
        returnUnit: 'km'
    },
    km: {
        name: 'kilometers',
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