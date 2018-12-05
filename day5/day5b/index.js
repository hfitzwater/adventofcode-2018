const fs = require('fs');
const Polymer = require('../Polymer');

let input = fs.readFileSync( '../input.txt' ).toString();

let p = new Polymer( input, true );