<template>
    <div id="app">
        <router-link to="/">Go to homePage</router-link>
        <router-link to="/item/1">Go to item</router-link>

        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "app"
    }
</script>

<style scoped>

</style>