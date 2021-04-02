<template>
	<view>
		<navbar index='mine' title="我的"></navbar>
		<view class="my-header">
			<view class="my-header_face">
				<view class="my-header_facebox" @click="updateFace">
					<image :src="info.firstIcon"></image>
				</view>
				<view class="my-header_msg">
					<text class="my-header_name">{{info.nickname}}</text>
					<text class="my-header_des">个人描述</text>
				</view>

				<view class="act">
					<view class="act_QR">
						<text class="iconfont icon-ico" style="font-size: 25px;"></text>
					</view>
					<view class="act_setting" @click="open_setting">
						<uni-icons type="gear" size="25" color="#FFF"></uni-icons>
					</view>
				</view>
			</view>
			<view class="my-header_hr"></view>
			<view class="my-header_info">
				<view class="my-header_infobox" @click="follow">
					<text class="my-header_infotitle">关注</text>
					<text>{{info1.follow}}</text>
				</view>
				<view class="my-header_infobox" @click="fans">
					<text class="my-header_infotitle">粉丝</text>
					<text>{{info1.fans}}</text>
				</view>
				<view class="my-header_infobox">
					<text class="my-header_infotitle">信用</text>
					<text>123</text>
				</view>

			</view>
		</view>
		<view class="my-function">
			<view class="my-function_list">
				<view class="my-function_box" @click="open_info">
					<text class="iconfont icon-geren"></text>
					<text>个人信息</text>
				</view>
				<view class="my-function_box" @click="open_collect">
					<text class="iconfont icon-iconfontzhizuobiaozhun23"></text>
					<text>我的收藏</text>
				</view>
				<view class="my-function_box" @click="open_file">
					<text class="iconfont icon-wenjian"></text>
					<text>我的文件</text>
				</view>
			</view>
			<view class="my-function_list">
				<view class="my-function_box" @click="open_jifen">
					<text class="iconfont icon-jifen"></text>
					<text>我的积分</text>
				</view>
				<view class="my-function_box" @click="open_plan">
					<text class="iconfont icon-wj-jh"></text>
					<text>我的计划</text>
				</view>
				<view class="my-function_box" @click="open_help">
					<text class="iconfont icon-help"></text>
					<text>帮助与反馈</text>
				</view>
			</view>

		</view>
		<view class="my-plan">
			<view class="title">我的计划</view>
			<view class="box">
				<view class="plan-box" v-for="item in planlist">
					<view class="name">
						<text>距离完成</text>
						<text class="content">{{item.planMessage}}</text>
						<text>任务</text>
					</view>
					<view class="days">
						<text>还有</text>
						<view class="content">{{item.day}}</view>
						<text>天</text>
					</view>

				</view>
			</view>

		</view>
	</view>
</template>

