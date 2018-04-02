
// xf：reduce 函数的首个参数，可以是 reducing Function，也可以是 transformer。
// transformer：   封装 reducing function（ reduce第一个参数 ），返回控制 reduce 声明周期的对象 init step result

  // 实现 transformer 的归约过程：

const sum = (result, item) => result + item;


const transformer = reducingFunction => ({
  // 1. 作为 reduce 开始的初始值
  init: () => 1,

  // 2. 每次输入一个元素，并将本次计算结果
  //    传给下次迭代的 reducing function
  step: reducingFunction,

  // 3. 将最后一次的计算结果作为输出
  result: result => result,
});

//将刚定义的 transformer 运用到 reduce 中。

const input = [2,3,4];

var xf = transformer(sum);
// const output = input.reduce(xf.step, xf.init());
// output = 10 (=1+2+3+4)

// const xf = transformer(mult);
// const output = input.reduce(xf.step, xf.init());
// output = 24 (=1*2*3*4)

//  将 transformation 与输入和输出解耦，所以将 reduce 定义为函数。
// const reduce = (xf, init, input) => {
//   let result = input.reduce(xf.step, init);
//   return xf.result(result);
// };
// const output = reduce(xf, xf.init(),input);
// console.log( output );



//  定义一个辅助函数，来将 reduceing function 转换为 transformer，并传入 reduce 使用。
const warp = ( xf ) => ({
  step: xf,
  result: result => result
})
const reduce = (xf, init, input) => {
  if( typeof xf === 'function' ){
    //  调用 wrap 函数将其转换为 transformer
    xf = warp(xf);
  }
  let result = input.reduce(xf.step, init);
  return xf.result(result);
};
const output = reduce(sum,1,input);
console.log( output );

//这是使用 transducers 时经常用到的方法：将 transformations 定义为简单的函数，然后使用 transducers 库将其转换为transformer。


//  不一样的数组拷贝:
const append = (result, item) => {
  //不能直接返回result.push(item);  WHY？  push的返回值是   数组长度.....
  result.push(item);
  return result
}
const arrN = reduce(append, [], input);
console.log( arrN );

let Pusharr = []
console.log( Pusharr.push(1,2,16,244) );

//  假设我们想要每个元素加1，定义一个加1函数。
const plus1 = item => item + 1;

//  现在创建一个 transformer ，它使用上面的函数在 step 中对每个独立元素进行转换。
const xfplus1 = {
  step:(result, item) => {
    const plus1ed = plus1(item);
    return append(result, plus1ed);
  },
  result:result => result
}
// let addNum = reduce( xfplus1.step,[],input );
var init = [];
let result = xfplus1.step(init, 2);
console.log( result );   //  3
result = xfplus1.step(result, 3);
console.log( result );   //  4
result = xfplus1.step(result, 4);
console.log( result );   //  5

//   每个元素加1 后的总和   :   创建一个中间数组获取答案
var all = reduce( sum,0,result );
console.log( all );

//   定义一个不会产生中间数组，但直接对元素求和的 transformer。


const xfplus2 = {
  step:(result, item) => {
    const plus1ed = plus1(item);
    return sum(result, plus1ed);
  },
  result:result => result
}
let result2 = xfplus2.step(0,5);
console.log( result2 );



//  transducer：一个接受现有 transformer，并返回新 transformer 的函数。
//  新 transformer 会改变原有 transformation 的行为，transducer 会将一些额外的处理委托给新的封装过的 transformer。


//  plus1处理函数；
//  对transducerPlus1进行再次封装，以便复用。   内容中只有plus1处理函数不同；
const transducerPlus1 = (xf) => {
  console.log(xf);
  return {
    init: () => xf.init(),
    step: (result, item) => {
      const plus1ed = plus1(item);
      return xf.step(result, plus1ed);
    },
    result: result => result,
  };
}

// const stepper = wrap(append);
const transducer = transducerPlus1;
// // const xf = transducer(stepper);
// let result = xf.step(init, 2);


//中间辅助元素    :   不需要计算中间数组，一次迭代就可以得到结果。

//  我们只取数组中的值进行加减计算，但不创造中间数组；    不需要中间辅助数组，只需改变 stepperadd 和初始值。

const stepperadd = warp(sum);
init = 0;
var xf = transducer(stepperadd);
result = xf.step(init, 5);
result = xf.step(init, result);
// 3 (=sum(0, 2+1)))

console.log( result );

/*

      sum 与之前 append 例子只有两处不同  ：
        创建 stepper 时，用 sum 代替 append 进行封装。
        初始值使用 0 代替 []。

*/


// DRY原则：   Don't repeat yourself   不要重复自己

// YAGNI原则： You aren't gonna need it 你不会需要它

// Rule Of Three原则  当某个功能第三次出现时，才进行"抽象化"。



//map函数中拥有变量F，返回一个匿名函数，匿名函数中有一个变量XF，执行这个匿名函数，返回一个对象
//  对象中的step函数，result上次处理的结果   item这次新增加的数据
//map  用来处理   transformer  ;
//xf  transformer
//f   处理函数
const method2 = result => result + 2;

const map = f => xf => ({
  init: () => xf.init(),
  step: (result, item) => {
    const plus1 = f(item);          //  3+2  处理传入的数据
    return xf.step(result, plus1);   //  之前的结果与  传入的数据处理后的结果  相加   或其他方法；
  },
  result: result => result,
})

// const sum = (result, item) => result + item;     warp -> 生成transformer的函数  sum处理方法
var seconed = map( method2 )( warp(append) );
result = seconed.step( [],3 );
result = seconed.step( result,4 );
result = seconed.step( result,5 );
var outres = seconed.result( result );
console.log( outres );



// var reduce = (xf, init, input) => {
//   if( typeof xf === 'function' ){
//     xf = warp(xf);
//   }
//   let result = input.reduce(xf.step, init);
//   return xf.result(result);
// };


//  Transduce
//   transducer  -----  map( method2 )    init 初始值   input 数据源
//   stepper     -----  append、sum
const transduce = ( transducer,stepper,init,input ) => {
  if( typeof stepper == 'function' ){
    stepper = warp( stepper );    //数据处理好后执行的方法
  }
  const xf = transducer(stepper);  // 处理每一个值的方法
  return reduce( xf.step,init,input )   //   调用方法，利用   reduce  处理数据源，最终返回一个结果。
}


var transducerZ = map( method2 );
var stepperZ = sum;
var initZ = 0;
var outputZ = transduce( transducerZ,stepperZ,initZ,[1,2,3,4,5] );
console.log( outputZ );

//    平常处理要先进数组里数据的处理，便利完成后把数组中所有的数字加1，返回一个新的数组，然后数组中的值在全部相加。
//    我们可以在不依赖中间变量的情况下，遍历一次便可求得累加和或乘积:
//          利用 reduce 去遍历数组，第一个参数处理数组中的每一个值，      map( method2 )( warp(append) ).step  ;

                                                                    // (result, item) => {
                                                                    //   const plus1 = f(item);         sum、append WRAP之后的值
                                                                    //   return xf.step(result, plus1);
                                                                    // }




//     transduce 本质上做的事情是 在对每个元素进行归约之前先对其进行变换 ; 这也是 transduce 区别于 reduce 的 “ 唯一 ” 不同点






// 箭头函数
// const heiheiehi = wz => ({
//   num:wz
// }) ;
// console.log( heiheiehi( 123 ) )
