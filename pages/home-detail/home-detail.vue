<template>
	<view class="detail">
		<view class="detail-header">
			<view class="detail-header_face">
				<image :src="formData.face" mode="aspectFill"></image>
			</view>
			<view class="detail-header_content">
				<view class="detail-header_content-title">
					{{formData.name}}
				</view>
				<view class="detail-header_content-info">
					<text>{{formData.time}}</text>
					<text>{{formData.supportCount>0?formData.supportCount:''}} 赞</text>
				</view>
			</view>
			<button class="detail-header_fans" v-if="this.userIdS!=formData.userId" @click="addFollow">{{status}}</button>
		</view>

		<view class="detail-content">
			{{formData.content}}
			<view class="img-box two" v-if="formData.picNum==2">
				<view class="img" v-if="formData.pic[0]!=''" v-for="(p,i) in formData.pic">
					<image :src="p" lazy-load  @click="previewImage(i)"></image>
				</view>
			</view>
			<view class="img-box oth" v-else>
				<view class="img" v-if="formData.pic[0]!=''" v-for="(p,i) in formData.pic">
					<image :src="p" lazy-load  @click="previewImage(i)"></image>
				</view>
			</view>
			<view class="detail-reward" v-if="formData.tag != '高光' && this.userIdS!=formData.userId">
				<text>奖励：{{formData.reward}} 积分</text>
				<button>接受{{formData.type}}</button>
			</view>
			<view class="detail-reward" v-if="formData.tag != '高光' && this.userIdS==formData.userId">
				<text>奖励：{{formData.reward}} 积分</text>
				<text class="jieshou">无人接受{{formData.type}}</text>
			</view>

			<view class="detail-comment">
				<view class="detail-comment_title">最新评论</view>
				<view class="detail-comment_content" v-for="item in commentsList" :key="item.index">
					<comments-box :comments="item"></comments-box>
				</view>
			</view>
		</view>
		<view class="detail-bottom">
			<view class="detail-bottom_input" @click="openComment">
				<input placeholder="评论" value=""></input>
				<uni-icons type="compose" size="16"></uni-icons>
			</view>
			<view class="detail-bottom_icons">
				<view class="detail-bottom_icons-box" @click="openRate">
					<uni-icons class="detail-bottom_icons-boxicon" type="star" size="22"></uni-icons>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="popup-wrap">
				<view class="popup-header">
					<text class="popup-header_item" @click="closeComments">取消</text>
					<text class="popup-header_item" @click="submit">发布</text>
				</view>
				<view class="popup-header_content">
					<textarea class="popup-header_content-textarea" v-model="commentsValue" fixed placeholder="请输入评论内容" maxlength="200"
					 ref="textarea"></textarea>
					<view class="filename" v-for="item in upFile">
						<view class="name">图片：{{item.name}}</view>
					</view>
					<view class="upfile" @click="uploadFile">
						<image src="../../static/upfile.png" mode=""></image>
					</view>
					<view class="bottom">
						<view class="popup-header_content-count">{{commentsValue.length}}/200</view>
					</view>
				</view>

			</view>
		</uni-popup>
		<uni-popup ref="popup1" type="center" :maskClick="false">
			<view class="rate-wrap">
				<view class="title">对此打分</view>
				<view class="rate">
					<uni-rate :max="5" @change="onChange" v-model="rateValue"></uni-rate>
					<view class="value">{{rateValue}} 分</view>
				</view>
				<button @click="submitRate" class="submit">提交</button>
				<button @click="edit" class="edit">取消</button>
			</view>

		</uni-popup>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData: {},
				commentsValue: '',
				commentsList: [],
				upFile:[],
				userIdS: 0,
				status: '关注',
				rateValue: 5,
				picNum: 0,
				pic:''
			}
		},
		onLoad(query) {
			this.userIdS = uni.getStorageSync('id')
			this.formData = JSON.parse(query.params)
			console.log(JSON.parse(query.params));
			this.getCommentList()
		},
		methods: {
			previewImage(index) {
						let photoList = this.formData.pic.map(i => {
							return i;
						});
						uni.previewImage({
							current: index,
							urls: photoList
						});
					},
			uploadFile() {
				let _this = this;
				uni.chooseImage({ // 从本地相册选择图片或使用相机拍照。
					count: 3, //默认选择1张图片
					sizeType: ['original', 'compressed'], //original 原图，compressed 压缩图，默认二者都有
					success: (res) => {
						this.upFile = res.tempFiles
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
									console.log(res.data);
									if (res.data.indexOf("file") == -1) {
										this.pic = this.pic + res.data + ',';
									}
									// console.log(this.pushInfo.pubPicture);
								},
							});
						}
						
					}
				});
				// this.pushInfo.pubPicture = this.pic.substring(0, this.pic.lastIndexOf(','));
			},

			addFollow() {
				const url = this.Server + 'follow/addFollow?followId=' + this.formData.userId
				this.$http.get(url).then(res => {
					this.status = '互相关注'
					console.log(res);
				})
			},
			edit() {
				this.$refs.popup1.close()
			},
			openRate() {
				if (this.commentsList[0].point == 0) {
					this.$refs.popup1.open()
				} else {
					uni.showToast({
						title: '请勿重复打分',
						icon: 'none'
					})
				}
			},
			submitRate() {
				console.log(this.formData);
				const url = this.Server + 'mark/save'
				this.$http.post(url, {
					createTime: '2021-03-02T14:52:05.013Z',
					id: 0,
					point: this.rateValue,
					publishId: this.formData.id,
					userId: this.formData.userId
				}).then(res => {
					uni.showToast({
						title: '评分成功',
						icon: 'none',
						duration: 2000
					})
					setTimeout(function() {
						location.reload()
					}, 2000)
				})
			},
			onChange(e) {
				this.rateValue = e.value
			},
			openComment() {
				this.$refs.popup.open()
			},
			closeComments() {
				this.$refs.popup.close()
			},
			submit() {
				if (!this.commentsValue) {
					uni.showToast({
						title: '评论不能为空',
						icon: "none"
					});
				}
				const url = this.Server + 'review/save'
				this.$http.post(url, {
					message: this.commentsValue,
					reId: this.formData.id,
					tag: this.formData.tag,
					point:0,
					image:this.pic
				}).then(res => {
					console.log(res);
				})
				uni.showToast({
					title: '评论成功',
					icon: "none"
				});
				this.$forceUpdate()
				let _this = this
				setTimeout(function() {
					_this.$forceUpdate()
					_this.getCommentList()
					_this.$refs.popup.close()
					_this.commentsValue = ''
				}, 2000)

			},
			getCommentList() {
				const url = this.Server + 'publish/info?id=' + this.formData.id
				this.$http.get(url).then(res => {
					this.commentsList = res.body.data.reviewDtoList;
					console.log(this.commentsList);
				})
			}

		}
	}
