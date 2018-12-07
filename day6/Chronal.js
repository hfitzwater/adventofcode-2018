const shortid = require('shortid');

class Chronal {
    constructor( coords ) {
        this.coords = coords.map( c => {
            let parts = c.split(', ');

            return {
                id: shortid.generate(),
                x: Number( parts[0] ),
                y: Number( parts[1] ),
                locs: []
            };
        });

        let Xes = this.coords.map(c => c.x)
        let Ys = this.coords.map(c => c.y)

        this.min = {
            x: Math.min( ...Xes ),
            y: Math.min( ...Ys )
        };

        this.max = {
            x: Math.max( ...Xes ),
            y: Math.max( ...Ys )
        };

        this.map = this.buildMap();
        this.swaths = this.generateSwaths( this.coords, this.map );
    }

    getSafeRegionSize( maxDistance=10000 ) {
        let size = 0;

        for( let x=this.min.x; x<this.max.x; x++ ) {
            for( let y=this.min.y; y<this.max.y; y++ ) {
                
                let dist = this.coords.reduce((prev, curr) => {
                    return prev + this.distance(curr, {x,y});
                }, 0 );

                if( dist < maxDistance ) {
                    size++;
                }
            }
        }

        return size;
    }

    getFiniteSwaths() {
        return this.swaths.filter( s => {
            let coord = this.coords.find( c => c.id === s.id );

            if( this.isFinite(coord, this.coords, this.map) ) {
                return true;
            }

            return false;
        });
    }

    buildMap() {
        let map = new Array( this.max.x );

        for( let x=this.min.x; x<this.max.x; x++ ) {
            map[x] = [];

            for( let y=this.min.y; y<this.max.y; y++ ) {
                map[x][y] = null;
            }
        }

        return map;
    }

    generateSwaths( coords, map ) {
        let counts = {};

        for( let x=this.min.x; x<this.max.x; x++ ) {
            for( let y=this.min.y; y<this.max.y; y++ ) {
                let closestCoord = this.closestCoord( { x, y }, coords );

                if( !closestCoord ) {
                    map[x][y] = null;

                    continue;
                }

                if( !counts[closestCoord.id] ) {
                    counts[closestCoord.id] = 1;
                } else {
                    counts[closestCoord.id]++;
                }

                map[x][y] = closestCoord.id;
            }
        }

        let result = Object.keys( counts ).map( key => {
            return {
                id: key,
                count: counts[key]
            };
        }).sort((a,b) => {
            return b.count - a.count;
        });

        return result;
    }

    closestCoord( currentLocation, coords ) {
        let measurements = coords.map( c => {
            return {
                coord: c,
                distance: this.distance( currentLocation, c )
            };
        }).sort((a,b) => {
            return a.distance - b.distance;
        });

        if( measurements[0].distance !== measurements[1].distance ) {
            measurements[0].coord.locs.push( currentLocation );
            return measurements[0].coord;
        } else {
            return null;
        }
    }

    isFinite( coord, coords, map ) {
        let Xes = coords.map( c => c.x );
        let Ys = coords.map( c => c.y );

        let min = {
            x: Math.min( ...Xes ),
            y: Math.min( ...Ys )
        };

        let max = {
            x: Math.max( ...Xes ),
            y: Math.max( ...Ys )
        }

        for( let i=0; i<coord.locs.length; i++ ) {
            let loc = coord.locs[i];

            if( loc.x <= min.x || loc.x >= max.x || loc.y <= min.y || loc.y >= max.y ) {
                return false;
            }

            // up
            if( map[loc.y - 1] === undefined ) {
                return false;
            }

            // left
            if( map[loc.x - 1] === undefined ) {
                return false;
            }

            // down
            if( map[loc.y + 1] === undefined ) {
                return false;
            }

            // right
            if( map[loc.x + 1] === undefined ) {
                return false;
            }
        }

        return true;
    }

    distance( a, b ) {
        return Math.abs( b.y - a.y ) + Math.abs( b.x - a.x );
    }
}

module.exports = Chronal;