
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
