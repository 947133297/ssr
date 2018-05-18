import { createApp } from './app.js'

export default context => {

    // 因为有可能会是异步路由钩子函数或组件，所以我们将返回一个 Promise，
    // 以便服务器能够等待所有的内容在渲染前，
    // 就已经准备就绪。
    return new Promise((resolve, reject) => {
        const { app, router, store } = createApp()

        // 设置服务器端 router 的位置
        router.push(context.url)

        // 设置服务器端 router 的位置
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents()

            // 匹配不到的路由，执行 reject 函数，并返回 404
            if (!matchedComponents.length) {
                return reject({ code: 404 })
            }

            // 对所有匹配的路由组件调用 `asyncData()`，来进行数据预获取，预获取到的数据都会保存到store中
            Promise.all(matchedComponents.map(Component => {
                if (Component.asyncData) {
                    return Component.asyncData({
                        store,
                        route: router.currentRoute
                    })
                }
            })).then(() => {
                // 以上所有数据预获取完之后
                // 我们的 store 现在已经填充入渲染应用程序所需的状态。

                // 将获取到的状态附加到上下文中。之后，当renderer中启用了template选项时，这个状态将会自动序列化为 `window.__INITIAL_STATE__`，并注入 HTML。
                context.state = store.state

                // Promise 应该 resolve 应用程序实例，以便它可以渲染
                resolve(app)
            }).catch(reject)
        }, reject)
    })
}