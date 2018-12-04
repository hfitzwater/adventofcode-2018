const fs = require('fs');
const Cutter = require('../Cutter');

let input = fs.readFileSync( '../input.txt' ).toString();

let cutter = new Cutter( input.split('\n') );

console.log( cutter.nonOverlap.id );