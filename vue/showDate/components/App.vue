<template>
    <div id="app">
        <m-header></m-header>
        <m-footer></m-footer>
    </div>
</template>

<script>
    import MFooter from "./MFooter"
    import MHeader from "./MHeader"
    export default {
        name: "app",
        components:{
            MFooter,MHeader
        }
    }
</script>

<style scoped>

</style>