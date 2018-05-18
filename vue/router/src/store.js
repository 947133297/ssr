import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 一个异步获取服务器数据的API
import { fetchItem } from './utils/api'

export function createStore () {
    return new Vuex.Store({
        state: {
            items: {}
        },
        actions: {
            fetchItem ({ commit }, id) {

                // 获取完数据后执行setItem，将数据设置到store的state上
                return fetchItem(id).then(item => {
                    commit('setItem', { id, item })
                })
            }
        },
        mutations: {
            setItem (state, { id, item }) {
                Vue.set(state.items, id, item)
            }
        }
    })
}