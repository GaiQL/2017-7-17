let box = document.getElementById('box');

setTimeout(()=>{
  console.log(123);
  box.innerHTML = '<img src="http://image-product-web.oss-cn-beijing.aliyuncs.com/am_massage/20180206105738.png"/><img src="http://image-product-web.oss-cn-beijing.aliyuncs.com/am_massage/20180206105738.png"/>'
  //setTimeout中的  onload是无效的......
  // window.onload = () => {
  //    console.log('onload');
  // }
  let img = box.getElementsByTagName('img');
  //伪数组不能使用数组方法，伪数组转数组：
  img = Array.prototype.slice.call(img);

  console.log(img);

  img.forEach((e,i)=>{
    e.onload = () => {
      console.log(123123);
    }
  })
  //原生大法好..........
},100)
