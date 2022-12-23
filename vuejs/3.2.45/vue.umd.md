# vue-umd 说明

Vue3 的官方发布文件现不包含 umd 构建，这对 requirejs 加载模块不友好（[issue#1136](https://github.com/vuejs/core/issues/1136)），第三方有个 [vue-umd](https://www.npmjs.com/package/vue-umd) 做了 umd 封装，但仅限于 3.2.31 这一个版本，这里的 `vue.umd.js` 是通过修改 <https://github.com/alchemy-works/vue-umd> 源码生成对应的版本。

> Vue 官方发布的 `vue(.runtime).global(.prod).js` 使用的是 IIFEs 立即执行函数的封装形式，直接暴露了全局变量 Vue。而 `vue(.runtime).esm-browser(.prod).js` 仅适用于现代浏览器使用 import 导入。