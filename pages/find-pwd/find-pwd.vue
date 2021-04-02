<template>
	<view>
		<view class="title">请输入你注册分分钟的邮箱账号</view>
		<view class="input">
			<input type="text" value="" placeholder="请输入邮箱" v-model="email" />
			<input type="text" value="" placeholder="请输入新密码" v-model="password" />
			<view class="code-box">
				<input type="text" value="" placeholder="请输入验证码" v-model="codeU" />
				<text class="code-content" @click="code">{{codeT}}</text>
			</view>

		</view>
		<button type="default" @click="submit">确定</button>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				codeT: '点击获取验证码',
				codeU: '',
				email: '',
				password: ''
			}
		},
		methods: {
			code() {
				const url = this.apiServer + 'captcha?email=' + this.email
				this.$http.post(url).then(res => {
					if (res.body.message == 'email不能为空') {
						uni.showToast({
							title: '邮箱不能为空',
							icon: 'none'
						})
					} else {
						uni.showToast({
							title: '获取成功',
							icon: 'none'
						})
						console.log(res);
						this.codeT = res.body.data
					}
				})
			},
			submit() {
				const url = this.apiServer + 'resetPwd'
				this.$http.post(url, {
					captcha: this.codeU,
					email: this.email,
					password: this.password
				}).then(res => {
					console.log(res);
					if (res.body.message == 'SUCCESS') {
						uni.showToast({
							title: '修改成功',
							icon: 'none'
						})
						setTimeout(function() {
							uni.redirectTo({
								url:'../login/login'
							})
						}, 2000)
					} else {
						uni.showToast({
							title: res.body.message,
							icon: 'none'
						})
					}

				})
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f5f5f5;
	}

	.title {
		font-size: 12px;
		color: #999;
		margin: 15px;
	}

	.input {
		input {
			background-color: #fff;
			border-top: 1px #f0f0f0 solid;
			// margin-bottom: 20px;
			padding: 10px;
			font-size: 14px;
			color: #999;

			&:last-child {
				border-bottom: 1px #f1f1f1 solid;
			}
		}
	}

	.code-box {
		display: flex;
		align-items: center;
		background-color: #fff;

		input {
			width: 100%;
		}

		.code-content {
			color: $mk-base-color;
			white-space: nowrap;
			padding: 10px;
			border-top: 1px #f0f0f0 solid;
		}
	}

	button {
		background-color: $mk-base-color;
		color: #FFF;
		margin: 20px 10px;
	}
</style>
