
//继承

// function Animal(){
// 　　this.species = "动物";
// }
// function Cat(name,color){
// 　　this.name = name;
// 　　this.color = color;
// }
//让猫继承动物

//  ---------构造函数绑定，使用call或apply方法，将父对象的构造函数绑定在子对象上。

function Animal(name){
　　this.species = name;
}
function Cat(name,color){
    // Animal.apply(this, ['动物','海尔和']); //执行
    Animal.call(this, '动物');
    //JavaScript 中，某个函数的参数数量是不固定的，因此要说适用条件的话，
    //当你的参数是明确知道数量时，用 call，
    //而不确定的时候，用 apply，然后把参数 push 进数组传递进去。当参数数量不确定时，函数内部也可以通过 arguments 这个数组来便利所有的参数。
　　this.name = name;
　　this.color = color;
}
var Cat1 = new Cat('大毛','黄色');
console.log( Cat1.species )


//-----------prototype的模式，将Animal的实例化对象挂在Cat的Prototype上

function Animal_P(){
　　this.species = "动物";
}
function Cat_P(name,color){
　　this.name = name;
　　this.color = color;
}
Cat_P.prototype = new Animal_P();         //替换了Cat_P构造函数的Prototype对象，
// console.log( Cat_P.prototype == new Animal_P() )  false
//原来Cat_P.prototype.constructor指向Cat_p,替换了之后，实例化的Animal_P的constructor指向Animal_P，所以Cat_P.prototype.constructor=Animal_p,导致继承链的紊乱
Cat_P.prototype.constructor = Cat_P;       //prototype的constructor指向Animal_P,但是他是在Cat_p上的，每一次重新定义Prototype的时候都要手动更改下
var Cat_P_1 = new Cat_P('嘿嘿','哈哈');     //实例化
console.log( Cat_P_1.species );

//------------直接继承prototype,对第二种方式的改进；at question;

function Animal_L(){
}
Animal_L.prototype.species = "动物";
function Cat_L(name,color){
　　this.name = name;
　　this.color = color;
}
Cat_L.prototype = Animal_L.prototype;
Cat_L.prototype.constructor = Cat_L;
var Cat_L_1 = new Cat_P('嘿嘿','哈哈');
console.log( Cat_L_1.species );
console.log( Animal_L.prototype.constructor );   //Cat
console.log( Animal_L.constructor )  //Function

/*
  与前一种方法相比，这样做的优点是效率比较高（不用执行和建立Animal的实例了），比较省内存。
  缺点是 Cat.prototype和Animal.prototype现在指向了同一个对象，那么任何对Cat.prototype的修改，都会反映到Animal.prototype。
*/

//-----------利用空对象作为中介

function Animal_K(){
}
Animal_K.prototype.species = "动物";
function Cat_K(name,color){
　　this.name = name;
　　this.color = color;
}
var F = function(){};
F.prototype = Animal_K.prototype;
let _No = new F();
Cat_K.prototype = _No;
console.log( Cat_K.prototype.prototype )
// console.log( Cat_K.prototype.prototype == new F().prototype )  true;   undefine == undefine；
// console.log( Cat_K.prototype.constructor == Animal_K )  true;
// console.log( new F().constructor == Animal_K )  true;
// console.log( Animal_K.prototype.constructor == Animal_K )   true;

Cat_K.prototype.constructor = Cat_K;
Cat_K.prototype.species = '嘿嘿额';
console.log( _No.constructor )     //上面的代码存在时指向 Cat_K，不在时指向 Animal_K；
console.log( _No.species )   // '嘿嘿额';

/*
    更改了_No这个实例化对象下的属性，但是没有更改他构造函数prototype上的值，
    而当我想要读取这个值是，也是优先找自身的属性。
*/

var Cat_K_1 = new Cat_K( '哈哈','嘿嘿' );
console.log( Cat_K_1.species );

//实例化对象不存在prototype...

//当我没有任何更改是，他会找到  Animal_K.prototype 下的属性和方法 也就是  Cat_K.prototype.prototype下的方法。
//如果我在 Cat_K.prototype 下修改了方法，并不会影响 Cat_K.prototype.prototype( Animal_K.prototype ),
//他会一直往下寻找，只是修改是在前面添加了障碍，而Animal_K.prototype还是真实存在的。

//每一个实例化对象都指向不同的内存，他们都可以通过原型链找到构造函数prototype，这个构造函数prototype都是同一块内存。


//!!!!!!!!!!!!!!!!!!! 改变Cat_K.prototype值时，其实相当于是改变new Cat_K()这个实例化对象下面的值，而不是这个实例化对象上Prototype的值，所以不会影响

//F为炮灰，是个空对象，所以几乎不占内存
//我们将上面的方法，封装成一个函数，便于使用。

//extends----还是个关键字.....

function extend( Child,Parent ){

  function Q(){};
  Q.prototype = Parent.prototype;
  Child.prototype = new Q();
  Child.prototype.constructor = Child;
  //相当于在子对象上打开一条通道，可以直接调用父对象的方法；为了实现继承的完备性，纯属备用性质。
  Child.uber = Parent.prototype;

}
function Animal_F(){
}
Animal_F.prototype.species = "动物";
function Cat_F(name,color){
　　this.name = name;
　　this.color = color;
}
extend( Cat_F,Animal_F );
var Cat_F_1 = new Cat_F();
console.log( Cat_F_1.species );




//--------------------forin循环 拷贝继承

function Copy( Child,Parent ){
  var OC = Child.prototype;
  var OP = Parent.prototype;
  console.log(OP)
  for( var i in OP ){
    OC[i] = OP[i]
  }
  OC.uber = OP.prototype;
}

function Animal_I(){
}
Animal_I.prototype.species = "动物";
function Cat_I(name,color){
　　this.name = name;
　　this.color = color;
}
Copy( Cat_I,Animal_I );
var Cat_I_1 = new Cat_I();
console.log( Cat_I_1.species );
