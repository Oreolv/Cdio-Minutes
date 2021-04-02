<template>
	<view class="mine-setting">
		<view class="mine-setting_group">
			<view class="mine-setting_list">
				<text class="mine-setting_listtext" @click="open_pwd">修改密码</text>
				<uni-icons type="arrowright" color="#666" size="22"></uni-icons>
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
			open_pwd(){
				uni.navigateTo({
					
				})
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

		

	}
</style>
