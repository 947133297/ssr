<template>
    <div class="big">
        这是header
        <br>
        当前的时间是 ： {{time}}
    </div>
</template>

<script>
    export default {
        name: "m-header",
        data:()=>{
            return {
                time: new Date()
            }
        },
        created:function(){
            if(process.env.VUE_ENV === "srv"){
                this.$ssrContext.data = "this come from component"
            }
            // other logic
        },
        mounted:function(){
            setInterval(()=>{
                this.time = new Date();
            },1000)
        }
    }
</script>

<style scoped>

</style>