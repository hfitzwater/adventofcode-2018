
const freqs = require('../freq');
const freqAnalyzer = require('../freqAnalyzer');

let analyzer = new freqAnalyzer( freqs );

console.log( analyzer.log[analyzer.log.length-1] );