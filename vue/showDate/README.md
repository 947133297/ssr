## 说明
src/app.js 是当前vue程序的入口组件文件，这里应该导出一个createApp函数来生成新的vue实例才对。会被以下两个入口文件所依赖

src/entry-client.js 代表了前端的逻辑，这里仅仅只是将组件读取出来，然后手动挂载而已

src/entry-server.js 每次SSR都会执行这里的代码，这里仅仅获取一个vue实例然后返回