<template>
	<view>
		<view class="head">
			<view class="head-search">
				<input placeholder="请输入关键字.." v-model="fileName"/>
				<uni-icons type="search" size="22" @click="getData()"></uni-icons>
			</view>
			<view class="head-icons">
				<view class="icons-box" @click="uploadFile()">
					<text class="iconfont icon-shouji"></text>
					<view class="name">手机文件</view>
				</view>
				<view class="icons-box" @click="uploadFile()">
					<text class="iconfont icon-ziyuan62"></text>
					<view class="name">微云云盘</view>
				</view>
				<view class="icons-box" @click="uploadFile()">
					<text class="iconfont icon-diannao"></text>
					<view class="name">连接电脑</view>
				</view>
				<view class="icons-box" @click="uploadFile()">
					<text class="iconfont icon-wenjian"></text>
					<view class="name">我的文档</view>
				</view>
			</view>
		</view>
		<view class="content">
			<view class="card" v-for="(item,index) in fileList">
				<view class="icon">
					<text class="iconfont icon-image"></text>
				</view>
				<view class="content">
					<view class="name">
						<text>{{item.fileKind}}</text>
						<view class="filename">{{item.fileName}}</view>
					</view>
					<view class="time">{{item.createTime}}</view>
					<view class="size">{{item.fileSize}}</view>
				</view>
				<uni-icons v-if="item.isCollect" type="star-filled" size="22" class="collect" color="#F5A623" @click="recollect(item.id)"></uni-icons>
				<uni-icons v-else type="star" size="22" class="collect" @click="collect(item.id)"></uni-icons>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fileList: [],
				fileName: ''
			}
		},
		methods: {
			recollect(i){
				const url = this.Server+'collect/delete?coId='+i
				this.$http.get(url).then(res => {
				  console.log(res);
				})
				this.getData()
				this.$forceUpdate()
				uni.showToast({
					title:'取消收藏成功',
					icon:'none'
				})
			},
			collect(i){
				const url = this.Server+'collect/save?coId='+i
				this.$http.get(url).then(res => {
				  console.log(res);
				})
				this.getData()
				this.$forceUpdate()
				uni.showToast({
					title:'收藏成功',
					icon:'none'
				})
			},
			getData(){
				const url = this.Server + 'fileup/list?fileName='+this.fileName
				this.$http.get(url).then(res => {
					console.log(res.body.data.list);
					this.fileList = res.body.data.list
				})
			},
			uploadFile(){
				let _this = this;
				uni.chooseFile({  
				  count: 1, //默认100  
				  extension:['.zip','.pdf','.docx','.xlsx','.pptx','.jpg','.png'],  
					success: function (res) {  
						console.log(JSON.stringify(res.tempFilePaths));  
						uni.uploadFile({ //将本地资源上传到开发者服务器
							url: _this.Server + 'fileup/upload', //接口地址
							filePath: res.tempFilePaths[0], //图片地址
							name: 'file',
							formData: {},
							header: {
								Authorization: uni.getStorageSync('token'), //加入token
							},
							success: (uploadFileRes) => {
								console.log(uploadFileRes.data);
								let res = JSON.parse(uploadFileRes.data)
								if(res.code==0){
									uni.showToast({
										title:'上传成功'
									})
									uni.redirectTo({
										url:'../mine-file/mine-file'
									});
								}
							}
						});
					}  
				});
			}
		},
		onLoad() {
			this.getData()
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f2f2f2;
		overflow: auto;
	}

	.head {
		background-color: $mk-base-color;
		padding: 10px;
	}

	.head-search {
		display: flex;
		background-color: #fff;
		padding: 5px 15px;
		border-radius: 20px;
		align-items: center;

		.uni-icons {
			margin-left: auto;
		}
	}

	.head-icons {
		display: flex;
		justify-content: space-between;
		color: #FFF;

		.icons-box {
			display: flex;
			margin-top: 15px;
			flex-direction: column;
			align-items: center;

			.iconfont {
				font-size: 30px;
			}

			.name {
				margin-top: 5px;
			}
		}

	}

	.card {
		background-color: #FFF;
		border-radius: 10px;
		border: 1px #999 solid;
		display: flex;
		margin: 10px;
		padding: 5px;
		align-items: center;
		.collect{
			align-self: flex-start;
			margin-left: auto;
			padding: 0 10px;
		}
		.iconfont {
			font-size: 60px;
			color: $mk-base-color
		}

		.name {
			display: flex;
			.filename {
				color: $mk-base-color;
				font-weight: bold;
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
				width: 200px;
			}
		}

		.time,.size  {
			font-size: 12px;
			color: #999;
		}
	}
	
</style>
