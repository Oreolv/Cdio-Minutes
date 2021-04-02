<template>
	<view class="space">
		<navbar title="个人空间" index="space"></navbar>
		<view class="info">
			<view class="info-box">
				<text class="num">{{num[0]}}</text>
				<text class="title">高光</text>
			</view>
			<view class="info-box">
				<text class="num">{{num[1]}}</text>
				<text class="title">招募</text>
			</view>
			<view class="info-box">
				<text class="num">{{num[2]}}</text>
				<text class="title">悬赏</text>
			</view>

		</view>
		<list-scroll class="list-scroll">
			<list-card :key="index" :item="item" v-for="(item,index) in SpaceList" :Space="true"></list-card>
			<uni-popup ref="popup" type="top" :maskClick="true">
				<view class="popup-wrap">
					<view class="popup-title">发布</view>
					<view class="popup-close" @click="closePush">
						<uni-icons type="closeempty" size="30"></uni-icons>
					</view>
					<view class="popup-header">
						<view class="header-iconbox" @click="pushHightlight">
							<view class="header-iconbox_icons">
								<image src="../../../static/push_gg.png"></image>
							</view>
							<view class="header-iconbox_title">高光</view>
						</view>
						<view class="header-iconbox" @click="pushOffer">
							<view class="header-iconbox_icons">
								<image src="../../../static/push_xs.png"></image>
							</view>
							<view class="header-iconbox_title">悬赏</view>
						</view>
						<view class="header-iconbox" @click="pushRecruit">
							<view class="header-iconbox_icons">
								<image src="../../../static/push_zm.png"></image>
							</view>
							<view class="header-iconbox_title">招募</view>
						</view>
					</view>
			
				</view>
			</uni-popup>
			
		</list-scroll>
		<view class="push" @click="openPush">
			<image src="../../../static/push.png"></image>
		</view>
		
	</view>

</template>

<script>
	var loginRes;
	export default {
		data() {
			return {
				SpaceList: [],
				num: [0, 0, 0]
			}
		},
		onLoad(e) {
			console.log(e);
			
			loginRes = this.checkLogin('../tabbar/space/space', 2)
			if (loginRes) {
				this.getSpaceList()

			} else {
				this.SpaceList = []
				return;
			}
		},
		onShow() {
			loginRes = this.checkLogin('../tabbar/space/space', 2)
			console.log('onshow');
			const url = this.apiServer + 'users/userSpace?userId=' + uni.getStorageSync('id')
			this.$http.get(url).then(res => {
				this.$forceUpdate()
				this.SpaceList = res.body.data.postList;
				for (var i = 0; i < this.SpaceList.length; i++) {
					this.SpaceList[i].firstIcon = res.body.data.firstIcon
					this.SpaceList[i].nickname = res.body.data.nickname
					this.SpaceList[i].cost = -this.SpaceList[i].cost
				}
				this.SpaceList.sort(function(a, b) {
					return a.time < b.time ? -1 : 1
				});
			})
			if (loginRes) {
				// this.getSpaceList()
				// location.reload()

			} else {
				this.SpaceList = []
				return;
			}
		},
		methods: {
			openPush() {
				this.$refs.popup.open()
			},
			closePush() {
				this.$refs.popup.close()
			},
			pushRecruit() {
				uni.navigateTo({
					url: '../../push-zm/push-zm'
				})
				uni.setStorageSync('pushtag', '招募')
				this.$refs.popup.close()
			},
			pushOffer() {
				uni.navigateTo({
					url: '../../push-xs/push-xs'
				})
				uni.setStorageSync('pushtag', '悬赏')
				this.$refs.popup.close()
			},
			pushHightlight() {
				uni.navigateTo({
					url: '../../push-gg/push-gg'
				})
				// this.$emit()
				uni.setStorageSync('pushtag', '高光')
				this.$refs.popup.close()
			},
			getSpaceList() {
				const url = this.apiServer + 'users/userSpace?userId=' + uni.getStorageSync('id')
				this.$http.get(url).then(res => {
					this.SpaceList = res.body.data.postList;
					for (var i = 0; i < this.SpaceList.length; i++) {
						this.SpaceList[i].firstIcon = res.body.data.firstIcon
						this.SpaceList[i].nickname = res.body.data.nickname
						this.SpaceList[i].cost = -this.SpaceList[i].cost
					}
					this.getInfoNum()
					this.SpaceList.sort(function(a, b) {
						return a.time < b.time ? -1 : 1
					});
				})

			},
			getInfoNum() {
				for (var i = 0; i < this.SpaceList.length; i++) {
					if (this.SpaceList[i].tag == '招募') {
						// console.log(1);
						this.num[1]++
					}
					if (this.SpaceList[i].tag == '高光') {
						// console.log(1);
						this.num[0]++
					}
					if (this.SpaceList[i].tag == '悬赏') {
						// console.log(1);
						this.num[2]++
					}
				}
				console.log('yunxing');
			}

		}
	}
</script>

<style lang="scss">
	@import '/common/css/icons.css';

	page {
		height: 100%;
		display: flex;
		// flex: 1;
	}

	.space {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow: hidden;
		box-sizing: border-box;
		
		.list-scroll {
			height: 100%;
			flex: 1;
			box-sizing: border-box;
		}

		.info {
			display: flex;
			border-bottom: 1px #E5E5E5 solid;
			padding: 5px 0;

			.info-box {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				font-size: 12px;
				width: 100%;

				// border-right: 1px #f0f0f0 solid;
				// &:last-child{
				// 	border-right: none;
				// }
				// color: #999;
				.num {
					font-weight: bold;
					font-size: 16px;
				}

				.title {
					font-size: 14px;
					color: #999;
				}
			}
		}

		.push {
			position: fixed;
			right: 5px;
			bottom: 70px;
			// z-index: 999;
			height: 50px;
			width: 50px;

			image {
				height: 100%;
				width: 100%;
			}
		}

		.popup-wrap {
			margin: 10px 5px;
			background-color: #fff;
			opacity: 0.95;
			// height: 100vh;
			border-radius: 20px;

			.popup-title {
				padding-top: 10px;
				padding-left: 20px;
				// text-align: center;
				font-weight: bold;
				font-size: 20px;
			}

			.popup-close {
				position: fixed;
				right: 15px;
				top: 15px;
			}

			.popup-header {
				display: flex;
				justify-content: space-between;

				.header-iconbox {
					display: flex;
					align-items: center;
					flex-direction: column;
					padding: 20px 30px;

					.header-iconbox_icons {
						height: 45px;
						width: 45px;

						image {
							height: 100%;
							width: 100%;
						}
					}

					.header-iconbox_title {
						margin-top: 10px;
						font-size: 18px;
						color: #666;
					}
				}
			}
		}
	}
</style>
