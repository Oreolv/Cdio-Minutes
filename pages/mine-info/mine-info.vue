<template>
	<view class="info">
		<view class="info-header">
			<view class="header-box">
				<view class="face">
					<image :src="info.firstIcon"></image>
				</view>
				<view class="id">ID：{{info.id}}</view>
			</view>
			<view class="edit" @click="open">编辑资料</view>
		</view>
		<view class="info-content">
			<view class="content-box">
				<view class="title">昵称：</view>
				<view class="content">{{info.nickname}}</view>
			</view>
			<view class="content-box">
				<view class="title">生日：</view>
				<view class="content">{{info.birthday}}</view>
			</view>
			<view class="content-box">
				<view class="title">性别：</view>
				<view class="content">{{info.sex}}</view>
			</view>
			<view class="content-box">
				<view class="title">城市：</view>
				<view class="content">{{info.province}}</view>
			</view>
			<view class="content-box">
				<view class="title">学校：</view>
				<view class="content">{{info.school}}</view>
			</view>
			<view class="content-box">
				<view class="title">学院：</view>
				<view class="content">{{info.department}}</view>
			</view>
			<view class="content-box">
				<view class="title">专业：</view>
				<view class="content">{{info.profession}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				info:[],
			}
		},
		onLoad() {
			var token = uni.getStorageSync('token')
			const url = this.apiServer+'users/profile'
			this.$http.get(url).then(res=>{
				console.log(res);
				this.info = res.data.data;
				if(this.info.sex == 0){
					this.info.sex = '男'
				}else{
					this.info.sex = '女'
				}
			})
			// console.log(this.info);
		},
		methods: {
			open(){
				const params = {
					firstIcon: this.info.firstIcon,
					nickname: this.info.nickname,
					birthday: this.info.birthday,
					sex: this.info.sex,
					province: this.info.province,
					school: this.info.school,
					department: this.info.department,
					profession: this.info.profession,
				}
				uni.navigateTo({
					url:'../mine-info_edit/mine-info_edit?params=' + JSON.stringify(params)
				})
			}
		}
	}
</script>

<style lang="scss">
	page{
		height: 100%;
		background-color: #f5f5f5;
	}
	.info-header{
		background-color: #fff;
		padding: 20px;
		margin: 10px;
		margin-top: 15px;
		border-radius: 20px;
		display: flex;
		.header-box{
			margin-right: auto;
			.face{
				width: 70px;
				height: 70px;
				border-radius: 50%;
				overflow: hidden;
				image{
					width: 100%;
					height: 100%;
				}
				
			}
			.id{
				// margin-left: 10px;
				margin-top: 10px;
				text-align: center;
			}
		}
		.edit{
			background-color: $mk-base-color;
			height: 100%;
			color: #FFF;
			font-size: 14px;
			padding: 5px 10px;
			border-radius: 20px;
		}
	}
	.info-content{
		margin-top: 20px;
		.content-box{
			display: flex;
			border-bottom: 1px #999 solid;
			margin: 0 15px;
			padding-bottom: 10px;
			margin-bottom: 15px;
			.content{
				color: $mk-base-color;
			}
		}
	}
</style>
