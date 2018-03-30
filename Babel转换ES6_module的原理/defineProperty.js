let some = new Object();

// 为对象定义属性
some.name = 'heihei';
some.name = 'haha';
//   defineProperty   ES5的属性
Object.defineProperty(some,'name',{
  value:'xixixixi'
})
//        最终这个方法会返回该对象。

// property  性质、财产。所有权。

// console.log( some.name );
some.name = 'body';
console.log( some.name )


/*

    Object.defineProperty(object, propertyname, descriptor)
    object 必需。 要在其上添加或修改属性的对象。 这可能是一个本机 JavaScript对象（即用户定义的对象或内置对象）或 DOM 对象。
    propertyname 必需。 一个包含属性名称的字符串。
    descriptor 必需。 属性描述符。 它可以针对数据属性或访问器属性。

    descriptor参数：
        【value】：属性的值，默认undefined
        【writable】： 该属性是否可写，如
                  果设置成 false，则任何对该属性改写的操作都无效（但不会报错），
                  直接在对象上定义的属性，这个属性该特性默认值为为 false。
        【configurable】：false--删除和修改目标属性的行为无效化，默认false;
        【enumerable】：是否能在for-in循环中遍历出来或在Object.keys中列举出来，默认false

        enumerable，configurable，writable
        属性刚出生的时候
        这三个属性在直接给对象上定义属性时默认值为true;
        用Object.defineProperty声明为false;

        【get】：一旦目标对象访问该属性，就会调用这个方法，并返回结果。默认为 undefined。
        【set】： 一旦目标对象设置该属性，就会调用这个方法。默认为 undefined。

*/
let little = new Object();
Object.defineProperty(little,'name',{
  value:'little'
})
little.name = 'name';
console.log( little.name );  //little   enumerable，configurable，writable为true;   不能可改可删可枚举


let many = new Object();
many.name = '123';
Object.defineProperty(many,'name',{
  value:'heihei'
})
many.name = 'heiheihei';
console.log( many.name );  //little   enumerable，configurable，writable为false;   可改可删可枚举


//get set
let GetObj = new Object();
Object.defineProperty(GetObj,'name',{

  get:function(){
    console.log('get');
  }
})
console.log( GetObj );


/*

    通过使用Object.defineProperty，来定义和控制一些特殊的属性，
    如属性是否可读，属性是否可枚举，修改属性的修改器（setter）和获取器(getter);

*/


//  优化对象获取和修改属性方式  :

//   -----------修改transfrom，简单的版本,并不是最合理的写法。

//  加入有一个目标节点， 我们想设置其位移时是这样的
var targetDom = document.getElementById('target');
var transformText = 'translateX(' + 10 + 'px)';
targetDom.style.webkitTransform = transformText;
targetDom.style.transform = transformText;

// 如果页面是需要许多动画时，我们这样编写transform属性是十分蛋疼的，利用Object.defineProperty定义
Object.defineProperty(dom,'translateX',{
  set:function(value){
    var transformText = 'translateX(' + value + 'px)';
    dom.style.webkitTransform = transformText;
    dom.style.transform = transformText;
  }
})
//下面再调用十分简单：
dom.translateX = 10;
dom.translateX = -10;
//可以拓展设置如scale, originX, translateZ,等各个属性，达到下面的效果
dom.scale = 1.5;  //放大1.5倍
dom.originX = 5;  //设置中心点X


//  如在Express4.0中，该版本去除了一些旧版本的中间件，为了让用户能够更好地发现，其有下面这段代码，
//  通过修改get属性方法，让用户调用废弃属性时抛错并带上自定义的错误信息。
[
'json',
'urlencoded',
'bodyParser',
'compress',
'cookieSession',
'session',
'logger',
'cookieParser',
'favicon',
'responseTime',
'errorHandler',
'timeout',
'methodOverride',
'vhost',
'csrf',
'directory',
'limit',
'multipart',
'staticCache',
].forEach(function (name) {
Object.defineProperty(exports, name, {
  get: function () {
    throw new Error('Most middleware (like ' + name + ') is no longer bundled with Express and must be installed separately. Please see https://github.com/senchalabs/connect#middleware.');
  },
  configurable: true
});
});
