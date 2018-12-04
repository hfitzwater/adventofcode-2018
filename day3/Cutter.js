const fs = require('fs');

class Cutter {
    constructor( cmds ) {
        this.fabric = this.initFabric(1000);
        
        this.twoOrGreater = 0;
        this.noOverlap = null;

        this.cuts = cmds.map( c => {
            return this.normalize(c);
        });

        this.process( this.cuts );
    }

    initFabric( length ) {
        let fabric = new Array(length);
        for(let i=0; i<fabric.length; i++) {
            fabric[i] = new Array(length).fill(0);
        }

        return fabric;
    }

    normalize( cmd ) {
        let parts = cmd.split(' ');

        let offsetY = parts[2].split(',')[1];
        offsetY = offsetY.substring(0, offsetY.length-1);

        return {
            raw: cmd,
            id: parts[0].substring(1),
            offset: {
                x: Number(parts[2].split(',')[0]),
                y: Number(offsetY)
            },
            size: {
                x: Number(parts[3].split('x')[0]),
                y: Number(parts[3].split('x')[1])
            }
        };
    }

    process( cuts ) {
        cuts.forEach( cut => {
            let xStart = cut.offset.x;
            let xEnd = cut.offset.x + cut.size.x;

            let yStart = cut.offset.y;
            let yEnd = cut.offset.y + cut.size.y;

            for( let x=xStart; x<xEnd; x++ ) {
                for( let y=yStart; y<yEnd; y++ ) {
                    this.fabric[x][y]++;

                    if( this.fabric[x][y] === 2 ) {
                        this.twoOrGreater++;
                    }

                    if( this.fabric[x][y] >= 2 ) {
                        cut.overlap = true;
                    }
                }
            }
        });    

        let potentialNonOverlap = cuts.filter( cut => {
            if( !cut.overlap ) {
                return true;
            }
            return false;
        })


        let non = potentialNonOverlap.filter( cut => {
            return this.doesOverlap( cut ); 
        });

        this.nonOverlap = non[0];
    }

    doesOverlap( cut ) {
        let xStart = cut.offset.x;
        let xEnd = cut.offset.x + cut.size.x;

        let yStart = cut.offset.y;
        let yEnd = cut.offset.y + cut.size.y;

        for( let x=xStart; x<xEnd; x++ ) {
            for( let y=yStart; y<yEnd; y++ ) {
                if( this.fabric[x][y] >= 2 ) {
                    return false;
                }
            }
        }

        return true;
    }
}

module.exports = Cutter;