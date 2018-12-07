const fs = require('fs');
const Chronal = require('../Chronal');

let input = fs.readFileSync( '../input.txt' ).toString();

let chron = new Chronal( input.split('\n') );

console.log( chron.getSafeRegionSize() );