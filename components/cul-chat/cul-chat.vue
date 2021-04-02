<template>
	<view class="cul-wrapper">
		<!--这里减掉的60为操作栏的高度和内边距之和-->
		<scroll-view :style="{height:scrollHeight-70+'px'}" scroll-y :scroll-into-view="scrollIndex" scroll-with-animation>
			<block v-for="(msg,index) in list" :key="index">
				<view :class="[msg.type==1?'msg-me':'msg-service']" :id="'msg-'+index">
					<image class="avatar" v-if="msg.type==2" :src="anotherAvatar" lazy-load></image>
					<view class="msg-text">
						<view class="msg-text-content">
							<text>{{msg.messageContent}}</text>
						</view>
					</view>
					<image class="avatar" v-if="msg.type==1" :src="meAvatar" lazy-load></image>
				</view>
			</block>
		</scroll-view>
		<view class="operation" :class="{'conversion':!conversion}">
			<input type="text" v-model="msgInput.msg1" :class="[conversion?'msg-input1':'msg-input2']" @tap="sub1(msgInput.msg2)" />
			<input type="text" v-model="msgInput.msg2" :class="[conversion?'msg-input2':'msg-input1']" @tap="sub2(msgInput.msg1)" />
		</view>
	</view>
</template>

<script>
	export default {
		name: 'CulChat',
		props: {
			
			list:{
				type: Array,
				default(){
					return [];
				}
			},
			//聊天窗体高度
			scrollHeight: {
				type: Number,
				default () {
					let height = 0
					//调用uni-app接口获取屏幕高度
					uni.getSystemInfo({
						//成功回调函数
						success(res) {
							//windoHeight为窗口高度，主要使用的是这个
							height = res.windowHeight
						}
					})
					return height
				}
			},
			meAvatar: {
				type: String | Object,
			},
			anotherAvatar: {
				type: String | Object,
			}
		},
		data() {
			return {
				//控制按钮和文本框样式和功能的转换
				conversion: true,
				msgInput: {
					msg1: '',
					msg2: ''
				},
				msgList: [],
				//消息列表
				msgs: [],
				//滚动位置
				scrollIndex: ''
			}
		},
		methods: {
			//滚动到指定位置
			jumpScroll() {
				//滚动到指定位置之前首先清空scrollIndex的值，否则只能滚动一次，再次调用就会失效
				this.scrollIndex = ''
				this.$nextTick(function() {
					this.scrollIndex = 'msg-' + (this.list.length - 1)
				})
			},
			sub1(val) {
				if (!this.conversion) {
					this.sub(val)
				}
			},
			sub2(val) {
				if (this.conversion) {
					this.sub(val)
				}
			},
			sub(val) {
				let _self = this;
				if (val) {
					//清空输入框中的文字
					this.msgInput.msg1 = ''
					this.msgInput.msg2 = ''
					let msg = {
						type: 1,
						messageContent: val
					}
					this.list.push(msg)
					this.conversion = !this.conversion
					this.jumpScroll()
					this.$emit('submit', {
						message: val,
						callback: m => {
							let anotherMsg = {
								type: 2,
								messageContent: m
							}
							_self.list.push(anotherMsg)
							_self.jumpScroll()
						}
					})
				} else {
					this.conversion = !this.conversion
					this.jumpScroll()
				}
			}
		}
	}
</script>

