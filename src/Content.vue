<template>
	<div class="box">
		<div class="btn load" @click="load">导出</div>
		<div class="btn next" @click="next">下一章</div>
	</div>
</template>
<script setup>
import { ref } from "vue";
let text = ref("");
const load = () => {
	const index = document.querySelector('.section.route-active .index').innerText
	const name = document.querySelector('.section.route-active .title-text').innerText
	const content = document.querySelector('.markdown-body').innerHTML
	const obj = {
		name,
		content
	}
	const blob = new Blob([`export default ${JSON.stringify(obj)}`], {type: 'appliction/javascript'})
	const link = window.URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = link
	a.download = index + '.js'
	a.click()
}
const next = () => {
	const el = document.querySelector('.step-btn.step-btn--next')
	el.click()
}
</script>
<style lang="less" scoped>
.box {
	padding: 10px;
	position: fixed;
	right: 50px;
	top: 50px;
	z-index: 10000;
	.btn{
		padding: 10px;
		background: #6cf;
		border-radius: 5px;
		cursor: pointer;
		color: #fff;
		display: inline-block;
		margin: 0 10px;
	}
}
</style>
