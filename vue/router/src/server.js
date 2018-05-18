const { createBundleRenderer } = require('vue-server-renderer')
const template = require('fs').readFileSync('./index.tmpl.html', 'utf-8')
const serverBundle = require('../dist/vue-ssr-server-bundle')
const clientManifest = require('../dist/vue-ssr-client-manifest')

const express = require('express')
const server = express()

// 创建的 bundle renderer，用法和普通 renderer 相同，但是 bundle renderer 有额外的一些优点
const renderer = createBundleRenderer(serverBundle, {
    // runInNewContext: false, // 推荐，API参考：https://ssr.vuejs.org/zh/api.html#runinnewcontext，里面所说的bundle就是指server bundle
    template,  // （可选）页面模板
    clientManifest // （可选）客户端构建 manifest
})

/*
* renderer 现在具有了 服务器serverBundle 和 客户端clientManifest 的构建信息，因此它可以自动推断和注入资源预加载 / 数据预取指令(preload / prefetch directive)，以及 css 链接 / script 标签到所渲染的 HTML。
* 如：
* 1. 在生成的文件名中有哈希时，可以取代 html-webpack-plugin 来注入正确的资源 URL。
* 2. 在通过 webpack 的按需代码分割特性渲染 bundle 时，我们可以确保对 chunk 进行最优化的资源预加载/数据预取，并且还可以将所需的异步 chunk 智能地注入为 <script> 标签，以避免客户端的瀑布式请求(waterfall request)，以及改善可交互时间(TTI - time-to-interactive)。
*
* 会生成的大致html如下：
*   <head>
    <!-- 用于当前渲染的 chunk 会被资源预加载(preload) -->
    <link rel="preload" href="/manifest.js" as="script">
    <link rel="preload" href="/main.js" as="script">
    <link rel="preload" href="/0.js" as="script">
    <!-- 未用到的异步 chunk 会被数据预取(preload)（次要优先级） -->
    <link rel="prefetch" href="/1.js" as="script">
  </head>
  <body>
    <!-- 应用程序内容 -->
    <div data-server-rendered="true"><div>async</div></div>
    <!-- manifest chunk 优先 -->
    <script src="/manifest.js"></script>
    <!-- 在主 chunk 之前注入异步 chunk -->
    <script src="/0.js"></script>
    <script src="/main.js"></script>
  </body>
* */

server.use('/',express.static('.'));

server.get('*', (req, res) => {
    const context = { url: req.url }

    // bundle renderer 在调用 renderToString 时，它将自动执行「由 bundle 创建的应用程序实例」所导出的函数（传入上下文作为参数），然后渲染它
    renderer.renderToString(context, (err, html) => {
        if (err) {
            if (err.code === 404) {
                res.status(404).end('Page not found')
            } else {
                res.status(500).end('Internal Server Error')
            }
        } else {
            res.end(html)
        }
    })
})
console.log(`server running on 8080`)
server.listen(8080)