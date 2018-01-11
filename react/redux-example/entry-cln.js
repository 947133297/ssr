import React from 'react'
import { hydrate } from 'react-dom'
import { createStore } from 'redux'
import getRoot from './components/Root'
import reducer from './reducers/reducer'


const preloadedState = window.__PRELOADED_STATE__
delete window.__PRELOADED_STATE__

const store = createStore(reducer, preloadedState)

hydrate(
    getRoot(store),
    document.getElementById('root')
)