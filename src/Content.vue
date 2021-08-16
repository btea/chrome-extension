<template>
	<div class="box">
		<h1>hello world</h1>
		<input type="text" v-model="text" />
	</div>
</template>
<script setup>
import { ref } from "vue";
let text = ref("");
</script>
<style lang="less" scoped>
.box {
	padding: 10px;
}
</style>
