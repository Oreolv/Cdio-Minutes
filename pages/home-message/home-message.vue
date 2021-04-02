<template>
	<view>
		<view class="head">
			<view class="icon-box">
				<text class="iconfont icon-xiaoxi"></text>
				<text>消息</text>
			</view>
			<view class="icon-box">
				<text class="iconfont icon-dianzan1"></text>
				<text>@我</text>
			</view>
			<view class="icon-box">
				<text class="iconfont icon-youxiang1"></text>
				<text>收到的赞</text>
			</view>
			<view class="icon-box">
				<text class="iconfont icon-tongzhi"></text>
				<text>系统通知</text>
			</view>
		</view>
		<view class="content">
			<view class="card"  v-for="item in list" @click="open(item.otherId,item.nickname)">
				<view class="card-face">
					<image :src="item.firstIcon"></image>
				</view>
				<view class="card-msg">
					<text class="msg-name">{{item.nickname}}</text>
					<text class="msg-content">{{item.messageContent}}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		methods: {
			open(id,nickname){
				// console.log(id,nickname);
				const item = this.item
				this.$emit('click', item)
				const params = {
					id: id,
					nickname:nickname,
				}
				uni.navigateTo({
					url: '../message-detail/message-detail?params=' + JSON.stringify(params)
				})
				// uni.navigateTo({
				// 	url:'../message-detail/message-detail'
				// })
			}
		},
		onLoad() {
			const url = this.Server+'chat/list'
			this.$http.get(url).then(res => {
			  // console.log(res.body.data.list);
				this.list = res.body.data.list
			})
		},
		onShow() {
			const url = this.Server+'chat/list'
			this.$http.get(url).then(res => {
			  // console.log(res.body.data.list);
				this.list = res.body.data.list
			})
		}
	
	}
</script>

<style lang="scss">
	page{
		background-color: #f2f2f2;
	}
	.head{
		display: flex;
		justify-content: center;
		background-color: #FFF;
		padding-bottom: 15px;
		.icon-box{
			margin-top: 20px;
			.iconfont{
				margin-bottom: 5px;
				font-size: 30px;
				&.icon-xiaoxi{
					color: #5288F5;
				}
				&.icon-dianzan1{
					color: #FF623E;
				}
				&.icon-tongzhi{
					color: #FFF000;
				}
			}
			// justify-content: center;
			text-align: center;
			width: 100%;
			padding: 0px 20px;
			display: flex;
			flex-direction: column;
			white-space: nowrap;
		}
	}
	.content{
		background-color: #FFF;
		margin-top: 10px;
		.card{
			display: flex;
			border-bottom: 1px #f0f0f0 solid;
			.card-face {
				width: 50px;
				height: 50px;
				margin: 10px;
				border-radius: 50%;
				overflow: hidden;
				image {
					width: 100%;
					height: 100%;
				}
			}
			
			.card-msg {
				display: flex;
				flex-direction: column;
				margin-right: auto;
				margin-left: 10px;
			
				.msg-name {
					margin-top: 10px;
					font-size: 16px;
					font-weight: bold;
				}
			
				.msg-content {
					margin-top: 5px;
					font-size: 14px;
					color: #999;
				}
			}
		}
	}
	
	
</style>
