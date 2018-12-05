const MATCHES = {
    a: 'A',
    A: 'a',
    b: 'B',
    B: 'b',
    c: 'C',
    C: 'c',
    d: 'D',
    D: 'd',
    e: 'E',
    E: 'e',
    f: 'F',
    F: 'f',
    g: 'G',
    G: 'g',
    h: 'H',
    H: 'h',
    i: 'I',
    I: 'i',
    j: 'J',
    J: 'j',
    k: 'K',
    K: 'k',
    l: 'L',
    L: 'l',
    m: 'M',
    M: 'm',
    n: 'N',
    N: 'n',
    o: 'O',
    O: 'o',
    p: 'P',
    P: 'p',
    q: 'Q',
    Q: 'q',
    r: 'R',
    R: 'r',
    s: 'S',
    S: 's',
    t: 'T',
    T: 't',
    u: 'U',
    U: 'u',
    v: 'V',
    V: 'v',
    w: 'W',
    W: 'w',
    x: 'X',
    X: 'x',
    y: 'Y',
    Y: 'y',
    z: 'Z',
    Z: 'z'
};

class Polymer {
    constructor( strand, reduce=false ) {
        if( !reduce ) {
            let result = this.processStrand( strand.split('') );
            console.log( result.length );
        } else {
            let lengths = [];

            for(let i=0; i<Object.keys(MATCHES).length; i+=2) {
                let keys = Object.keys(MATCHES);

                let targetLower = MATCHES[keys[i]];
                let targetUpper = MATCHES[keys[i+1]];

                let st = `${strand}`;

                let pre = this.preprocessStrand( st, targetLower, targetUpper );

                lengths.push(this.processStrand( pre ).length);
            }

            console.log( Math.min(...lengths) );
        }
    }

    preprocessStrand( strand, lower, upper ) {
        let index1 = strand.indexOf( `${lower}` );
        while( index1 !== -1 ) {
            strand = strand.split( `${lower}` ).join('');

            index1 = strand.indexOf( `${lower}` );
        }

        let index2 = strand.indexOf( `${upper}` );
        while( index2 !== -1 ) {
            strand = strand.split( `${upper}` ).join('');

            index2 = strand.indexOf( `${upper}` );
        }

        return strand.split('');
    }

    processStrand( strand ) {
        let index = this.findPolarity( strand );

        while( index !== null && index !== undefined ) {
            strand.splice( index, 2 );

            index = this.findPolarity( strand );
        }

        let out = {
            strand: strand.join(''),
            length: strand.length
        };

        return out;
    }

    findPolarity( strand ) {
        for( let i=0; i<strand.length; i++ ) {
            if( strand[i] === MATCHES[strand[i+1]] ) {
                return i;
            }
        }

        return null;
    }
}

module.exports = Polymer;