<template>
	<view class="comments-box">
		<view class="comments-box_header">
			<view class="comments-box_header">
				<view class="comments-box_header-face">
					<image :src="comments.firstIcon" mode="aspectFill"></image>
				</view>
				<view class="comments-box_header-info">
					<view class="comments-box_header-info-title">
						{{comments.nickname}}<uni-rate class="rate" :max="5" :value="comments.point" readonly="true" :size="18" v-if="comments.point!=0"/>
					</view>
					<view class="comments-box_header-info-time">
						{{comments.createTime}}
					</view>
				</view>
				
			</view>
		</view>
		<view class="comments-box_content">
			<view>{{comments.message}}</view>
			<view class="img-box two" v-if="picNum==2">
				<view class="img" v-if="comments.image[0]!=null&&comments.image[0]!=''" v-for="p in comments.image">
					<image :src="p" lazy-load></image>
				</view>
			</view>
			<view class="img-box oth" v-else>
				<view class="img" v-if="comments.image[0]!=null&&comments.image[0]!=''" v-for="p in comments.image">
					<image :src="p" lazy-load></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	export default {
		props:{
			comments:{
				type: Object,
				default(){
					return {}
				}
			}
		},
		data() {
			return {
				picNum:0
			};
		},
		beforeUpdate(){
			console.log(this.comments.image);
			if(this.comments.image!=undefined){
				this.comments.image = this.comments.image.substring(0,this.comments.image.length-1)
			}
			if(this.comments.image!=null&&this.comments.image!=undefined){
				this.comments.image = this.comments.image.split(",")
				this.picNum = this.comments.image.length
			}
		},
		created() {
			console.log(this.comments);
			if(this.comments.image!=undefined){
				this.comments.image = this.comments.image.substring(0,this.comments.image.length-1)
			}
			if(this.comments.image!=null&&this.comments.image!=undefined){
				this.comments.image = this.comments.image.split(",")
				this.picNum = this.comments.image.length
			}
			
		}
		
	}
</script>

<style lang="scss">
	.img-box {
		display: flex;
		margin-top: 10px;
	
		&.two {
			justify-content: flex-start;
	
			.img {
				width: 100px;
				height: 100px;
				margin-right: 43px;
				box-sizing: border-box;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	
		&.oth {
			justify-content: space-between;
	
			.img {
				width: 100px;
				height: 100px;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	.comments-box{
		display: flex;
		padding: 15px 0;
		// align-items: center;
		flex-direction: column;
		.comments-box_header{
			display: flex;
			.comments-box_header-face{
				margin-right: 10px;
				width: 50px;
				height: 50px;
				flex-shrink: 0;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.comments-box_header-info{
				display: flex;
				flex-direction: column;
				color: #999;
				line-height: 1;
				.comments-box_header-info-title{
					margin-bottom: 10px;
					color: #333;
					display: flex;
					font-size: 16px;
					.rate{
						margin-left: 10px;
					}
				}
				.comments-box_header-info-time{
					font-size: 14px;
				}
			}
		}
		.comments-box_content{
			margin-top: 20px;
			font-size: 14px;
		}
	}
</style>
