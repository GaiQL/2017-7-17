
//   找出 能被 3 整除的所有奇数的平方和
function range(from, to, skip){
    const result = [];
    for (let i = from; i < to; i += skip) {
        result.push(i);
    }
    return result;
}
let rangeArr = range(0, 10000000, 1);


console.time( 'tryTime1' );

let data1 = 0;
rangeArr.forEach(( e,i )=>{
  if( e % 2 !== 0 && e % 3 == 0 ){
    data1 = data1 + Math.pow(e, 2)
  }
})
console.log( data1 );

console.timeEnd( 'tryTime1' );


console.time( 'tryTime2' );

const odd = (num) => num % 2 !== 0 && num % 3 == 0;
const pow2 = (num) => Math.pow(num, 2);
const sum = (cum, num) => cum + num;
const data2 = rangeArr.filter(odd).map(pow2).reduce(sum);
console.log( data2 );

console.timeEnd( 'tryTime2' );




console.time( 'tryTime3' );

const map = (f) => (reducing) => (result, item) => reducing(result, f(item));
const filter = (predicate) => (reducing) => (result, item) => predicate(item) ? reducing(result, item) : result;

const oddZ = (num) => num % 2 !== 0 && num % 3 == 0;
const pow2Z = (num) => Math.pow(num, 2);
const sumZ = (cum, num) => cum + num;
const trans = filter(oddZ)(map(pow2Z)(sumZ));
const data3 = rangeArr.reduce(trans, 0);
console.log(data3);

console.timeEnd( 'tryTime3' );   

// end  少量数据时，普通函数式编程的处理会比命令式更加快速。但在处理大型数据时，更倾向与使用命令式编程的方式。
// 因为函数式编程，会由于多次遍历与大量中间数据的产生，造成严重的性能问题；
// 但是在函数式编程中，Transducer可以解决这个问题，只遍历一遍就拿到想要的结果。
