
//    在函数式编程中，Transducer 是一种用于处理数据的高效、可组合且不会产生的中间数据的函数。
//    命令式编程，for

//    -----Clojure

//   找出 100 以内能被 3 整除的所有奇数的平方和
function range(from, to, skip){
    const result = [];
    for (let i = from; i < to; i += skip) {
        result.push(i);
    }
    return result;
}
console.log( range(0, 100 , 1) )

const odd = (num) => num % 2 !== 0;            // 判断是否奇数
const pow2 = (num) => Math.pow(num, 2);        // 计算平方
const sum = (cum, num) => cum + num;          // 求和

//  生成的数组被遍历了三次
//  我们只需要 reduce 计算的结果，中间 filter 与 map 函数都会产生无效的中间数据。
// const data = range(0, 100, 1).filter(odd).map(pow2).reduce(sum);    // 计算结果
// console.log(data);    // 166650


/*

   Array.prototype.reduce
   array1.reduce(callbackfn[, initialValue])

   callbackfn: 一个接受最多四个参数的函数。对于数组中的每个元素，reduce 方法都会调用 callbackfn 函数一次。
        参数：
          1 -  通过上一次调用回调函数获得的值。如果向 reduce 方法提供 initialValue，则在首次调用函数时，previousValue 为 initialValue。
          2 -  当前数组元素的值。
          3 -  当前数组元素的数字索引。
          4 -  包含该元素的数组对象。
   initialValue:可选。如果指定 initialValue，则它将用作初始值来启动累积。第一次调用 callbackfn 函数会将此值作为参数而非数组值提供。
   返回值:
      通过最后一次调用回调函数获得的累积结果。


*/

const sum = (result, item) => result + item;

const mult = (result, item) => result * item;

// 10 (=1+2+3+4)
const summed = [2,3,4].reduce(sum, 1);

// 24 (=1*2*3*4)
const multed = [2,3,4].reduce(mult, 1);

function appendCurrent( total,value,index,arr ){
  // console.log( total )
  console.log( value )
  total.push( value )
  return total
}
var arr = ['hello','world','!!!!'];
var result = arr.reduce(appendCurrent,[]);
console.log( result );



// 只需一次遍历便计算出结果！
// 使用 mapReducer 与 filterReducer来替代 map 与 filter，它们返回的函数具有相同的参数与返回值模式
const mapReducer = (f) => (result, item) => {
    result.push(f(item));
    return result;
};

const filterReducer = (predicate) => (result, item) => {
    //predicate  判断是否奇数的函数
    //item       reduce参数 数组中的每项值
    if (predicate(item)) {
        result.push(item);
    }
    return result;
};
// 现在 filter 和 map 都会返回一个高阶函数，这个高阶函数又可接收一个函数，包括 filter 和 map 返回的函数，这样它们便成了可组合
const data = range(0, 100,1)
    .reduce(filterReducer(odd), [])
    .reduce(mapReducer(pow2), [])
    .reduce(sum, 0);

console.log(data);        // 166650


const map = (f) => (reducing) => (result, item) => reducing(result, f(item));
const filter = (predicate) => (reducing) => (result, item) => predicate(item) ? reducing(result, item) : result;

const trans = filter(odd)(map(pow2)(sum));
const data = range(0, 100,1).reduce(trans, 0);
console.log(data);        // 166650
