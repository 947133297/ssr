import { createApp } from './app.js'

const { app, router,store } = createApp()

// 在挂载 app 之前调用 router.onReady，因为路由器必须要提前解析路由配置中的异步组件，才能正确地调用组件中可能存在的路由钩子
router.onReady(() => {

    router.beforeResolve((to, from, next) => {
        const matched = router.getMatchedComponents(to)
        const prevMatched = router.getMatchedComponents(from)

        // 参考：https://ssr.vuejs.org/zh/data.html
        // 我们只关心非预渲染的组件
        // 所以我们对比它们，找出两个匹配列表的差异组件
        let diffed = false
        const activated = matched.filter((c, i) => {
            return diffed || (diffed = (prevMatched[i] !== c))
        })

        if (!activated.length) {
            return next()
        }

        // 这里如果有加载指示器(loading indicator)，就触发
        Promise.all(activated.map(c => {
            if (c.asyncData) {
                return c.asyncData({ store, route: to })
            }
        })).then(() => {

            // 停止加载指示器(loading indicator)

            next()
        }).catch(next)
    })

    // 将之前序列化到template中的状态，还原回store中
    if (window.__INITIAL_STATE__) {
        store.replaceState(window.__INITIAL_STATE__)
    }

    // 这里服务端渲染出的结果中，入口组件（App.vue）的根元素id为app，所以就根据这个id对生成的dom进行重新挂载
    // 在开发模式下，Vue 将推断客户端生成的虚拟 DOM 树(virtual DOM tree)，是否与从服务器渲染的 DOM 结构(DOM structure)匹配。如果无法匹配，它将退出混合模式，丢弃现有的 DOM 并从头开始渲染。在生产模式下，此检测会被跳过，以避免性能损耗。
    app.$mount('#app')

    // 重新挂载之前，渲染出来的结果html中，入口组件的根节点上会有一个特殊的属性：data-server-rendered="true"
    // 这个属性能让客户端 Vue 知道这部分 HTML 是由 Vue 在服务端渲染的，并且应该以激活模式进行挂载
})