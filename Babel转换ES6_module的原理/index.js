
// 导出转换
export const InlineExport = { }
const NormalExport = { }
const RenameExport = { }
const DefaultExport = { }

export { NormalExport }
export { RenameExport as HasRenamed }
export default DefaultExport

// 转换后
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var InlineExport = exports.InlineExport = {};
var NormalExport = {};
var RenameExport = {};
var DefaultExport = {};

exports.NormalExport = NormalExport;
exports.HasRenamed = RenameExport;
exports.default = DefaultExport;



// 导入转换
import { NormalExport } from 'normal'
import { HasRenamed as RenameAgain } from 'rename'
import DefaultExport from 'default'
import * as All from 'all'

NormalExport()
RenameAgain()
DefaultExport()
All()

// 转换后
'use strict';

var _normal = require('normal');
var _rename = require('rename');

var _default = require('default');
var _default2 = _interopRequireDefault(_default);

var _all = require('all');
var all = _interopRequireWildcard(_all);

(0, _normal.NormalExport)();
(0, _rename.HasRenamed)();
(0, _default2.default)();
all.hello();

function _interopRequireDefault(obj) {
  return obj && obj.__esModule
    ? obj
    : { default: obj };
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}


/*

      CommonJS 方案的特点：

      1、所有要输出的对象统统挂载在 module.exports 上，然后暴露给外界
      2、通过 require 加载别的模块，require 的返回值就是模块暴露的对象
      3、CommonJS 是一个单对象输出，单对象加载的模型

*/

/*

      ES6 的模块化机制:

      可通过以下方式输出任何对模块内部的引用
            export { A, B }
            export { A as a, B }
            export default A
            export const A = { }
      通过以下方式加载模块中输出的任意引用
            import A from './module'
            import * as A from './module'
            import { A, B } from './module'
            import { A as a, B } from './module'

      ES6 module 是一个多对象输出，多对象加载的模型

*/

/*

      ES6 module 和 CommonJS 的联系:
      目前的浏览器几乎都不支持 ES6 的模块机制，所以我们要用 Babel 把 ES6 的模块机制转换成 CommonJS 的形式，
      然后使用 Browserify 或者 Webpack 这样的打包工具把他们打包起来

      -------Babel 需要在借助 CommonJS 的实现基础上稍作修改，以达到符合 ES6 标准的目的。

      babel在转换ES6module的时候是要依赖 CommonJS 的，并且在 CommonJS 上有所修改，增加了default属性？

*/
/*

      Babel 是怎么实现 ES6 模块的转换的？
      Babel依然通过 exports 对象来输出模块内的引用，但是增加了一个特殊的 exports.default 属性用来实现 ES6 的默认输出对象。
      并且依然通过 require 来实现模块的加载。

*/

/*

    模块导出时通过 Object.defineProperty 定义的 exports.__esModule 有什么用？
    Object.defineProperty(exports, "__esModule", {
      value: true
    });

    给模块的输出对象增加 __esModule 是为了将不符合 Babel 要求的 CommonJS 模块转换成符合要求的模块，这一点在 require 的时候体现出来。

    如果加载模块之后，发现加载的模块带着一个 __esModule 属性，Babel 就知道这个模块肯定是它转换过的，
    这样 Babel 就可以放心地从加载的模块中调用 exports.default 这个导出的对象，也就是 ES6 规定的默认导出对象，
    所以这个模块既符合 CommonJS 标准，又符合 Babel 对 ES6 模块化的需求。

    然而如果 __esModule 不存在，也没关系，Babel 在加载了一个检测不到 __esModule 的模块时，
    它就知道这个模块虽然符合 CommonJS 标准，但可能是一个第三方的模块，
    Babel 没有转换过它，如果以后直接调用 exports.default 是会出错的，
    所以现在就给它补上一个 default 属性，就干脆让 default 属性指向它自己就好了，这样以后就不会出错了。


*/
/*

    模块引入后执行时为什么使用逗号表达式？
    (0, _normal.NormalExport)();

    从左到右执行一遍，然后逗号表达式的值等于最后一个逗号之后的表达式的值  _normal.NormalExport();
    执行时的上下文环境会被绑定到全局对象身上 : _normal.NormalExport.call(GLOBAL_OBJECT);

*/
