<template>
	<view class="mine-setting">
		<view class="mine-setting_group">
			<view class="mine-setting_list">
				<text class="mine-setting_listtext">账号管理</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
			</view>
			<view class="mine-setting_list" @click="open_safe">
				<text class="mine-setting_listtext">账号与安全</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
			</view>
		</view>
		<view class="mine-setting_group">
			<view class="mine-setting_list">
				<text class="mine-setting_listtext">消息推送</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
			</view>
			<view class="mine-setting_list">
				<text class="mine-setting_listtext">通用设置</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
			</view>
			<view class="mine-setting_list">
				<text class="mine-setting_listtext">隐私</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
			</view>
			<view class="mine-setting_list">
				<text class="mine-setting_listtext">屏蔽设置</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
			</view>
		</view>
		<view class="mine-setting_group">
			<view class="mine-setting_list">
				<text class="mine-setting_listtext">版本信息</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
			</view>
			<view class="mine-setting_list">
				<text class="mine-setting_listtext">清理缓存</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
			</view>
			<view class="mine-setting_list">
				<text class="mine-setting_listtext">护眼模式</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
			</view>
		</view>
		<view class="logout" @click="logout">
			<text>退出登录</text>
		</view>
	</view>
	</view>

</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			open_safe(){
				uni.navigateTo({
					url:'../mine-setting_safe/mine-setting_safe'
				})
			},
			logout() {
				uni.removeStorageSync('id')
				uni.removeStorageSync('name')
				uni.removeStorageSync('token')
				// uni.clearStorageSync();

				uni.showToast({
					title: '退出成功',
					duration: 2000
				})

				setTimeout(function() {
					uni.switchTab({
						url: '../tabbar/index/index',
						success() {
							let page = getCurrentPages().pop(); //跳转页面成功之后
							console.log(page);
							if (!page) return;
							// page.onLoad(); //如果页面存在，则重新刷新页面
						}
					})


				}, 2000)

			}
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	.mine-setting {
		.mine-setting_group {
			margin-bottom: 10px;
			overflow: hidden;
			height: 100%;

			.mine-setting_list {
				display: flex;
				justify-content: space-between;
				align-items: center;
				padding: 15px;
				background-color: #fff;
				// border-bottom: 1px #dcdcdc solid;
				box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: 0.2);

				.mine-setting_listtext {
					color: #333;
					font-size: 16px;
				}

			}


		}

		.logout {
			color: red;
			font-size: 16px;
			display: flex;
			justify-content: center;
			background-color: #fff;
			padding: 15px;
			// border-bottom: 1px #dcdcdc solid;
			box-shadow: 0 0 2px 0 rgba($color: #000000, $alpha: 0.2);
			margin-top: 30px;
		}

	}
</style>
