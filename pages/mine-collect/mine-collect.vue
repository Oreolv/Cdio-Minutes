<template>
	<view>
		<view class="head">
			<view class="head-search">
				<input placeholder="请输入关键字.." v-model="fileName"/>
				<uni-icons type="search" size="22" @click="getData()"></uni-icons>
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
			
			getData(){
				const url = this.Server + 'collect/list'
				this.$http.get(url).then(res => {
					console.log(res.body.data.list);
					this.fileList = res.body.data.list
				})
			},
			
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
