(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-test-test"],{"07e0":function(t,e,a){"use strict";a.r(e);var n=a("0d42"),u=a.n(n);for(var r in n)"default"!==r&&function(t){a.d(e,t,(function(){return n[t]}))}(r);e["default"]=u.a},"0d42":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{}},methods:{sendMsg:function(t){},changeAvatar:function(){var e=this;uni.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(a){var n=a.tempFilePaths;t.log("baseUrl:"+e.$baseUrl);var u=uni.getStorageSync("userInfo");uni.uploadFile({url:e.$baseUrl+"/file/fileUpload",filePath:n[0],name:"file",formData:{},header:{Authorization:u.token},success:function(a){t.log(a.data),0===a.data.code?e.avatar=a.data.data:uni.showToast({title:a.data.message})}})}})}}};e.default=a}).call(this,a("5a52")["default"])},c458:function(t,e,a){"use strict";var n;a.d(e,"b",(function(){return u})),a.d(e,"c",(function(){return r})),a.d(e,"a",(function(){return n}));var u=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-button",{attrs:{type:"default"},on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.changeAvatar.apply(void 0,arguments)}}},[t._v("aaa")])],1)},r=[]},d7c1:function(t,e,a){"use strict";a.r(e);var n=a("c458"),u=a("07e0");for(var r in u)"default"!==r&&function(t){a.d(e,t,(function(){return u[t]}))}(r);var c,i=a("f0c5"),o=Object(i["a"])(u["default"],n["b"],n["c"],!1,null,"6b7fdd4b",null,!1,n["a"],c);e["default"]=o.exports}}]);