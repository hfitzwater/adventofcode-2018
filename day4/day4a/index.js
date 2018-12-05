const fs = require('fs');
const BigBrother = require('../BigBrother');

let input = fs.readFileSync('../input.txt').toString();

let bb = new BigBrother( input.split('\n') );

let guards = Object.keys( bb.guardLog ).map( key => {
    return {
        guardId: key,
        sleepingTime: bb.guardLog[key].sleepingTime,
        hours: bb.guardLog[key].hours
    };
}).sort((a,b) => {
    return b.sleepingTime - a.sleepingTime;
});

let primeHour = guards[0].hours.indexOf( Math.max( ...guards[0].hours ) );

console.log( guards[0].guardId * primeHour );