const mod = require('../packages');
const rn = mod.rn;

const random = rn({
    min: 1000,
    max: 9999,
    integer: true
});

module.exports = random;