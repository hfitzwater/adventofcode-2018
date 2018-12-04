
class Inventory {
    constructor( ids ) {
        this.ids = ids;
    }

    getChecksum( ...dups ) {
        let sums = dups.map( numDups => {
            return this.ids.reduce( (prev, curr) => {
                return prev + this.sumDups( curr, numDups );
            }, 0 );
        });

        console.log( sums );

        let ret = sums.reduce( (prev, curr) => {
            return prev * curr
        }, 1 );

        return ret;
    }

    sumDups( id, numDups ) {
        let counts = {};

        for(let i=0; i<id.length; i++) {
            let char = id[i];

            if( !counts[char] ) {
                counts[char] = 1;
            } else {
                counts[char] += 1;
            }
        }

        let keys = Object.keys( counts );
        for(let i=0; i<keys.length; i++) {
            let dups = counts[keys[i]];

            if( dups === numDups ) {
                return 1;
            }
        }

        return 0;
    }
}

module.exports = Inventory;