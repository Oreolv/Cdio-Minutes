<template>
	<view class="plan-detail">
		<view class="plan-detailbox">
			<view class="plan-detail_plan">
				<view class="plan-card_icons">
					<text class="iconfont icon-rili"></text>
				</view>
				<view class="plan-card_title">{{formData[0].planmessage}}</view>
			</view>
			<view class="plan-detail_time">开始时间：{{formData[0].startTime}}</view>
			<view class="plan-detail_time">结束时间：{{formData[0].endTime}}</view>
			<view class="plan-detail_content">
				<textarea placeholder="记录下完成任务的感受吧..." v-model="msg"></textarea>
			</view>


			<view class="plan-detail_gg">
				<label>
					<checkbox :checked="checked" @click="checked = !checked" style="transform:scale(0.7)" />发表高光时刻</label>
				<button @click="submit">完成</button>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: [],
				checked: true,
				msg: ''
			}
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			console.log(this.formData[0]);
		},
		methods: {
			submit() {
				const url = this.Server + 'publish/save'
				this.$http.post(url, {
					cost: 0,
					pubMessage: this.msg,
					pubPicture: '',
					tag: '高光'
				}).then(res=>{
					console.log(res);
				})
				uni.showToast({
					title: '发布成功',
					icon: 'none',
					duration: 2000
				})
				setTimeout(function() {
					uni.switchTab({
						url: '../tabbar/space/space'
					})
				}, 2000)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.plan-detail {
		.plan-detailbox {
			background-color: #fff;
			margin-top: 10px;

			// padding: 20px;
			.plan-detail_plan {
				// margin-top: 20px;
				display: flex;
				margin-bottom: 20px;
				align-items: center;
				padding-top: 20px;
				// margin: 0 20px;
			}

			.plan-detail_time {
				margin: 0 20px;
				margin-top: 10px;
			}

			.plan-detail_content {
				// margin-top: 10px;
				display: flex;
				justify-content: center;
				border: 1px #999 solid;
				border-radius: 20px;
				margin: 15px;

				textarea {
					width: 100%;
					padding: 20px;
				}
			}

			.plan-detail_gg {
				display: flex;
				justify-content: center;
				flex-direction: column;
				padding: 20px;

				button {
					margin-top: 20px;
					width: 200px;
					color: #fff;
					border-radius: 20px;
					background-color: $mk-base-color;
				}
			}
		}

		.plan-card_icons {
			margin-left: 20px;

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
	}
</style>
