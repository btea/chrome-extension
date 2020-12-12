<template>
    <div class="box">
        <div class="item" v-for="menu in list" :key="menu.val">{{ menu.name }}</div>
    </div>
</template>
<script>
import { reactive } from "vue";
export default {
    setup() {
        let list = reactive([
            { name: "图片", val: "img" },
            { name: "文字", val: "text" },
            { name: "图片", val: "img" },
            { name: "文字", val: "text" },
            { name: "内容", val: "content" },
        ]);
        return { list };
    },
};
</script>
<style>
.box {
    width: 450px;
    display: flex;
    flex-wrap: wrap;
}
.box .item {
    width: 150px;
    height: 50px;
    cursor: pointer;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #6cf;
}
</style>
