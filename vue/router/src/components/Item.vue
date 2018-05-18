<template>
    <div>{{ item }}</div>
</template>

<script>
    export default {
        asyncData ({ store, route }) {
            // 执行这个函数来触发获取数据的逻辑
            return store.dispatch('fetchItem', route.params.id)
        },

        computed: {
            // 从 store 的 state 对象中的获取 item。
            item () {
                return this.$store.state.items[this.$route.params.id]
            }
        }
    }
</script>