</script>

<style lang="scss">
	.img-box {
		display: flex;
		margin-top: 10px;

		&.two {
			justify-content: flex-start;

			.img {
				width: 100px;
				height: 100px;
				margin-right: 43px;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}

		&.oth {
			justify-content: space-between;

			.img {
				width: 100px;
				height: 100px;

				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}

	.upfile {
		margin-top: 10px;

		image {
			width: 120px;
			height: 120px;
		}
	}

	.filename {
		.name {
			font-size: 12px;
			color: $mk-base-color;
			font-weight: bold;
		}
	}

	.detail {
		padding: 15px 0;
		padding-bottom: 54px;

		.detail-header {
			display: flex;
			align-items: center;
			padding: 0 15px;

			.detail-header_face {
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

			.detail-header_content {
				width: 100%;
				padding-left: 10px;
				display: flex;
				flex-direction: column;
				justify-content: space-between;
				font-size: 12px;

				.detail-header_content-title {
					font-size: 16px;
					padding-bottom: 10px;
					color: #333;
				}

				.detail-header_content-info {
					color: #999;

					text {
						font-size: 14px;
						margin-right: 10px;
					}
				}
			}

			.detail-header_fans {
				flex-shrink: 0;
				font-size: 12px;
				background-color: $mk-base-color;
				color: #fff;
			}
		}

		.detail-content {
			margin-top: 10px;
			padding: 0 15px;

			.detail-reward {
				margin-top: 20px;
				display: flex;
				width: 100%;
				align-items: center;

				.jieshou {
					text-align: right;
					font-weight: normal;
					color: $mk-base-color;
				}

				text {
					font-weight: bold;
					width: 100%;
				}

				button {
					font-size: 12px;
					background-color: red;
					color: #fff;
					border-radius: 10px;
					flex-shrink: 0;
				}
			}

			.detail-comment {
				margin-top: 30px;

				.detail-comment_title {
					padding: 10px 0px;
					font-size: 14px;
					color: #666;
					border-bottom: 1px #f5f5f5 solid;

					.detail-comment_content {
						padding: 0 15px;
						border-top: #eee 1px solid;

					}
				}
			}
		}

		.detail-bottom {
			position: fixed;
			left: 0;
			bottom: 0;
			display: flex;
			align-items: center;
			width: 100%;
			height: 44px;
			border-top: 1px #f5f5f5 solid;
			background-color: #fff;
			box-sizing: border-box;

			.detail-bottom_input {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-left: 10px;
				padding: 0 10px;
				width: 100%;
				height: 30px;
				border: 1px #ddd solid;
				border-radius: 5px;

				text {
					font-size: 14px;
					color: #999;
				}
			}

			.detail-bottom_icons {
				display: flex;
				flex-shrink: 0;
				padding: 0 10px;

				.detail-bottom_icons-box {
					display: flex;
					align-items: center;
					// width: 44px;

					.detail-bottom_icons-boxicon {
						// padding-right: 10px;
						padding: 2px;
					}
				}
			}
		}

		.popup-wrap {
			background-color: #fff;

			.popup-header {
				display: flex;
				justify-content: space-between;
				font-size: 14px;
				color: #666;
				border-bottom: #f5f5f5 1px solid;

				.popup-header_item {
					height: 50px;
					line-height: 50px;
					padding: 0 15px;
				}
			}

			.popup-header_content {
				width: 100%;
				padding: 15px;
				box-sizing: border-box;

				.popup-header_content-textarea {
					width: 100%;
					color: 200px;
				}

				.bottom {
					display: flex;

					.popup-header_content-rate {}

					.popup-header_content-count {
						display: flex;
						justify-content: flex-end;
						font-size: 12px;
						color: #999;
						margin-left: auto;
					}
				}



			}
		}
	}

	.rate-wrap {
		background-color: #FFF;
		padding: 20px;
		border-radius: 20px;

		.title {
			font-weight: bold;
			text-align: center;
			margin-bottom: 20px;
		}

		.rate {
			display: flex;
			align-items: center;

			.value {
				margin-left: 10px;
			}
		}
	}

	.submit {
		margin-top: 10px;
		color: $mk-base-color;
	}

	.edit {
		margin-top: 10px;
		color: $mk-base-color;
	}
</style>
