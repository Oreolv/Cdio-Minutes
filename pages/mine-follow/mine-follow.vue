<template>
	<view>
		<view class="follow-box" v-for="(item,index) in list">
			<view class="face">
				<image :src="item.firstIcon" mode=""></image>
			</view>
			<view class="name">{{item.nickname}}</view>
			<view class="btn" @click="removeFollow(index)">取消关注</view>
		</view>
		<view class="trace" v-if="list.length==0">暂时没有关注</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
			const url = this.Server + 'follow/myFollow'
			this.$http.get(url).then(res => {
			    this.list = res.body.data
					console.log(this.list);
			})
		},
		methods: {
			removeFollow(index){
				console.log(this.list[index].id);
				const url = this.Server + 'follow/remove?followId='+this.list[index].id
				this.$http.get(url).then(res => {
				    console.log(res);
				})
				this.list.splice(index,1)
				
			}
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #f5f5f5;
		height: 100%;
	}
	.follow-box{
		background-color: #FFF;
		padding: 5px 10px;
		margin: 10px;
		border-radius: 15px;
		display: flex;
		align-items: center;
		.face{
			width: 40px;
			height: 40px;
			border-radius: 50%;
			overflow: hidden;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.name{
			margin-left: 10px;
		}
		.btn{
			color: #FFF;
			background-color: $mk-base-color;
			margin-left: auto;
			padding: 5px 10px;
			margin-right: 10px;
			font-size: 13px;
			border-radius: 20px;
		}
		
	}
	.trace{
		color: #999;
		margin-top: 50px;
		text-align: center;
	}
</style>
