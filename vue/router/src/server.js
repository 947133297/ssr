const { createBundleRenderer } = require('vue-server-renderer')
const template = require('fs').readFileSync('./index.tmpl.html', 'utf-8')
const serverBundle = require('../dist/vue-ssr-server-bundle')
const clientManifest = require('../dist/vue-ssr-client-manifest')

const express = require('express')
const server = express()

const renderer = createBundleRenderer(serverBundle, {
    template,
    clientManifest
})
server.use('/',express.static('.'));
server.get('*', (req, res) => {
    const context = { url: req.url }

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