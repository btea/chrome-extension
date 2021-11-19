<template>
	<div class="box">
		<div class="btn load" @click="load">导出</div>
		<div class="btn next" @click="next">下一章</div>
		<div class="btn menu" @click="saveMenu">菜单</div>
		<br>
		<input type="text" v-model="menuName" class="menu-name"/>
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
	// 下载完成之后自动切换到下一章
	next()
}
// 保存菜单json信息
const menuName = ref('')
const saveMenu = () => {
	if (!menuName.value.trim()) {
		return
	}
	const list = document.querySelectorAll('.section-list .title-text')
	const text = Array.from(list).map((el, i) => {
		return {
			key: i + 1,
			name: el.innerText
		}	
	})
	const blob = new Blob([JSON.stringify(text, null, 4)], {type: 'application/json'})
	const link = window.URL.createObjectURL(blob)
	const a = document.createElement('a')
	a.href = link;
	a.download = menuName.value + '.json'
	a.click()
}

const next = () => {
	const el = document.querySelector('.step-btn.step-btn--next')
	if (el) {
		el.click()
		setTimeout(() => {
			load()
		}, 2000)
	}
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
	.menu-name {
		height: 30px;
		margin: 10px;
		padding: 0 10px;
	}
}
</style>
