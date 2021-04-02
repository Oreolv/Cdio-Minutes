<template>
	<view class="help">
		<view class="help-box">
			<view class="title">热门问题</view>
			<view class="box">
				<view class="content-box">
					<text class="iconfont icon-qizhi"></text>
					<text class="content">如何切换夜间模式</text>
				</view>
				<view class="content-box">
					<text class="iconfont icon-qizhi"></text>
					<text class="content">如何快速定位到商家</text>
				</view>
				<view class="content-box">
					<text class="iconfont icon-qizhi"></text>
					<text class="content">如何获取积分</text>
				</view>
				<view class="content-box">
					<text class="iconfont icon-qizhi"></text>
					<text class="content">如何屏蔽好友</text>
				</view>
				<view class="content-box">
					<text class="iconfont icon-qizhi"></text>
					<text class="content">如何兑换积分</text>
				</view>
			</view>
			
		</view>
		<view class="help-box">
			<view class="title">常见个人问题</view>
			<view class="box">
				<view class="content-box">
					<text class="iconfont icon-qizhi"></text>
					<text class="content">个人账号问题</text>
				</view>
				<view class="content-box">
					<text class="iconfont icon-qizhi"></text>
					<text class="content">功能相关问题</text>
				</view>
				<view class="content-box">
					<text class="iconfont icon-qizhi"></text>
					<text class="content">积分攻略</text>
				</view>
			</view>
			
		</view>
		<view class="help-info">
			<view class="tel">客服电话：11111111111</view>
			<view class="time">服务时间：10:00~21:00</view>
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
			
		}
	}
</script>

<style lang="scss">
	page {
		height: 100%;
		background-color: #f5f5f5;
	}
	.help-box{
		padding: 0 10px;
		.title{
			margin-top: 20px;
			margin-bottom: 10px;
			font-weight: bold;
		}
		.box{
			background-color: #FFF;
			padding: 15px 20px;
			.content-box{
				margin-bottom: 10rpx;
				.content{
					margin-left: 10px;
				}
				.iconfont{
					color: $mk-base-color;
				}
			}
		}
	}
	.tel,.time{
		color: $mk-base-color;
		margin-top: 20px;
		text-align: center;
	}
</style>
