const Vue = require('vue')
const server = require('express')()
const renderer = require('vue-server-renderer').createRenderer({
    template: require('fs').readFileSync('./index.html', 'utf-8')
})
server.get('*', (req, res) => {
    const app = require('./app')({url:req.url})
    const context = {
        title:"这是页面的标题",
        data:'<div>test for xss</div>',
        meta:'<meta charset="UTF-8">'
    }
    renderer.renderToString(app, context,(err, html) => {
        if (err) {
            res.status(500).end('Internal Server Error')
            return
        }
        res.end(html)
    })
})
console.log('server is running on 8080')
server.listen(8080)