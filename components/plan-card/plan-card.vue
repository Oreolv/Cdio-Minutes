<template>
	<view class="plan-card">

		<view class="plan-box" v-for="(item,index) in planlist">
			<view class="plan-card_icons">
				<text class="iconfont icon-rili"></text>
			</view>
			<view class="plan-card_title" @click="open(index)">{{item.planMessage}}</view>
			<view class="plan-card_del" @click="delplan(index)" v-if="!hideClose">
				<!-- <uni-icons type="closeempty" size="20"></uni-icons> -->
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		props: {
			planlist: {
				type: Array,
				default () {
					return []
				}
				// type: Object,
				// default () {
				// 	return {}
				// }
			},
			hideClose: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				
			};
		},
		methods:{
			delplan(index){
				this.planlist.splice(index,1)
			},
			open(index){
				const planlist = this.planlist
				// console.log(planlist[index]);
				this.$emit('click', planlist)
				const params = [
					{
						planmessage:planlist[index].planMessage,
						startTime:planlist[index].startTime,
						endTime:planlist[index].endTime,
					}
				]
				uni.navigateTo({
					url:'../../pages/plan-detail/plan-detail?params=' + JSON.stringify(params)
				})
			}
		}
	}
</script>

<style lang="scss">
	@import '/common/css/icons.css';

	.plan-card {
		background-color: #fff;
		.plan-box {
			padding: 10px 20px;
			display: flex;
			align-items: center;

			.plan-card_icons {
				.iconfont {
					font-size: 25px;
					color: red;
				}
			}

			.plan-card_title {
				margin-left: 10px;
				font-size: 16px;
				margin-right: auto;
			}
			.plan-card_del{

			}
		}

	}
</style>
