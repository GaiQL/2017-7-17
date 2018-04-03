
var obj = {
  name:'heihei',
  age:123
}

function observe( obj ){

  if( !obj || typeof obj !== 'object' ){
    return;
  }

  // Object.keys返回的是一个对象属性数组   [ "name","age" ];
  console.log( Object.keys( obj ) );
  Object.keys( obj ).forEach((e)=>{
    defineReactive( obj , e , obj[e] );
  })

}

function defineReactive( data,key,value ){

  var dep = new Dep();
  observe( value );
  Object.defineProperty(data,key,{
    enumerable: true,
    configurable: false,
    get:function() {
        return value;
    },
    set:function(newVal) {

        if( value == newVal ) return;
        console.log('哈哈哈，监听到值变化了 ', value, ' --> ', newVal);
        value = newVal;
        //属性变化后触发所有订阅者的 notify方法；
        dep.notify();

    }
  })

}

observe( obj );
obj.name = '猜猜我是谁';

//  监听到变化之后就是怎么通知订阅者了,
//  实现一个消息订阅器，维护一个数组，用来收集订阅者，数据变动触发notify，再调用订阅者的update方法
//  订阅者 -- Dep中的subs数组；

function Dep(){
  this.subs = [];
}
Dep.prototype = {
  addSub: function(sub) {
    this.subs.push(sub);
  },
  notify: function() {
      this.subs.forEach(function(sub) {
          sub.update();
      });
  }
}
