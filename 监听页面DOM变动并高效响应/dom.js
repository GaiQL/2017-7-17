
let body = document.getElementsByTagName('body')[0];


let box = document.getElementById('box');
console.log(box.clientHeight);
box.innerHTML = '<img src="http://image-product-web.oss-cn-beijing.aliyuncs.com/am_massage/20180206105738.png"/>'
window.onload = () => {
  console.log('Wonload',box.clientHeight);
}
document.onload = () => {
  console.log('Donload',box.clientHeight);
}

body.DOMContentLoad = () => {
  console.log(123);
  console.log(box.clientHeight);
}

let div = document.createElement('div')
body.appendChild(div)

window.DOMNodeInserted = () => {
  console.log(123)
}

console.log(box.clientHeight);

// 创建观察者对象
var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });
});

// 配置观察选项:
/*
    注:  childList, attributes, 或者characterData三个属性中必须至少有一个为true。
    否则,会抛出异常"An invalid or illegal string was specified"。
*/

var config = {
  attributes:true,
  childList:true,
  characterData:true,
  subtree:true,

}

/*
childList	             如果需要观察目标节点的子节点(新增了某个子节点,或者移除了某个子节点),则设置为true.
attributes	           如果需要观察目标节点的属性节点(新增或删除了某个属性,以及某个属性的属性值发生了变化),则设置为true.
characterData	         如果目标节点为characterData节点(一种抽象接口,具体可以为文本节点,注释节点,以及处理指令节点)时,也要观察该节点的文本内容是否发生变化,则设置为true.
subtree	               除了目标节点,如果还需要观察目标节点的所有后代节点(观察目标节点所包含的整棵DOM树上的上述三种节点变化),则设置为true.
attributeOldValue	     在attributes属性已经设为true的前提下,如果需要将发生变化的属性节点之前的属性值记录下来(记录到下面MutationRecord对象的oldValue属性中),则设置为true.
characterDataOldValue	 在characterData属性已经设为true的前提下,如果需要将发生变化的characterData节点之前的文本内容记录下来(记录到下面MutationRecord对象的oldValue属性中),则设置为true.
attributeFilter	       一个属性名数组(不需要指定命名空间),只有该数组中包含的属性名发生变化时才会被观察到,其他名称的属性发生变化后会被忽略.
*/

// 传入目标节点和观察选项
observer.observe(box, config);

// 随后,你还可以停止观察
// observer.disconnect();




/*

DOM2级的变动（mutation）事件能在DOM中的某一部分发生变化时给出提示。变动事件是为XML或HTML DOM设计的，并不特定于某种语言。DOM2级定义了如下变动事件：

（1）DOMSubtreeModified：在DOM结构中发生的任何变化时触发。这个事件在其他任何事件触发后都会触发。

（2）DOMNodeInserted：在一个节点作为子节点被插入到另一个节点中时触发。

（3）DOMNodeRemoved：在节点从其父节点中被移除时触发。

（4）DOMNodeInsertedIntoDocument：在一个节点被直接插入文档或通过子树间接插入到文档之后触发。这个事件在DOMNodeInserted之后触发。

（5）DOMNodeRemovedFromDocument：在一个节点被直接从文档中移除或通过子树间接从文档中移除之前触发。这个事件在DOMNodeRemoved之后触发。

（6）DOMAttrModified：在特性被修改之后触发。

（7）DOMCharacterDataModified:在文本节点的值发生变化时触发。

*/

/*

HTML5事件
       1.contextmenu事件

       2.beforeunload事件

       3.DOMContentLoad事件

       4.readystatechange事件

       支持readystatechange事件的每个对象都有一个readyState属性，可能包含下列5个值中的一个。

       （1）uninitialized（未初始化）：对象存在但尚未初始化。

       （2）loading（正在加载）：对象正在加载数据。

       （3）loaded（加载完毕）：对象加载数据完成。

       （4）interactive（交互）：可以操作对象了，但还没有完全加载。

       （5）complete（完成）：对象已经加载完毕。

       这些状态看起来很直观，但并非所有对象都会经历readyState的这几个阶段。换句话说，如果某个阶段不适用某个对象，则该对象完全可能跳过该阶段；并没有规定哪个阶段适用于哪个对象。

*/
