
class FreqAnalyzer {
    
    constructor( input ) {
        this.freqs = input;
        this.active = 0;
        this.log = [0];

        input.reduce( (prev, curr) => {
            return this.computeNext( prev, curr );
        }, 0 );
    }

    computeNext( current, freq ) {
        let next = current;

        let op = freq[0];
        let num = freq.substring(1);

        if( op === '-' ) {
            next -= Number(num);
        } else {
            next += Number(num);
        }

        this.log.push( next );

        return next;
    }

    calibrate() {
        let memo = [0];
        let active = 0;
        let calibration = null;

        return new Promise((res, rej) => {
            while( !calibration ) {
                for( let i=0; i<this.freqs.length; i++ ) {
                    let f = this.freqs[i];

                    let next = this.computeNext( active, f );

                    if( memo.includes(next) ) {
                        calibration = next;
                        break;
                    }

                    memo.push( next );

                    active = next;
                }
            }

            return res( calibration );
        });
    }
}

module.exports = FreqAnalyzer;