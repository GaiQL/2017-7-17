let number = [1,1,1,1,2,3,6,25,41,25,36,32,34,62,52,145,2,3,6,511,22,5,2];
let maxProfit = (number) => {

  let price = 0;     //当前买入价格
  let total = 0;     //总利润
  let onOff = false; //是否持有头寸；

  //  前提： 假定我是知道下一次价格的；
  //  当前入场值总是小于后面的值，所以进场总是可以盈利的，只需要找到一个最高点抛售，然后重复
  function buy(i){
    console.log( 'buy　　' + number[i] )
    price = number[i];
    onOff = true;
  }
  function sale(i){
    console.log( 'sale 　' +　number[i] )
    price = number[i] - price;
    total += price;
    onOff = false;
  }

  for( let i=0;i<number.length;i++ ){

    if( !onOff && number[i] < number[i+1] ){
      buy(i);
    }
    if( onOff && number[i] > number[i+1] ){
      sale(i);
    }
    if( i == number.length-1 && onOff ){
      sale(i);
    }

  }
  return total;

}

let price = maxProfit(number);
console.log(price);
