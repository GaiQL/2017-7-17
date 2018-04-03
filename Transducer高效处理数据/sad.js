


function range(from, to, skip){
    const result = [];
    for (let i = from; i < to; i += skip) {
        result.push(i);
    }
    return result;
}
let rangeArr = range(0, 100, 1);


const map = f => reducing => ( result,init ) => reducing( result,f(init) )
const filter = f => reducing => ( result,init ) => f(init) ? reducing( result,init ) : result;


const odd = result => result % 2 !== 0;
const xxx = result => Math.pow( result,2 );
const end = ( result,init ) => result + init;

const data = rangeArr.reduce( filter( odd )( map( xxx )( end ) ),0 );
