<template>
	<view class="home">
		<!-- 自定义导航栏 -->
		<navbar title="首页" index='index' :normal="false"></navbar>
		<tab @tab="tab" :list="tabList" :tabIndex="tabIndex"></tab>
		<view class="home-list">
			<list :tab="tabList" @change="change" :activeIndex="activeIndex"></list>
		</view>

	</view>
</template>

<script>
	export default {

		data() {
			return {
				title: 'Hello',
				tabList: [{
						name: '全部'
					}, {
						name: '招募'
					}, {
						name: '悬赏'
					}, {
						name: '高光'
					}, ],
				tabIndex: 0,
				activeIndex:0
				
			}
		},
		onLoad() {

		},
		methods: {
			tab({
				data,
				index
			}) {
				this.activeIndex = index
				// console.log(data, index);
			},
			change(current){
				this.tabIndex = current
				// console.log(current);
			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		display: flex;
	}

	.home {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;

		.home-list {
			flex: 1;
			box-sizing: border-box;
		}
	}
</style>
