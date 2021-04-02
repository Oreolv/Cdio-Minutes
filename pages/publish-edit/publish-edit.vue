<template>
	<view class="edit">
		<view class="header">
			<view class="header_face">
				<image :src="formData.face" mode="aspectFill"></image>
			</view>
			<view class="header-content">
				<view class="header-content-title">
					{{formData.name}}
				</view>
				<view class="header-content-info">
					<text>{{formData.time}}</text>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="msg">
				<textarea v-model="formData.content" />
			</view>
			<view class="img-box two" v-if="formData.picNum==2">
				<view class="img" v-if="formData.pic[0]!=''" v-for="(p,i) in formData.pic">
					<image :src="p" lazy-load>
						<uni-icons type="closeempty" color="#FFF" class="close" @click="close(i)"></uni-icons>
					</image>
				</view>
				<view class="upfile" v-if="formData.picNum<3" @click="uploadFile">
					<image src="../../static/upfile.png" mode=""></image>
				</view>
			</view>
			<view class="img-box oth" v-else>
				<view class="img" v-if="formData.pic[0]!=''" v-for="(p,i) in formData.pic">
					<image :src="p" lazy-load>
						<uni-icons type="closeempty" color="#FFF" class="close" @click="close(i)"></uni-icons>
					</image>
					
				</view>
				<view class="upfile" v-if="formData.picNum<3" @click="uploadFile">
					<image src="../../static/upfile.png" mode=""></image>
				</view>
			</view>
			
			<view class="bottom">
				<view class="tag">
					<text class="name">类型：</text>{{formData.tag}}
				</view>
				<view class="reward" v-if="formData.tag!='高光'">
					<text class="name">积分：</text>
					<input type="text" value="" v-model="formData.reward" />
				</view>
			</view>
			
		</view>
		<button type="default" @click="submit">提交</button>
	</view>
</template>

<script>
	export default {
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			console.log(this.formData);
		},
		data() {
			return {
				formData:[]
			}
		},
		methods: {
			uploadFile() {
				console.log(this.formData.pic);
				let _this = this;
				uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
					count: 3-this.formData.pic.length, //默认选择1张图片
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					success: (res) => {
						// this.upFile = res.tempFiles
						console.log(res.tempFiles);
						for (var i = 0; i < 3-this.formData.pic.length; i++) {
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
									console.log(res.data);
									
									if (res.data.indexOf("file") == -1) {
										this.formData.pic.push(res.data)
										this.formData.picNum = this.formData.pic.length
										this.$forceUpdate()
									}
								},
							});
						}
						
					}
				});
			},
			close(i){
				this.formData.pic.splice(i,1);
				this.formData.picNum = this.formData.pic.length
				this.$forceUpdate()
			},
			submit(){
				const url = this.Server+'publish/update'
				for (var i = 0; i < this.formData.pic.length; i++) {
					if(this.formData.pic[i]!=undefined){
						this.formData.pic1 = this.formData.pic1+this.formData.pic[i]+','
					}
				}
				this.formData.pic1 = this.formData.pic1.substring(9, this.formData.pic1.length-1)
				console.log(this.formData.pic1);
				this.$http.post(url,{
					cost: -this.formData.reward,
					id: this.formData.id,
					pubMessage: this.formData.content,
					pubPicture: this.formData.pic1,
					tag: this.formData.tag
				}).then(res => {
				  console.log(res);
				})
				uni.showToast({
				  title: '修改成功',
				});
				let _this = this
				setTimeout(function() {
				  uni.switchTab({
				  	url:'../tabbar/space/space'
				  })
				}, 1500)
			}
			
		}
	}
</script>

<style lang="scss">
	.upfile{
		width: 100px;
		height: 100px;
		border: 1px #ECECEC solid;
		image {
			width: 100%;
			height: 100%;
		}
	}
	button{
		width: 80%;
		margin-top: 20px;
		background-color: $mk-base-color;
		color: #FFF;
	}
	.edit{
		padding: 15px 0;
	}
	.header {
		display: flex;
		align-items: center;
		padding: 0 15px;
	
		.header_face {
			flex-shrink: 0;
			width: 50px;
			height: 50px;
			border-radius: 50%;
			overflow: hidden;
	
			image {
				width: 100%;
				height: 100%;
			}
		}
	
		.header-content {
			width: 100%;
			padding-left: 10px;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			font-size: 12px;
	
			.header-content-title {
				font-size: 16px;
				padding-bottom: 10px;
				color: #333;
			}
	
			.header-content-info {
				color: #999;
	
				text {
					font-size: 14px;
					margin-right: 10px;
				}
			}
		}
	
		
	}
	.content{
		padding: 15px;
		border: 1px #ECECEC solid;
		margin: 10px;
		border-radius: 10px;
		.msg{
			textarea{
				// padding: 10px;
				width: 94%;
				height: 100px;
			}
		}
		.img-box {
			display: flex;
			margin-top: 10px;
			&.two{
				justify-content:flex-start;
				.img{
					width: 100px;
					height: 100px;
					border: 1px #ECECEC solid;
					margin-right: 20px;
					.close{
						position: absolute;
						margin-left: -10px;
						margin-top: -10px;
						border: 1px red solid;
						background-color: red;
						border-radius: 50%;
					}
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
			&.oth{
				justify-content: space-between;
				.img{
					width: 100px;
					height: 100px;
					border: 1px #ECECEC solid;
					.close{
						position: absolute;
						margin-left: -10px;
						margin-top: -10px;
						border: 1px red solid;
						background-color: red;
						border-radius: 50%;
					}
					image {
						width: 100%;
						height: 100%;
					}
				}
			}
		}
		.bottom{
			display: flex;
			width: 100%;
			color: $mk-base-color;
			font-weight: bold;
			margin-top: 10px;
			.reward{
				display: flex;
				margin-left: auto;
				// text-align: right;
				input{
					width: 30px;
					border-bottom: 1px #999 solid;
					text-align: center;
				}
			}
		}
	}
</style>
