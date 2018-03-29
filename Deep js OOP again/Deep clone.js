
//非构造函数的继承......

// var Chinese = {
// 　　nation:'中国'
// };
//
// var Doctor ={
// 　　career:'医生'
// };

//-------------Object方法

var Chinese = {
　　nation:'中国'
};

function object( o ){
  function f(){}
  f.prototype = o;
  return new f();
}

var Doctor = object( Chinese );
Doctor.career = '医生';
//现在父对象基础上生成子对象，再给子对象赋值；
console.log( Doctor.nation );

//---------------浅拷贝

function extendCopy( o ){
  let obj = {};
  for(var i in o){
    obj[i] = o[i]
  }
  obj.uber = o;
  return obj;
}
Chinese.birthPlaces = ['北京','上海','香港'];
var Doctor = extendCopy( Chinese );
Doctor.career = '医生';
Doctor.birthPlaces.push('厦门')
console.log(Chinese.birthPlaces); // ['北京','上海','香港','香港'];

//所以，extendCopy()只是拷贝基本类型的数据，我们把这种拷贝叫做"浅拷贝"。

//-----------------深拷贝：递归调用"浅拷贝"。
function deepClone(Parent,Child){
  var Child = Child || {};
  for( var key in Parent ){
    if( typeof Parent[key] == 'object' ){
      Child[key] = Parent[key].constructor == Array?[]:{};
      deepClone( Parent[key],Child[key] );
    }else{
      Child[key] = Parent[key];
    }
  }
  return Child;
}
//forin循环父对象，判断当前值是否为对象，是的话判断当前值的construotor是否为ARRAY或OBJECT或其他方法设置出[]|{},然后子父的当前值再次执行次函数，不是对象就直接赋值
var heihei = deepClone( Chinese );
heihei.name = 'heihei2';
console.log( heihei.name );  //heihei2
console.log( Chinese.name );    //undefine
