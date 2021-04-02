<template>
	<view class="tab">
		<scroll-view class="tab-scroll" scroll-x>
			<view class="tab-scroll_box">
				<view v-for="(item,index) in list" :key="index" class="tab-scroll_item" :class="{active:activeIndex === index}"
				 @click="clickTab(item,index)">{{item.name}}</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		props:{
			list:{
				type: Array,
				default(){
					return []
				}
			},
			tabIndex:{
				type: Number,
				default:0
			}
		},
		watch:{
			tabIndex(newVal){
				this.activeIndex = newVal
			}
		},
		data() {
			return {
				activeIndex: 0,
			}
		},
		methods: {
			clickTab(item, index) {
				this.activeIndex = index
				this.$emit('tab', {
					data: item,
					index: index
				})
			}
		}

	}
</script>

<style lang="scss">
	.tab {
		width: 100%;
		background-color: #fff;
		border-bottom: 1px #f5f5f5 solid;
		box-sizing: border-box;

		.tab-scroll_box {
			display: flex;
			align-items: center;
			white-space: nowrap;
			height: 45px;

			.tab-scroll_item {
				flex-shrink: 0;
				padding: 0 10px;
				color: #333;
				font-size: 14px;

				&.active {
					color: $mk-base-color;
					font-weight: bold;
				}
			}
		}
	}
</style>
