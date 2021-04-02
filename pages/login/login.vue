<template>
	<view class="login">
		<view class="login_close" @click="close">
			<uni-icons type="closeempty" size="30"></uni-icons>
		</view>
		<view class="login_header">
			<view class="login_header-logo">
				<image src="/static/logo.png"></image>
			</view>
			<view class="login_header-title">登录分分钟</view>
		</view>
		<view class="login_content">
			<view class="login_content-input">
				<input type="text" value="" placeholder="账号或邮箱" v-model="user.name" />
				<input type="password" value="" placeholder="请输入登录密码" v-model="user.password" />
				<label>
					<checkbox style="transform:scale(0.7)" :checked="checked" @click="ischecked" />记住密码</label>
				<button @click="login">登录</button>
			</view>
			<view class="login_content-other">
				<text @click="find">忘记密码</text>
				<text @click="logon">立即注册</text>
			</view>
		</view>
		<view class="login_bottom">
			<view class="login_bottom-title">
				<view class="login_bottom-titleline"></view>
				<view class="login_bottom-titletext">其他登录方式</view>
				<view class="login_bottom-titleline"></view>
			</view>
			<view class="login_bottom-icons">
				<uni-icons type="qq" size="40"></uni-icons>
				<uni-icons type="weixin" size="40"></uni-icons>
				<uni-icons type="weibo" size="40"></uni-icons>
			</view>
			<view class="login_bottom-text">
				<text>登录即表示同意</text>
				<text @click="" class="login_bottom-text-agreement">用户协议、隐私条款</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: [],
				op: {},
				checked: true
			}
		},
		onLoad(options) {
			this.op = options
			this.user.name = uni.getStorageSync('login-user')
			this.user.password = uni.getStorageSync('login-pwd')
		},
		methods: {
			ischecked() {
				this.checked = !this.checked
				if (this.checked) {
					uni.setStorageSync('login-user', this.user.name);
					uni.setStorageSync('login-pwd', this.user.password);
				} else {
					uni.removeStorageSync('login-user')
					uni.removeStorageSync('login-pwd')
				}
				console.log(this.checked);
			},
			change(e) {
				console.log(e.detail.value);
			},

			close() {
				uni.switchTab({
					url: '../tabbar/index/index'
				})
			},
			logon() {
				uni.navigateTo({
					url: '../logon/logon'
				})
			},
			find() {
				uni.navigateTo({
					url: '../find-pwd/find-pwd'
				})
			},
			login() {
				const url = this.apiServer + 'login'
				console.log(this.checked);
				// if(!this.checked){
				// 	uni.removeStorageSync('login-user')
				// 	uni.removeStorageSync('login-pwd')
				// }
				this.$http.post(url, {
					name: this.user.name,
					password: this.user.password
				}).then(res => {
					const data = res.body
					if (data.message === 'SUCCESS') {
						const info = data.data.userDetail
						console.log(JSON.stringify(info));
						if(this.checked){
							uni.setStorageSync('login-user', this.user.name);
							uni.setStorageSync('login-pwd', this.user.password);
						}
						// else{
						// 	uni.removeStorageSync('login-user')
						// 	uni.removeStorageSync('login-pwd')
						// }
						uni.setStorageSync('id', info.id);
						uni.setStorageSync('name', info.username);
						uni.setStorageSync('token', data.data.token);
						// uni.setStorageSync('nickname',);
						uni.showToast({
							title: '登录成功',
							duration: 2000
						});
						let _this = this
						console.log(this.op.backpage);
						setTimeout(function() {
							if (_this.op.backpage == undefined) {
								console.log(1);
								uni.switchTab({
									url: '../tabbar/index/index'
								})
							}
							if (_this.op.backtype == 1) {
								uni.redirectTo({
									url: _this.op.backpage
								});
							} else {
								uni.switchTab({
									url: _this.op.backpage
								});
							}
						}, 2000)

					} else {
						uni.showToast({
							title: data.message,
							icon: 'none',
							duration: 1500
						});
					}
				})
			}
		}
	}
</script>

<style lang="scss">
	.login {
		.login_close {
			margin: 10px;
		}

		.login_header {
			.login_header-logo {
				width: 60px;
				height: 60px;
				margin: 0 auto;
				margin-top: 30px;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.login_header-title {
				text-align: center;
				font-size: 18px;
				font-weight: bold;
				margin-top: 20px;
				letter-spacing: 2px;
			}

		}

		.login_content {
			padding: 20px;
			display: flex;
			flex-direction: column;

			.login_content-input {
				width: 100%;

				&:first-child {}

				input {
					margin-bottom: 15px;
					height: 40px;
					border-bottom: #999 solid 1px;
					color: #999;
				}

				button {
					background-color: $mk-base-color;
					margin: 10px 0;
					font-size: 16px;
					color: #fff;
					border-radius: 20px;
				}
			}

			.login_content-other {
				display: flex;
				justify-content: space-between;
				padding: 0 5px;
				// color: blue; 
			}
		}

		.login_bottom {
			position: fixed;
			bottom: 0;
			left: 0;
			width: 100%;
			margin-bottom: 20px;

			.login_bottom-title {
				display: flex;
				align-items: center;
				padding: 0 15px;

				.login_bottom-titleline {
					border-top: 1px #999 solid;
					width: 100%;
				}

				.login_bottom-titletext {
					padding: 0 10px;
					white-space: nowrap;
				}
			}

			.login_bottom-icons {
				margin-top: 15px;
				display: flex;
				justify-content: space-between;
				padding: 0 40px;
			}

			.login_bottom-text {
				margin-top: 15px;
				font-size: 10px;
				text-align: center;

				.login_bottom-text-agreement {
					color: blue;
				}
			}
		}
	}
</style>