<style scoped>
	* {
		box-sizing: border-box;
		overflow: hidden;
	}

	.cul-wrapper {
		width: 100vw;
		padding: 0 35rpx;
		margin-top: 10px;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.msg-me,
	.msg-service {
		display: flex;
		align-items: flex-start;
		width: 680rpx;
		margin: 30rpx 0;
		box-sizing: border-box;
		overflow: hidden;
	}

	.msg-me {
		justify-content: flex-end;
	}

	.msg-service {
		justify-content: flex-start;
	}

	.avatar {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.msg-text {
		width: 560rpx;
	}

	.msg-me>.msg-text {
		display: flex;
		justify-content: flex-end;
	}

	.msg-text-content {
		line-height: 35rpx;
		display: inline-block;
		box-sizing: border-box;
		padding: 30rpx;
		font-size: 28rpx;
	}

	.msg-me>.msg-text>.msg-text-content {
		margin-left: 70rpx;
		background-color: #FFFFFF;
		border: 1rpx solid #d5e0e5;
		border-top-right-radius: 20rpx;
		border-bottom-left-radius: 30rpx;
		border-top-left-radius: 10rpx;
		margin-right: 15rpx;
	}

	.msg-service>.msg-text>.msg-text-content {
		color: #FFFFFF;
		margin-left: 15rpx;
		background-color: #3875ff;
		border-top-left-radius: 20rpx;
		border-bottom-right-radius: 30rpx;
		border-top-right-radius: 10rpx;
		margin-right: 70rpx;
	}

	.operation {
		display: flex;
		position: fixed;
		left: 0;
		bottom: 0;
		align-items: center;
		background: #FFFFFF;
		padding: 10px 35rpx;
		border-top: 1rpx solid rgba(184, 184, 184, 0.1);
		width: 100vw;
	}

	.conversion {
		flex-direction: row-reverse;
		justify-content: flex-end;
	}

	.msg-input1 {
		background: #FFFFFF;
		height: 40px;
		width: 520rpx;
		border-radius: 10px;
		padding: 0 20rpx;
		border: 1rpx solid rgba(0, 0, 0, 0.1);
	}

	.msg-input2 {
		display: flex;
		align-items: center;
		width: 140rpx;
		margin-left: 30rpx;
		height: 40px;
		background-color: #007AFF;
		background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAFWUlEQVRoQ+1ZaaydUxRdS0JEEPOsKiFCDE1oDPFDKX4QQytmWsQs0UpEDU1brRZFq4m5VBFS1ZqSJyGqQmjQHxKEGoNE0JiFBlmyXvb3cnru9917v9f73rtNun+139nn3LX2cPY++xHruXA9x48NBAbDg5LOB3AlgB0A9JD0v3ulaz0gabcAfQWALRND/UjSRLqTgKTRAfyUCu9+RnLvriIgaaMAfTmAfVuE5RKSp3UFAUn7BfDxADYrAf4VgFsB7A/gqlifTHLGkBKQNBbAZQAcLmWy1MBJvutFSS8DODYUTyL54qATkLRVWHscgL4YTtD/BeCWAP5f8T32vQ9gWHwbRvKbQSMg6XAAlwI4G8DGJeZ+A8Aski+VuULSoQBWxNpqktunegN2jUq6AIDv76MqwmRuWPv7dF3ScJKO/V6JGrAw/ruM5DEDRkDSHgAuAXAWgD1LgH8KYDrJx/M1SUcAMKmR9hjJB4OAw+qG0J9D8pqOE5B0PIDzIkzKvPoUgJkkP6gIk9MB3A9g61hfTnJUEHgGgJPeMp5k4Y3eD/0OIUmO54vD2keWAPsNwDSSd1WEUBEiEwGkOmsAjCHZE/XhcwDD44wRJJ3QfVKbgKQDAJwbwHcvAfcagJtJLm8GPKx7J4A0JL4EMI6kE9vx76L2UZyzhuSm+ZltE5B0coA+owLYbAAzSNryTUXSFgAeApCe9WaA/6LYLMntxLPx/5UkD6lFQNK2AM4J4IeVoLJ1HCZPtwKdgLJVnaBp2Hm/Lf93eo6k66IS+/NCkq7Ya0mpByQdHAnpu3unEnCPRZg4PtsWSa6mBl/EtPfOJek8aBBJC5y4sTCRpG+pagKS3Kbem2R9qvxTWHte24gTxagLD2TF7FqSd1SdJ8k5UZA9mqTzqykBK+SFx32Iw+St/gD3HkmT7bFk/78RMk82Ab8rgG+T9W1I/tyKgC3kQpTK7REuf/aHgKT8zK9doUm+3uw8Sa4Dy0JnFcl9yvQbckDSBABzMmXfDFPLKmgTC24H4FEAJyQ6b4flXZGbiiR3q/eF0lKSRTGrDqFiRdImABYByF9Fz7tjLNrcJuBHBPiDEp0lAb4tT2YJ7LoypS0PpEqSfNW593YrnMpMALNJ/pIfKulEAL497IFC5pG8upXVs99OE3gsSb8RGqStQibJ1dJVM5VPopt0mPSKJD8JfYulMonkbTXBbw7g92TPXiRLr+y2CAQ4P+uml4TVc/ZGxHrRNfZuiWR9og74+C3Xofdi33ckd6k6o20CiZUvDG/kYZX+hq8/V9biFqnFQZKLl8PQ8grJ4zpGICzkJu6mkivXy+8E+I9roU6UswRueAOk59b2QLo5HueupEW1dONly6fxW5tHVoEvIvlIRz2QkfD1NjW+uVZMq4042yDJ+VPISJJFPjQcvU4eiHAqJRAzH3eZv0bDtrgdYpI8sVgVun8AcAvxz6B7QJJnmvckP+zr1u+Fph1slsArSHqqUSkD5oHwThoK/uQJhEcod1chyhJ4Pkk/W4eGQJCYBWBShsAd7hSSxbynbzlL4AnNyHrTgHqgQCXJ125PzDhTLh4fXp9dCqnXRpN8dUg9kIHz8zSvzB613EjyBQ+1ALgHKmRHkj90DYEIqZ1jjHJmBuxhAH7YFxX4Q5JuX5rKoIRQGQJJHmbNB+AJRSGrky52EcmcZMNRQ0YgvOFBretI39+8EoRr/R2gyg1DSiBJ8jFB5MAE6Kkk3el2ZwjlqCR5Lmpv+OGzmKRDrKV0wgOeYhTjjlHtjBRboqqhsM4EIpb9AAHJlTV+uyOqHSHQEST9PGQDgX4armPb1nsP/A8hPApP6jUidgAAAABJRU5ErkJggg==');
		background-repeat: no-repeat;
		background-position: center center;
		background-size: 20px 20px;
		border-radius: 10px;
		/*这个颜色是因为组件位置交换的时候，字体会有一瞬间继续留在框内，这里把内容变为透明即可*/
		color: rgba(0, 0, 0, 0);
	}
</style>
