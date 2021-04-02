<template>
	<swiper class="home-swiper" :current="activeIndex" @change="change" disable-touch>
		<swiper-item v-for="(item ,index) in tab" :key="index" class="swiper-item">
			<list-item :list="listCatchData[index]" :load="load[index]" @loadmore="loadmore"></list-item>
		</swiper-item>
	</swiper>

</template>

<script>
	import listItem from './list-item.vue'
	export default {
		components: {
			listItem
		},
		props: {
			tab: {
				type: Array,
				default () {
					return []
				}
			},
			activeIndex: {
				type: Number,
				default: 0
			}
		},
		data() {
			return {
				list: [],
				// js 的限制 listCatchData[index] = data
				listCatchData: {},
				load: {},
				pageSize: 4,
			};
		},
		watch: {
			tab(newVal) {
				if (newVal.length === 0) return
				this.listCatchData = {}
				this.load = {}
				this.getList(this.activeIndex)
			}
		},
		// onLoad 在页面 ，created 组件
		created() {
			// TODO tab 还没有赋值
			this.getList(0)
		},
		methods: {
			loadmore() {
				if (this.load[this.activeIndex].loading === 'noMore') return
				this.load[this.activeIndex].page++
				this.getList(this.activeIndex)
			},
			change(e) {
				const {
					current
				} = e.detail
				this.$emit('change', current)
				// TODO 当数据不存在 或者 长度是 0 的情况下，才去请求数据
				if (!this.listCatchData[current] || this.listCatchData[current].length === 0) {
					this.getList(current)
				}

			},
			getList(current) {
				if (!this.load[current]) {
					this.load[current] = {
						page: 1,
						loading: 'loading'
					}
				}
				name = this.tab[current].name
				if(name=='全部'){
					const url = this.Server+'publish/list?pageNum='+this.load[current].page+'&pageSize='+this.pageSize
					console.log(url);
					this.$http.get(url).then(res => {
						const data = res.body.data.list
						for(var i=0;i<data.length;i++){
							data[i].cost = -data[i].cost
						}
						if (data.length === 0) {
							let oldLoad = {}
							oldLoad.loading = 'noMore'
							oldLoad.page = this.load[current].page
							this.$set(this.load, current, oldLoad)
							// 强制渲染页面
							this.$forceUpdate()
							return
						}
						let oldList = this.listCatchData[current] || []
						oldList.push(...data)
						this.$set(this.listCatchData, current, oldList)
					
					})
				}else{
					const url = this.Server+'publish/list?pageNum='+this.load[current].page+'&pageSize='+this.pageSize + '&tag='+name
					this.$http.get(url).then(res => {
						const data = res.body.data.list
						for(var i=0;i<data.length;i++){
							data[i].cost = -data[i].cost
						}
						if (data.length === 0) {
							let oldLoad = {}
							oldLoad.loading = 'noMore'
							oldLoad.page = this.load[current].page
							this.$set(this.load, current, oldLoad)
							// 强制渲染页面
							this.$forceUpdate()
							return
						}
						let oldList = this.listCatchData[current] || []
						oldList.push(...data)
						this.$set(this.listCatchData, current, oldList)
					})
				}

			}
		
		}
	}
</script>

<style lang="scss">
	.home-swiper {
		height: 100%;

		.swiper-item {
			height: 100%;
			overflow: hidden;

			.list-scroll {
				height: 100%;
			}
		}
	}
</style>
