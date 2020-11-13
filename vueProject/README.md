# vn-pastime

[![Open Source Love](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![MIT Licence](https://badges.frapsoft.com/os/mit/mit.svg?v=103)](https://opensource.org/licenses/mit-license.php)

基于vue全家桶、easy-mock的前端项目,通过这个项目，了解前后端的整合

前端使用axios与后台api交互获取数据，vue全家桶进行数据的管理和渲染线上使用阿里云服务器部署，nginx进行http反向代理，pm2管理Node应用的进程(阿里云服务器到期，域名迁移备案中...)

* 仓库地址: [https://github.com/18304547672/Member-message.git](https://github.com/xxxgitone/vue-node-pastime)

## 功能介绍

后期将会优化前端的代码，比如代码的结构和书写规范，以及vue的组件规范，还有响应式的实现，也可能会添加一些新的模块。

**主要目录**

       
        |── public //静态资源
        │   ├──index.html//管理的页面
        ├── src  // 前端主文件
        │   ├── api  // 前端api，与后台api的交互
        │   ├── App.vue//根组件
        │   ├── assets  // 组件中静态资源
        │   │   ├── font
        │   │   ├── img
        │   │   └── scss
        │   ├── components // 公共组件
        │   ├── main.js// 页面入口
        |   |──App.vue//根组件
        │   ├── router.js//路由管理
        |   |──premission.js//路由守卫
        │   ├── store //vuex仓库
        │   ├── utils // axios对象
        │   │   └── request.js
        │   └── views // 页面级组件

**主要功能**(期待更多)

- [x] 登录验证
- [x] 首页，会员管理，员工管理，供应商管理，商品管理的展示
- [x] 
- [x] 基于token进行登录验证
- [x] 管理的展示列表
- [x] 修改密码，退出登录的操作

## 项目感想

本次小项目，只做了前端的一些应用，但是也能体会到了前后端分离的开发思想，也对开发环境中的项目目录结构有所了解，对于axios的封装，解决跨域问题开启代理proxy,配合localStorage存储技术,对vue有了更好的认识并更加熟练的进行应用，对于其中的路由，组件，静态资源，UI库有了新的认知，也遵循RESTFul Api开发，也着手做，对于开发过程中的bug，进行调试并解决，也掌握了chorm的debug机制，还需继续开发后端，做到全栈开发。

## Build Setup

``` bash
# clone项目
git clone git@github.com:xxxgitone/Member-message.git

cd vueProject

# install dependencies
npm install

# 再启动前台
npm run serve 11
# 启动easy-mock


```