

//--------------------------原始模式
var cat = {
  name:'',
  color:''
}


var catOne = {};
catOne.name = '大毛';
catOne.color = '黄色';

var catTwo = {};
catTwo.name = '小名';
catTwo.color = '红色';

//1.如果多生成几个实例，写起来就非常麻烦；
//2.实例与原型之间，没有任何办法，可以看出有什么联系。


//-----------------------原始模式的改进，解决代码重复问题

function Cat(name,color){
  return {
    name:name,
    color:color
  }
}

var CatOne = Cat('大毛','黄色');
var CatTwo = Cat('小明','红色');

//1.Cat1与Cat2之间没有内在联系，不能反映出他们是同一个原型对象的势力；


//  -------------------构造函数模式
//所谓的 “ 构造函数 ” ，其实就是一个普通的函数，但是内部使用了this变量，对构造函数使用new函数运算符返回实例化对象，并且this变量会绑定在实例上。
function Dog(name,color){
  this.name = name;
  this.color = color;
}
var DogOne = new Dog('heihei','purple');
var DogTwo = new Dog('haha','yellow');
console.log(DogOne.name);
console.log(DogTwo.name);

// 实例化对象
// DogOne 和 DogTwo 会自动含有一个constructor的对象，指向他们的构造函数。
console.log( DogOne.constructor == Dog ) //true;

//js提供了一个instanceof的运算符，用来验证原型对象(构造函数)与实例化对象之间的关系；
console.log( DogOne instanceof Dog )  //true

//实例化对象，constructor指向构造函数，  instanceof判断这个实例化对象是否来自后面的构造函数；


//构造函数模式的问题：存在一个浪费内存的问题；
function tiger(name,color){

　　　　this.name = name;
　　　　this.color = color;
　　　　this.type = "猫科动物";
　　　　this.eat = function(){alert("吃老鼠");};
    // type 与 eat 都是固定的方法，每次生成一个实例，都是为重复的内容，就会多占一些内存，
    // console.log( tiger1.eat == tiger2.eat )   false;

}


//  -----------------------Prototype模式
//  js规定，每一个构造函数 都有一个prototype属性，指向另一个对象，这个对象所有的属性和方法，都会被构造函数对的实例继承；
//  我们把一些不变的属性和方法直接定义在  prototype 上;
function Tiger(name,color){

　　　　this.name = name;
　　　　this.color = color;

}

Tiger.prototype.eat = function(){alert('吃老鼠')};
Tiger.prototype.type = '猫科动物';

var Tiger1 = new Tiger( '小红','白色' );
var Tiger2 = new Tiger( '小白','白色' );

 // Tiger1.eat()

// 实例化后   Tiger1.eat == Tiger2.eat   他们是同一个内存地址，指向prototype对象，因此提高运行效率；

//  ----------------------Prototype模式的验证方法
//  为了配合Prototype属性，js定义了一些辅助方法，帮我们使用它;

//inPrototypeOf  判断某个prototype对象与实例之间的关系
console.log( Tiger.prototype.isPrototypeOf(Tiger1) ); //true

//hasOwnProperty()  用来判断某一个属性是属于本地属于还是属于继承prototype对象的属性
// property  n.性质，性能，所有权，财产
console.log( Tiger1.hasOwnProperty("name") );  //true;
console.log( Tiger1.hasOwnProperty("type") );  //false;

//  in 运算符    判断某个实例是否含有某个属性
// for in 循环
console.log( "name" in Tiger1 )   //true
console.log( "heihei" in Tiger1 )  //false


//  构造函数   Prototype     实例化对象


//  实例化对象是否由这个构造函数所构造              instanceof;
//  实例化对象是否有这个构造函数的Portotype         isPrototypeOf;
//  实例化对想下的方法是否来自本地，本地true，prototype为false    hasOwnPrototype();