<script>
	var loginRes;
	export default {
		data() {
			return {
				
				info: {},
				info1: {},
				planlist: []
			}
		},
		onLoad() {
			loginRes = this.checkLogin('../tabbar/mine/mine', 2)
			if (!loginRes) {
				this.info = {}
				this.info1 = {}
				this.planlist = []
				
				return;
			} else {
				this.$http.get(this.apiServer + 'users/profile').then(res => {
					this.info = res.data.data;
					console.log(this.info.integral);
					uni.setStorageSync('firstIcon',this.info.firstIcon)
					uni.setStorageSync('integral',this.info.integral)
				})
				this.$http.get(this.Server + 'follow/myFollow').then(res => {
					this.info1.follow = res.body.data.length
				})
				this.$http.get(this.Server + 'follow/myFans').then(res => {
					this.info1.fans = res.body.data.length
				})
				this.getPlan()
				// this.info = []
			}
		},
		onShow() {
			loginRes = this.checkLogin('../tabbar/mine/mine', 2)
			if (!loginRes) {
				this.info = []
				this.info1 = []
				this.planlist = []
				return;
			} else {
				this.$http.get(this.apiServer + 'users/profile').then(res => {
					this.info = res.data.data;
				})
				this.$http.get(this.Server + 'follow/myFollow').then(res => {
					this.info1.follow = res.body.data.length
				})
				this.$http.get(this.Server + 'follow/myFans').then(res => {
					this.info1.fans = res.body.data.length
				})
				this.getPlan()
				// this.info = []
			}


		},
		methods: {
			getPlan() {
				const url = this.Server + 'plan/list?timeSlot=4'
				this.$http.get(url).then(res => {
					this.planlist = res.body.data.list
					var startDay, nowDay, dateSpan, tempDate, iDays;
					var date = new Date();
					var month = date.getMonth()
					if (month < 9) {
						var nowTime = date.getFullYear() + '-0' + Number(date.getMonth() + 1) + '-' + date.getDate();
					} else {
						var nowTime = date.getFullYear() + '-' + Number(date.getMonth() + 1) + '-' + date.getDate();
					}

					for (var i = 0; i < this.planlist.length; i++) {
						startDay = Date.parse(this.planlist[i].endTime);
						nowDay = Date.parse(nowTime);
						dateSpan = startDay - nowDay;
						iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
						this.planlist[i].day = iDays
					}
				})

			},
			
			updateFace() {
				let _this = this;
				uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
					count: 1, //默认选择1张图片
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					success: (res) => {
						uni.uploadFile({ //将本地资源上传到开发者服务器
							url: this.Server + 'fileup/upload', //接口地址
							filePath: res.tempFilePaths[0], //图片地址
							name: 'file',
							formData: {},
							header: {
								Authorization: uni.getStorageSync('token'), //加入token
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes);
								let res = JSON.parse(uploadFileRes.data)
								if(res.code==0){
									_this.updateAvatr(res.data)
								}
							}
						});
					}
				});
			},
			updateAvatr(avatar){
				let url = this.apiServer + 'users/profile/edit'
				this.$http.post(url, {firstIcon:avatar}).then(res => {
					if(res.body.code==0){
						uni.setStorageSync('firstIcon',avatar)
						this.info.firstIcon = avatar
					}else{
						uni.showToast({
							title:'修改失败',
							icon: 'none'
						})
					}
				})
			},
			open_jifen(){
				uni.navigateTo({
					url: '../../mine-jifen/mine-jifen'
				})
			},
			open_setting() {
				uni.navigateTo({
					url: '/pages/mine-setting/mine-setting'
				})
			},
			open_collect() {
				uni.navigateTo({
					url:'../../mine-collect/mine-collect'
				})
			},
			open_help() {
				uni.navigateTo({
					url: '/pages/mine-help/mine-help'
				})
			},
			// open_QR() {
			// 	uni.navigateTo({
			// 		url: '/pages/mine-QR/mine-QR'
			// 	})
			// },
			open_file(){
				uni.navigateTo({
					url:'../../mine-file/mine-file'
				})
			},
			open_info() {
				uni.navigateTo({
					url: '../../mine-info/mine-info'
				})
			},
			open_plan() {
				uni.navigateTo({
					url: '../../mine-plan/mine-plan'
				})
			},
			follow() {
			
				uni.navigateTo({
					url: '../../mine-follow/mine-follow'
				})
			},
			fans() {
				console.log(1);
				uni.navigateTo({
					url: '../../mine-fans/mine-fans'
				})
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f2f2f2;
		overflow: auto;
	}

	.my-header {
		margin: 10px;
		background-color: $mk-base-color;
		color: #FFF;
		border: 2px $mk-border-color solid;
		border-radius: 20px;
		padding-bottom: 10px;
		// border-top: 1px #999 solid;

		.my-header_face {
			display: flex;
			padding-top: 10px;

			.my-header_facebox {
				width: 60px;
				height: 60px;
				margin: 10px;
				border-radius: 50%;
				overflow: hidden;
				border: 1px #999 solid;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.my-header_msg {
				display: flex;
				flex-direction: column;
				margin-right: auto;
				margin-left: 10px;

				.my-header_name {
					margin-top: 10px;
					font-size: 16px;
					font-weight: bold;
				}

				.my-header_des {
					margin-top: 5px;
					font-size: 14px;
					// color: #999;
					color: #FFF;
				}
			}

			.act {
				display: flex;
				margin-top: 10px;

				.act_QR,
				.act_setting {
					margin-right: 10px;
					
				}
			}

		}

		.my-header_hr {
			// border-bottom: 1px #dcdcdc solid;
			height: 1px;
			width: 95%;
			margin: 0 auto;
		}

		.my-header_info {
			margin-top: 10px;
			display: flex;

			.my-header_infobox {
				display: flex;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				font-size: 12px;
				width: 100%;
				// color: #999;
				color: #FFF;

				.my-header_infotitle {
					font-size: 14px;
					// color: #333;
					color: #FFF;
				}
			}
		}
	}

	.my-function {
		margin: 10px;
		border: 2px $mk-base-color solid;
		color: $mk-base-color;
		border-radius: 20px;
		padding-bottom: 10px;
		.my-function_list {
			display: flex;

			.my-function_box {
				margin: 10px;
				display: flex;
				width: 100%;
				justify-content: center;
				flex-direction: column;
				align-items: center;
				text{
					font-weight: bold;
				}
				.iconfont {
					font-weight: normal;
					margin-bottom: 5px;
					font-size: 26px;
				}

			}

		}
	}

	.my-plan {
		border: 2px $mk-base-color solid;
		margin: 10px 0;
		padding: 10px;
		margin: 10px;
		border-radius: 20px;
		
		.title {
			text-align: center;
			font-weight: bold;
			font-size: 15px;
			margin-bottom: 10px;
		}

		.plan-box {
			display: flex;
			margin-bottom: 10px;
			padding: 10px 15px;
			border-radius: 20px;
			border: 1px $mk-border-color solid;
			background-color: #F3EEE4;
			
			&:last-child {
				margin-bottom: 0px;
			}

			.name {
				.content {
					color: $mk-base-color;
					font-weight: bold;
					margin: 0 5px;
				}
			}

			.days {
				display: flex;
				margin-left: auto;
			
				.content {
					color: red;
					text-align: center;
					width: 25px;
					font-weight: bold;
					font-size: 18px;
				}
			}
		}
	}
</style>
