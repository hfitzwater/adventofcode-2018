
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

    findFabricById() {
        this.ids.forEach( source => {
            this.ids.forEach( target => {
                let ham = this.hamming(source, target);

                if( ham.distance === 1 ) {
                    let id = source.substring(0, ham.index) + source.substring( ham.index + 1 );
                    console.log( id );
                }
            });
        });
    }

    hamming( source, target ) {
        let length = source.length;

        let distance = 0;
        let index = -1;

        for( let i=0; i<length; i++ ) {
            if( source[i] !== target[i] ) {
                distance += 1;
                index = i;
            }
        }

        return { distance, index };
    }
}

module.exports = Inventory;