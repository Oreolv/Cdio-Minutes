import Vue from 'vue'
import App from './App'
import  VueResource  from 'vue-resource'
Vue.config.productionTip = false
Vue.prototype.checkLogin = function(backpage,backtype){
	var id = uni.getStorageSync('id');
	var name = uni.getStorageSync('name');
	var firstIcon = uni.getStorageSync('firstIcon');
	var nickname = uni.getStorageSync('nickname');
	if(id==''||name==''){
		uni.showToast({
			title: '请先登录',
			icon: 'none',
			duration: 2000
		})
		setTimeout(function() {
			uni.redirectTo({
				url:'/pages/login/login?backpage='+backpage+'&backtype='+backtype
			})
		}, 2000)
		
		return false;
	}
	return [id,name,firstIcon,nickname];
}

Vue.prototype.apiServer = 'http://47.98.49.243:9090/api/v1/'
Vue.prototype.Server = 'http://47.98.49.243:9090/'
Vue.use(VueResource) 
Vue.http.headers.common['Authorization'] = uni.getStorageSync('token');

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
