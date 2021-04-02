<template>
	<view>
		<cul-chat :anotherAvatar="anavatar" :meAvatar="myavatar" @submit="sendMsg" :list="msgList"></cul-chat>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				formData:[],
				msgList:[],
				myavatar:'',
				anavatar:''
			}
		},
		methods: {
			sendMsg(message, callback = function(e) {
			
			}) {
				const url = this.Server+'chat/send'
				this.$http.post(url,{
					messageContent:message.message,
					receiverId:this.formData.id
				}).then(res => {
					console.log(res);
				})
			},
		},
		onLoad(query) {
			this.formData = JSON.parse(query.params)
			uni.setNavigationBarTitle({
			    title:this.formData.nickname
			})
			const url = this.Server+'chat/detail?userId='+this.formData.id
			this.$http.get(url).then(res => {
				this.msgList = res.body.data.pageInfo.list;
				for (var i = 0; i < this.msgList.length; i++) {
					if(this.msgList[i].type==1){
						this.myavatar = this.msgList[i].firstIcon
					}
					if(this.msgList[i].type==2){
						this.anavatar = this.msgList[i].firstIcon
					}
				}
			})
		}
	}
</script>

<style>

</style>
