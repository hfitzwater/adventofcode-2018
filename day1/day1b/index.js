
const freqs = require('../freq');
const freqAnalyzer = require('../freqAnalyzer');

let analyzer = new freqAnalyzer( freqs );

analyzer.calibrate()
    .then( calibration => {
        console.log( calibration );
    });