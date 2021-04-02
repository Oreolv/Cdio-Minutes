<template>
	<view class="listcard" >
		<view>
			<view class="liscard-head">
				<view class="liscard-personal_faces">
					<image :src="item.firstIcon" lazy-load mode="widthFix"></image>
				</view>
				<view class="liscard-personal_msg">
					<view class="liscard-personal_name">{{item.nickname}}</view>
					<view class="liscard-personal_time">{{item.createTime}}</view>
				</view>
				<view class="listcard-tag_type">
					<uni-tag :text="item.tag" type="primary" size="small" inverted />
				</view>

				<view class="listcard-tag_reward" v-if="item.tag!='高光'">
					<uni-tag :text="item.cost+'积分'" inverted type="warning" size="small" />
				</view>
				<view class="listcard-tag_more" v-if="item.userId==userIdS" @click="more">
					<uni-icons type="more-filled"></uni-icons>
				</view>
				
			</view>
			<view class="listcard-content" @click="open">{{item.pubMessage}}</view>
			<view class="listcard-imgbox two" @click="open" v-if="picNum==2">
				<view class="listcard-img" v-if="item.pubPicture[0]!=''" v-for="(p,i) in item.pubPicture">
					<image :src="p" lazy-load></image>
				</view>
			</view>
			<view class="listcard-imgbox oth" @click="open" v-else>
				<view class="listcard-img" v-if="item.pubPicture[0]!=''" v-for="(p,i) in item.pubPicture">
					<image :src="p" lazy-load></image>
				</view>
			</view>
			<!-- <view class="listcard-act" @click.stop>
				<view class="listcard-act_thumbsup">
					<text class="iconfont icon-dianzan"></text>
					<text>{{item.thumbsup}}</text>
				</view>
				<view class="listcard-act_redo">
					<uni-icons type="redo"></uni-icons>
					<text>{{item.redo}}</text>
				</view>
			</view> -->
		</view>
		<uni-popup ref="popup" type="bottom" :maskClick="false">
			<view class="wrap">
				<view class="card"  @click="edit">
					<text class="iconfont icon-bianxie"></text>编辑
				</view>
				<view class="card" @click="del">
					<text class="iconfont icon-shanchu"></text>删除
				</view>
				
				<button @click="close">取消</button>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		props: {
			item: {
				type: Object,
				default () {
					return {
						bottom:0
					}
				}
			}
		},
		data() {
			return {
				userIdS: 0,
				picNum:0,
			};
		},
		created() {
			const info = uni.getSystemInfoSync()
			this.bottom = info.windowBottom;
			// console.log(this.bottom);
			this.userIdS = uni.getStorageSync('id')
			if (this.item.pubPicture != null&&this.item.pubPicture != '') {
				this.item.pubPicture = this.item.pubPicture.split(",")
				this.picNum = this.item.pubPicture.length
			}
			
			console.log(this.picNum);

		},
		beforeUpdate(){
			if (this.item.pubPicture != null&&this.item.pubPicture != '') {
				this.item.pubPicture = this.item.pubPicture.split(",")
			}
		},
		methods: {
			edit(){
				const item = this.item
				this.$emit('click', item)
				const params = {
					face: item.firstIcon,
					name: item.nickname,
					time: item.createTime,
					thumbsup: item.thumbsup,
					content: item.pubMessage,
					pubPicture:item.pubPicture,
					number: item.number,
					reward: item.cost,
					tag: item.tag,
					userId: item.userId,
					id: item.id,
					pic: item.pubPicture,
					picNum:this.picNum
				}
				uni.navigateTo({
					url: '/pages/publish-edit/publish-edit?params=' + JSON.stringify(params)
				})
				this.$refs.popup.close()
				uni.showTabBar()
			},
			del(){
				const url = this.Server + 'publish/delete?id=' + this.item.id
				this.$http.get(url).then(res => {
				  console.log(res.body.message);
					if (res.body.message == 'SUCCESS') {
						uni.showToast({
							title: '删除成功'
						});
						let _this = this
						setTimeout(function() {
						  _this.$refs.popup.close()
							_this.$forceUpdate()
							uni.showTabBar()
							location.reload()
						}, 1500)
						
					}
				})
			},
			close(){
				this.$refs.popup.close()
				uni.showTabBar()
			},
			more(){
				uni.hideTabBar()
				
				 this.$refs.popup.open()
				
			},
			open() {
				const item = this.item
				this.$emit('click', item)
				const params = {
					face: item.firstIcon,
					name: item.nickname,
					time: item.createTime,
					thumbsup: item.thumbsup,
					content: item.pubMessage,
					pubPicture:item.pubPicture,
					number: item.number,
					reward: item.cost,
					tag: item.tag,
					userId: item.userId,
					id: item.id,
					pic: item.pubPicture,
					picNum:this.picNum
				}
				uni.navigateTo({
					url: '/pages/home-detail/home-detail?params=' + JSON.stringify(params)
				})
			}
		}

	}
</script>

<style lang="scss">
	.listcard {
		display: flex;
		padding: 15px;
		margin: 10px;
		border-radius: 5px;
		box-shadow: 0 0 5px 1px rgba($color: #000000, $alpha: 0.1);
		box-sizing: border-box;
		flex-direction: column;

		.liscard-head {
			display: flex;
			// justify-content: space-between;
			align-items: center;
			.listcard-tag_more{
				margin-left: auto;
				align-self: flex-start;
			}
			.listcard-tag_type {
				margin-left: 20px;
				line-height: 1.5;
				align-self: flex-start;
			}

			.listcard-tag_reward {
				align-self: flex-start;
				font-size: 12px;
				line-height: 1.5;
				margin-left: 5px;
			}

			.liscard-personal_faces {
				width: 40px;
				height: 40px;
				border-radius: 50%;
				overflow: hidden;
				display: flex;
				align-items: center;
				margin-right: 15px;

				image {
					width: 100%;
					height: 100%;
				}
			}

			.liscard-personal_msg {
				.liscard-personal_name {
					font-size: 14px;
					line-height: 1.5;
				}

				.liscard-personal_time {
					font-size: 12px;
					line-height: 1.5;
					color: #999;
				}
			}

		}

		.listcard-content {
			display: flex;
			font-size: 16px;
			margin-top: 10px;
			width: 100%;
			word-break: break-all;
		}

		.listcard-act {
			display: flex;
			justify-content: flex-end;

			.listcard-act_thumbsup,
			.listcard-act_redo {
				margin: 0 10px;

				&text {
					margin: 0 10px;
				}
			}

		}
	}
	
	.listcard-imgbox {
		display: flex;
		margin-top: 10px;
		&.two{
			justify-content:flex-start;
			.listcard-img{
				width: 100px;
				height: 100px;
				margin-right: 34px;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		&.oth{
			justify-content: space-between;
			.listcard-img{
				width: 100px;
				height: 100px;
				image {
					width: 100%;
					height: 100%;
				}
			}
		}
		
		
		
	}

	.wrap{
		height: 100%;
		background-color: #FFF;
		// position: relative;
		// bottom: 50px;
		border-bottom: 1px #FFF solid;
		border-top-left-radius: 10px;
		border-top-right-radius: 10px;
		.card{
			padding: 15px 25px;
			border-bottom: 1px #f0f0f0 solid;
			&:first-child{
				border-top: none;
			}
			.iconfont{
				margin-right: 20px;
				font-size: 20px;
				border-top: 1px #f0f0f0 solid;
			}
		}
		button{
			font-weight: bold;
			color: #000;
			background-color: #F5f5f5;
			margin: 10px;
		}
	}
</style>
