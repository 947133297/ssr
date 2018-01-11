import qs from 'qs'
import React from 'react'
import { createStore } from 'redux'
import reducer from './reducers/reducer'
import getRoot from './components/Root'
import { renderToString } from 'react-dom/server'
const express = require('express')
const app = express()
const utils = require('./utils/utils')

app.use('/dist', express.static('./dist'))
app.use(handleRender)

function handleRender(req, res) {
    const params = qs.parse(req.query)
    const id = parseInt(params.id, 10) || 0

    utils.fetchData(id).then((data)=>{

        let preloadedState = { data }
        const store = createStore(reducer, preloadedState)
        const html = renderToString(getRoot(store))
        const finalState = store.getState()
        res.send(renderFullPage(html, finalState))
    })
}
function renderFullPage(html, preloadedState) {
    return `
    <!doctype html>
    <html>
      <head>
        <title>Redux Universal Example</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        <script src="/dist/cln.bundle.js"></script>
      </body>
    </html>
    `
}
console.log("runing on 8088")
app.listen(8088)