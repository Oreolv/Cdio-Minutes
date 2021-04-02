<template>
	<view class="jifen">
		<view class="header">
			<view class="face">
				<image :src="list.firstIcon" mode=""></image>
			</view>
			<view class="box">
				<view class="top-box">
					<view class="title">我的积分</view>
					<view class="num" v-if="num">{{list.integral}}</view>
					<view class="record" @click="record">积分记录</view>
				</view>
				<view class="btm-box">
					可通过每日签到，分享，揭榜等形式来获取积分；积分可用来抵扣一定金额
				</view>
			</view>

		</view>
		<view class="content">
			<view class="head-icons">
				<view class="icons-box" @click="sign">
					<text class="iconfont icon-qiandao"></text>
					<view class="title">签到</view>
				</view>
				<view class="icons-box">
					<text class="iconfont icon-fuli"></text>
					<view class="title">福利</view>
				</view>
				<view class="icons-box">
					<text class="iconfont icon-yue"></text>
					<view class="title">余额</view>
				</view>
				<view class="icons-box">
					<text class="iconfont icon-icon-test"></text>
					<view class="title">充值</view>
				</view>
			</view>
			<view class="method">
				<view class="title">更多获取积分的方法</view>
				<view class="list-box">
					<text class="iconfont icon-qiandao"></text>
					<view class="list">
						<view class="list-title">完成今日签到</view>
						<view class="list-num">20 积分</view>
					</view>
				</view>
				<view class="list-box">
					<text class="iconfont icon-qiandao"></text>
					<view class="list">
						<view class="list-title">浏览关注的人的动态</view>
						<view class="list-num">20 积分</view>
					</view>
				</view>
				<view class="list-box">
					<text class="iconfont icon-qiandao"></text>
					<view class="list">
						<view class="list-title">发布动态</view>
						<view class="list-num">20 积分</view>
					</view>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="center" :maskClick="true">
			<view class="pop-wrap">
				<view class="title">积分记录</view>
				<view class="list" v-for="item in newList">
					<view class="event">{{item.event}}</view>
					<view class="cost">{{item.cost}}</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list: [],
				recordList1: [],
				recordList2: [],
				newList: [],
				num: true
			}
		},
		methods: {
			record() {
				this.$http.get(this.Server + 'integralHis/list?pageNum=1&pageSize=9999999&type=1').then(res => {
					this.recordList1 = res.body.data.list;
					for (var i = 0; i < this.recordList1.length; i++) {
						this.recordList1[i].cost = '+'+this.recordList1[i].cost
					}
				})
				this.$http.get(this.Server + 'integralHis/list?pageNum=1&pageSize=9999999&type=2').then(res => {
					this.recordList2 = res.body.data.list;
				})
				let _this = this
				this.$refs.popup.open()
				setTimeout(function() {
					_this.newList = _this.recordList1.concat(_this.recordList2)
				}, 100)

				console.log(this.newList.length);
			},
			getInfo() {
				const url = this.apiServer + 'users/profile'
				this.$http.get(url).then(res => {
					this.list = res.data.data
				})

			},
			sign() {
				const url = this.Server + 'sign/save'
				this.$http.post(url).then(res => {
					console.log(res);
				})
				this.num = false
				this.getInfo()
				uni.showToast({
					title: '签到成功',
					duration: 2000
				});
				let _this = this
				setTimeout(function() {
					_this.num = true
					_this.getInfo()
				}, 2000)

				this.getInfo()
				this.$forceUpdate()
				this.$forceUpdate()
			}

		},
		onShow() {
			this.getInfo()
			this.$forceUpdate()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
		height: 100%;
		overflow: auto;
	}

	.header {
		display: flex;
		border-radius: 20px;
		background-color: #FFF;
		padding: 10px;
		margin: 10px;
		border: 2px $mk-border-color solid;

		.face {
			flex-shrink: 0;
			width: 80px;
			height: 80px;
			border-radius: 50%;
			border: 2px $mk-base-color solid;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.box {
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			margin: 5px 10px;

			.top-box {
				display: flex;

				.title {
					font-weight: bold;
				}

				.num {
					margin-left: 5px;
					font-weight: bold;
					color: $mk-base-color;
				}

				.record {
					margin-left: auto;
					text-decoration: underline;
				}
			}

			.btm-box {
				font-size: 13px;
				color: #999;
			}
		}

	}

	.content {
		display: flex;
		border-radius: 20px;
		background-color: #FFF;
		flex-direction: column;
		padding: 10px;
		margin: 10px;
		border: 2px #999 solid;

		.head-icons {
			display: flex;
			justify-content: space-between;
			width: 100%;

			.icons-box {
				text-align: center;
				margin: 10px;

				.iconfont {
					border-radius: 50%;
					padding: 8px;
					font-size: 30px;
					color: #FFF;
					background-color: $mk-base-color;
				}

				.title {
					margin-top: 10px;
				}
			}
		}

		.method {
			.title {
				font-weight: bold;
				color: $mk-border-color;
				margin: 10px;
				font-size: 18px;
			}

			.list-box {
				display: flex;
				align-items: center;
				margin-bottom: 15px;

				.list {
					display: flex;
					flex-direction: column;
					margin-left: 10px;

					.list-title {
						font-weight: bold;
					}

					.list-num {
						font-size: 12px;
						color: #999;
					}
				}

				.iconfont {
					// padding: 8px;
					font-size: 50px;
					margin-left: 10px;
				}
			}
		}
	}

	.pop-wrap {
		height: 500px;
		background-color: #FFF;
		overflow: auto;
		padding: 20px;
		border-radius: 20px;
		.title {
			font-weight: bold;
			text-align: center;
			margin-bottom: 10px;
		}

		.list {
			display: flex;

			.event {
				margin-right: auto;
			}

			.cost {
				color: $mk-base-color;
				font-weight: bold;
				margin-left: 20px;
			}
		}
	}
</style>
