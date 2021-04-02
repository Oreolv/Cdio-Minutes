<template>
	<view class="plan">
		<view class="plan-header">
			<view class="plan-header_picker">
				<view class="uni-title">显示时间：</view>
				<picker @change="bindPickerChange" :value="index" :range="array" range-key="name">
					<view class="uni-input">{{array[index].name}}</view>
				</picker>
			</view>
			<view class="plan-header_add" @click="open_Popup">添加计划</view>
		</view>
		<view class="plan-content">
			<view class="plan-contentbox">
				<view class="plan-content_title">{{array[index].name}}</view>
					<!-- <view class="" v-for="item in planlist">{{item}}</view> -->
				<plan-card :planlist="planlist"></plan-card>
				</view>
			</view>
			
		<uni-popup ref="popup" type="center" :maskClick="true">
			<view class="popup-wrap">
				<view class="popup-wrap_header">
					<view class="popup-wrap_header-title" @click="close_Popup">
						计划
					</view>
					<view class="popup-wrap_header-close" @click="close_Popup">
						<uni-icons type="closeempty" size="30"></uni-icons>
					</view>

				</view>
				<view class="popup-wrap_aim">
					<view class="popup-wrap_aim-title">目标：</view>
					<input type="text" v-model="inputplan" value=""/>
				</view>
				<view class="popup-wrap_time">
					<view class="popup-wrap_time-title">开始时间：</view>
					<picker mode="date" :value="sdate" :start="startDate" :end="endDate" @change="bindSdateChange">
						<view class="popup-wrap_time-content">{{sdate}}</view>
					</picker>
				</view>
				<view class="popup-wrap_time">
					<view class="popup-wrap_time-title">结束时间：</view>
					<picker mode="date" :value="edate" :start="startDate" :end="endDate" @change="bindEdateChange">
						<view class="popup-wrap_time-content">{{edate}}</view>
					</picker>
				</view>
				<view class="popup-wrap_add">
					<button @click="addPlan">添加计划</button>
				</view>
			</view>

		</uni-popup>
	</view>
</template>
<script>
	export default {
		onLoad() {
			this.getPlan()
		},
		data() {
			const currentDate = this.getDate({
				format: true
			})
			return {
				array: [{
					name: '今天'
				}, {
					name: '最近七天'
				}, {
					name: '最近一个月'
				}, {
					name: '更多'
				}],
				index: 0,
				sdate: currentDate,
				edate: currentDate,
				planlist:[],
				inputplan:'',
				listCatchData: {}
			}
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		methods: {
			getPlan(){
				const url = this.Server+'plan/list?timeSlot=4'
				this.$http.get(url).then(res => {
					this.planlist = res.body.data.list
				})
			},
			bindPickerChange(e) {
				this.index = e.detail.value
			},
			addPlan(){
				this.planlist.push({
					planMessage:this.inputplan,
					startDate:this.sdate,
					endDate:this.edate
				})
				const url = this.Server+'plan/save'
				this.$http.post(url,{
					endTime:this.edate,
					planMessage:this.inputplan,
					startTime:this.sdate
				}).then(res=>{
					console.log(res);
				})
				let _this = this
				uni.showToast({
					title: '添加成功',
					icon: 'none',
					duration: 2000
				})
				setTimeout(function() {
					_this.$refs.popup.close()
					_this.inputplan = ''
				}, 2000)
				
			},
			close_Popup(){
				this.$refs.popup.close()
			},
			open_Popup() {
				this.$refs.popup.open()
			},
			bindSdateChange(e) {
				this.sdate = e.target.value
			},
			bindEdateChange(e) {
				this.edate = e.target.value
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 60;
				} else if (type === 'end') {
					year = year + 2;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			}
		}
	}
</script>
<style lang="scss">
	page {
		background-color: #f5f5f5;
		// height: 100%;
		overflow: auto;
	}

	.plan {
		.plan-header {
			display: flex;
			align-items: center;
			background-color: #fff;
			width: 100%;
			margin-top: 10px;

			.plan-header_picker {
				display: flex;
				width: 100%;
				align-items: center;
				padding: 10px;
			}

			.plan-header_add {
				margin: 10px;
				padding: 5px;
				font-size: 14px;
				white-space: nowrap;
				color: #fff;
				background-color: $mk-base-color;
				border-radius: 10px;
			}
		}

		.plan-content {
			margin-top: 10px;
			padding: 20px;
			background-color: #fff;
			.plan-contentbox{
				padding-bottom: 20px;
				border-radius: 20px;
				border: 1px #999 solid;
				.plan-content_title {
					text-align: center;
					border-bottom: 1px #999 solid;
					font-size: 18px;
					font-weight: bold;
					padding: 15px 0;
					margin: 0 20px 20px 20px;
				}
			}

		}

		.popup-wrap {
			margin: 10px 5px;
			background-color: #fff;
			opacity: 0.95;
			border-radius: 20px;
			padding: 10px 30px 30px 30px;
			.popup-wrap_header{
				display: flex;
				align-items: center;
				justify-content: center;
				.popup-wrap_header-title{
					width: 100%;
					font-weight: bold;
					font-size: 20px;
					padding-left: 20px;
					margin-right: auto;
					text-align: center;
				}
				.popup-wrap_header-close{
					margin-right: -20px;
				}
			}
			.popup-wrap_aim,.popup-wrap_time {
				display: flex;
				margin-bottom: 10px;
				margin-top: 20px;
				.popup-wrap_time-content{
					color: $mk-base-color;
					
				}
				input {
					border-bottom: 1px #999 solid;
				}
			}
			.popup-wrap_add{
				button{
					background-color: $mk-base-color;
					color: #fff;
					border-radius: 50px;
					margin: 30px 30px 0 30px;
				}
			}
		}
	}
</style>
