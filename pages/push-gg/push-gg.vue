<template>
	<view>
		<navbar title="高光" isPush :pushInfo="pushInfo"></navbar>
		<view class="pushoffer-content">
			<textarea placeholder="分享新鲜事..." v-model="pushInfo.pubMessage"></textarea>
			<view class="pushoffer-content_costbox">
				<view class="filename" v-for="item in upFile">
					<view class="name">图片：{{item.name}}</view>
				</view>
				<view class="upfile" @click="uploadFile">
					<image src="../../static/upfile.png" mode=""></image>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				pushInfo: {},
				upFile:[],
				pic:''
			}
		},
		onShow() {
			// console.log(this.pushInfo.pubPicture);
		},
		methods: {
			uploadFile(){
				let _this = this;
				uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
					count: 3, //默认选择1张图片
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					success: (res) => {
						this.upFile = res.tempFiles
						console.log(res);
						for (var i = 0; i < 3; i++) {
							uni.uploadFile({ //将本地资源上传到开发者服务器
								url: this.Server + 'fileup/upload', //接口地址
								filePath: res.tempFilePaths[i], //图片地址
								name: 'file',
								formData: {},
								header: {
									Authorization: uni.getStorageSync('token'), //加入token
								},
								success: (uploadFileRes) => {
									let res = JSON.parse(uploadFileRes.data)
									// console.log(res.data);
									if(res.data.indexOf("file")==-1){
										this.pushInfo.pubPicture = this.pushInfo.pubPicture + res.data + ',';
										uni.setStorageSync('pic',this.pushInfo.pubPicture)
									}
									// console.log(this.pushInfo.pubPicture);
								},
								
								
							});
						}
					}
				});
				// this.pushInfo.pubPicture = this.pic.substring(0, this.pic.lastIndexOf(','));
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.pushoffer-content {
		margin-top: 15px;
		padding: 10px;
		background-color: #fff;
		height: 100%;
	}
	textarea{
		height: 100px;
		width: 100%;
	}
	.pushoffer-content_costbox {
		display: flex;
		flex-direction: column;
		.upfile{
			margin-top: 10px;
			image {
				width: 120px;
				height: 120px;
			}
		}
		.filename{
			.name{
				font-size: 12px;
				color: $mk-base-color;
				font-weight: bold;
			}
		}
		.cost{
			display: flex;
			margin-left: auto;
			margin-top: auto;
			input{
				border-bottom: 1px #999 solid;
				width: 30px;
				text-align: center;
			}
		}
	}
</style>
