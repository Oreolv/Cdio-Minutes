<template>
	<view class="mine-QR">
		<view class="my-QR_facebox">
			<image src="/static/logo.png"></image>
		</view>
		<view class="my-QR_QRbox">
			<image src="/static/logo.png"></image>

		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		onload(){
			console.log("a");
		}
	}
	
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}

	.mine-QR {
		margin-top: 30px;
		// display: flex;
		// flex-direction: column;
		// align-items: center;
		.my-QR_facebox {
			width: 60px;
			height: 60px;
			margin: 0 auto;
			border-radius: 50%;
			overflow: hidden;

			image {
				width: 100%;
				height: 100%;
			}
		}

		.my-QR_QRbox {
			background-color: #fff;
			border: 1px solid #999;
			width: 200px;
			height: 200px;
			padding: 30px;
			overflow: hidden;
			margin: 0 auto;
			border-radius: 10px;
			image {
				width: 100%;
				height: 100%;
			}
		}

	}
</style>
