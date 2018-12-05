const moment = require('moment');

const DATE_FMT = 'YYYY-MM-DD HH:mm';

const ACTION = {
    SLEEP: 'falls',
    WAKE: 'wakes',
    SHIFT_CHANGE: 'Guard'
};

class BigBrother {
    
    constructor( data ) {
        this.data = data.sort((a,b) => {
            let aStr = dateStringFromDatum( a );
            let bStr = dateStringFromDatum( b );

            let aMoment = moment( aStr, DATE_FMT );
            let bMoment = moment( bStr, DATE_FMT );

            if( aMoment.isAfter( bMoment ) ) {
                return 1;
            } else if( aMoment.isBefore( bMoment) ) {
                return -1;
            }

            return 0;
        });

        this.guardLog = this.log( this.data );
    }

    log( data ) {
        let log = {};
        let activeGuardId = null;
        let sleep = null;
        let wake = null;

        data.forEach( datum => {
            let cmd = this.normalize( datum );

            if( cmd.action === ACTION.SHIFT_CHANGE ) {
                activeGuardId = cmd.guardId;

                if( !log[activeGuardId] ) {
                    log[activeGuardId] = {
                        sleepingTime: 0,
                        hours: Array(60).fill(0)
                    };
                }
            } else if( cmd.action === ACTION.SLEEP ) {
                sleep = cmd.mins;
            } else if( cmd.action === ACTION.WAKE ) {
                wake = cmd.mins;

                log[ activeGuardId ].sleepingTime += (wake - sleep);
                for( let t=sleep; t<wake; t++ ) {
                    log[ activeGuardId ].hours[t]++;
                } 
            }
        });

        return log;
    }

    normalize( datum ) {
        let raw = datum;
        let parts = datum.split(' ');

        let action = parts[2];
        let mins = Number(parts[1].substring(3,5));
        
        if( action === ACTION.SHIFT_CHANGE ) {
            return {
                action: action,
                guardId: Number(parts[3].substring(1)),
                raw: raw
            };
        }

        return { action, mins, raw };
    }
}

function dateStringFromDatum( datum ) {
    let parts = datum.split(' ');

    return `${parts[0].substring(1)} ${parts[1].substring(0, parts[1].length-1)}`;
}

module.exports = BigBrother;