<template>
	<view class="login">
		<view class="login_close" @click="close">
			<uni-icons type="closeempty" size="30"></uni-icons>
		</view>
		<view class="login_header">
			<view class="login_header-logo">
				<image src="/static/logo.png"></image>
			</view>
			<view class="login_header-title">注册分分钟</view>
		</view>
		<view class="login_content">
			<view class="login_content-input">
				<form>
					<input type="email" value="" placeholder="邮箱" v-model="user.name" />
					<input type="password" value="" placeholder="请输入登录密码" v-model="user.password" />
					<button @click="logon">注册</button>
				</form>
			</view>
		</view>
		<view class="login_bottom">
			<view class="login_bottom-text">
				<text>注册即表示同意</text>
				<text @click="" class="login_bottom-text-agreement">用户协议、隐私条款</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user: []
			}
		},
		methods: {
			close() {
				uni.redirectTo({
					url: '../login/login'
				})
			},
			logon() {
				const url = this.apiServer + 'sign'
				this.$http.post(url, {
					name: this.user.name,
					password: this.user.password
				}).then(res => {
					const data = res.body
					if (data.message === 'SUCCESS') {
						uni.showToast({
							title: '注册成功',
							icon: 'none',
							duration: 1500
						});
						setTimeout(function() {
							uni.redirectTo({
								url: '../login/login'
							})
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

	}

	.login_bottom {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		margin-bottom: 20px;

		.login_bottom-text {
			margin-top: 15px;
			font-size: 10px;
			text-align: center;

			.login_bottom-text-agreement {
				color: blue;
			}
		}

	}
</style>
