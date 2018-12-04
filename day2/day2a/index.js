const ids = require('../ids');
const Inventory = require('../Inventory');

let inv = new Inventory( ids );

console.log( inv.getChecksum(2, 3) );