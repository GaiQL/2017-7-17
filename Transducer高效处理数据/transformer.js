
function range(from, to, skip){
    const result = [];
    for (let i = from; i < to; i += skip) {
        result.push(i);
    }
    return result;
}
let rangeArr = range(0, 100, 1);

//reduce的是否封装，
let warp = xf => ({
  init:123,
  step:xf,
  result:result => result
})

let reduce = ( xf,init,input ) => {
  if( typeof xf === 'function' ){
    xf = warp(xf);
  }
  return input.reduce( xf.step,init );
}

let map = f => xf => ({
  init:123,
  step: ( result,init ) => {
    return xf.step( result,f(init) );
  },
  result:result => result
})

let reducer = ( mapF,steeper,init,input ) => {
  if( typeof steeper == 'function' ){
    steeper = warp( steeper );
  }
  const xf = mapF( steeper );
  return reduce( xf.step,init,input );
}

const method1 = result => result % 2 !== 0 && result % 3 === 0 ? result : 0;
const method2 = result => Math.pow( result,2 );

const compose = (fn1,fn2) => item => fn1(fn2(item));
const method3 = compose( method2,method1 );

const end = ( result,init ) => result + init;

const data = reducer( map( method3 ),end,0,rangeArr );
console.log(data);
