// transformer  将处理函数转为对象  init与result使用方法暂定...
const wrap = xf => ({
  init:Math.random(),
  step:xf,
  result:result => result
})

// 只遍历一遍数组，直接返回结果。
const reduce = ( xf,init,input ) => {
  if( typeof xf == 'function' ){
    xf = wrap( xf );
  }
  const result = input.reduce( xf.step,init );
  return result;
}

// f 每一个值的处理方式的普通处理函数     xf  在一起的处理的transformer
const map = f => xf => ({
  init:Math.random(),
  step:( result,item )=>{
    const EverResult = f( item );
    return xf.step( result,EverResult );
  },
  result:result => result
})

const reducer = ( transducer,stepper,init,input ) => {
  if( typeof stepper == 'function' ){
    stepper = wrap( stepper );
  }
  const xf = transducer( stepper );
  return reduce( xf.step,init,input );
}


const compose = ( fn1,fn2 ) => item => fn1(fn2(item));   //从里到外
const metho1 = item => item * 3;
const metho2 = item => item + 2;
const metho3 = compose( metho1,metho2 );  //先+2  后*3

const sum = ( result,item ) => result + item;
const append = ( result,item ) => {
  result.push( item );
  return result
}

const sumTran = wrap( sum );
const init = 0;
const input = [5,6,7,8];

const result = reducer( map( metho3 ),sum,init,input );

console.log( result );

//  我用for循环forEach 然后在每轮里面做判断也可以循环一遍算出值，为什么非要用这个？？啊啊啊啊啊啊啊啊啊啊啊！！！！以为结束了，好烦..
//  函数式编程中的 Transducer？
//  既然测试已性能为主，那三种方式都写出来对比下吧，先回家背马原去了.....
