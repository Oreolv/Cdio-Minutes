<template>
	<view class="info">
		<view class="info-header">
			<image :src="info.firstIcon"></image>
		</view>
		<view class="edit-face" @click="updateFace">
			更换头像
		</view>
		<view class="info-content">
			<view class="content-box">
				<view class="title">昵称：</view>
				<view class="content">
					<input v-model="info.nickname" value="nick" />
				</view>
			</view>
			<view class="content-box">
				<view class="title">生日：</view>
				<view class="content">
					<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="binddateChange">
						<view class="date-content">{{date}}</view>
					</picker>
				</view>
			</view>
			<view class="content-box">
				<view class="title">性别：</view>
				<view class="content">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="uni-input">{{array[index]}}</view>
					</picker>
				</view>
			</view>
			<view class="content-box">
				<view class="title">城市：</view>
				<view class="content">
					<pickers @address="address" @close="close" :defaultAddress="defaultAddress">
						<view>{{area}}</view>
					</pickers>
				</view>
			</view>
			<view class="content-box">
				<view class="title">学校：</view>
				<view class="content">
					<input v-model="info.school" placeholder="请输入学校" />
				</view>
			</view>
			<view class="content-box">
				<view class="title">学院：</view>
				<view class="content">
					<input v-model="info.department" placeholder="请输入学院" />
				</view>
			</view>
			<view class="content-box">
				<view class="title">专业：</view>
				<view class="content">
					<input v-model="info.profession" placeholder="请输入专业" />
				</view>
			</view>
		</view>
		<view class="info-submit">
			<button @click="submit">提交</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				info: [],
				date: currentDate,
				defaultAddress: ["北京市", "市辖区", "东城区"],
				area: "请选择地区",
				array: ['男', '女'],
				index: 0,
			}
		},
		onLoad(query) {
			this.info = JSON.parse(query.params)
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			face(){
				
			},
			binddateChange(e) {
				this.date = e.target.value
			},
			bindPickerChange(e) {
				this.index = e.detail.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			address(e) {
				// console.log("点击了确认")
				// console.log(e.value[1]);
				if (e.value[1] == '市辖区') {
					this.area = e.value[0] + '-' + e.value[2]
				} else {
					this.area = e.value.join("-");
				}
				// this.area = e.value.join("-");
			},
			close() {
				console.log("点击了取消")
			},
			submit() {
				var token = uni.getStorageSync('token')
				this.info.birthday = this.date
				this.info.sex = this.index
				this.info.province = this.area
				const url = this.apiServer+'users/profile/edit'
				this.$http.post(url,{
							birthday: this.info.birthday,
							city: this.info.city,
							department: this.info.department,
							firstIcon: this.info.firstIcon,
							nickname: this.info.nickname,
							profession: this.info.profession,
							province: this.info.province,
							school: this.info.school,
							sex: this.info.sex
						}).then(res => {
				})
				uni.showToast({
					title: '提交成功',
					duration: 2000
				})
				setTimeout(function() {
					uni.switchTab({
						url:'../tabbar/mine/mine'
					})
				}, 2000)
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
									_this.info.firstIcon=res.data
								}
							}
						});
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	.info-header {
		height: 70px;
		width: 70px;
		border-radius: 50%;
		overflow: hidden;
		margin: 20px auto;

		image {
			height: 100%;
			width: 100%;

		}
	}

	.info-content {
		margin-top: 30px;

		.content-box {
			display: flex;
			border-bottom: 1px #999 solid;
			margin: 0 15px;
			padding-bottom: 10px;
			margin-bottom: 15px;

			.content {
				color: $mk-base-color;
			}
		}
	}

	.info-submit {
		button {
			width: 150px;
			background-color: $mk-base-color;
			color: #fff;
			margin-top: 20px;
			border-radius: 30px;
			font-weight: bold;
		}
	}
	.edit-face{
		text-align: center;
		color: $mk-base-color;
	}
</style>
