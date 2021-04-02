<template>
	<view>
		<!-- <cul-chat anotherAvatar="/static/girl.png" meAvatar="/static/boy.png" @submit="sendMsg"></cul-chat> -->
		<button type="default" @click="changeAvatar">aaa</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			sendMsg(message, callback = function(e) {

			}) {

			},
			changeAvatar() {
				uni.chooseImage({
					count: 1,
					sizeType: ['compressed'],
					sourceType: ['album', 'camera'],
					success: (chooseImageRes) => {
						const tempFilePaths = chooseImageRes.tempFilePaths;
						console.log('baseUrl:' + this.$baseUrl)
						let user = uni.getStorageSync('userInfo');
						uni.uploadFile({
							url: this.$baseUrl + '/file/fileUpload', //仅为示例，非真实的接口地址
							filePath: tempFilePaths[0],
							name: 'file',
							formData: {},
							header: {
								'Authorization': user.token
							},
							success: (res) => {
								console.log(res.data);
								if (res.data.code === 0) {
									this.avatar = res.data.data
								} else {
									uni.showToast({
										title: res.data.message
									});
								}
							}
						});
					}
				})
			},

		}
	}
</script>

<style>

</style>
