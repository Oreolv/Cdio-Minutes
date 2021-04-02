# 欢迎使用cul-chat

**cul-chat是一个聊天界面UI**



>##### 这是我遇到的一个问题，然后自己做出的解决办法，目前已经解决了我的问题，现在分享出来给大家使用。别的我也没有深入的去弄了，因为我这边软件仅需要考虑安卓系统，所以H5、小程序、IOS、NVUE等等是否存在兼容问题，我并不能确定。如果插件不能解决你的问题或者你无法使用，可以在评论区留言，共同探讨解决办法。>这是我遇到的一个问题，然后自己做出的解决办法，目前已经解决了我的问题，现在分享出来给大家使用。别的我也没有深入的去弄了，因为我这边软件仅需要考虑安卓系统，所以H5、小程序、IOS、NVUE等等是否存在兼容问题，我并不能确定。如果插件不能解决你的问题或者你无法使用，可以在评论区留言，共同探讨解决办法。


## 安装

在开启easycom以后，无需引入，在页面直接使用即可

```html
<cul-chat anotherAvatar="/static/girl.png" meAvatar="/static/boy.png" scrollHeight="500" @submit="sendMsg"></cul-chat>
```

如果使用的是老版本的Hbuilder，还需要引入，那就按照正常的引入流程


####在 script 中引用组件
```javascript
import culChat from '@/components/cul-chat/cul-chat.vue'
export default {
	components: {
		culChat
	}
}
```
####在 template 中使用组件
```html
<cul-chat anotherAvatar="/static/girl.png" meAvatar="/static/boy.png" scrollHeight="500" @submit="sendMsg"></cul-chat>
```

## 属性说明
| **属性名**  | **类型**  | **默认值**  |  **说明** |
| ------------ | ------------ | ------------ | ------------ |
| anotherAvatar  |  String | - |  对方头像地址    (必填，可以是本地、网络、base64地址) |
| meAvatar  |  String | -  | 自己头像地址 (必填，可以是本地、网络、base64地址)  |
| scrollHeight  |  Number |  100vh | 聊天框高度，默认全屏 (必填，可以是本地、网络、base64地址)  |

## 事件说明
| **方法名称**  | **说明**  |
| ------------ | ------------ |
|  submit |  用户点击发送后会执行该方法，方法返回值参考submit参数 |

## submit参数
| **属性名**  | **类型**  |  **说明** |
| ------------ | ------------ |------------ |
| message  |  String |输入框发送的消息|
| callback  |  function(e) | 回调方法，参数为对方返回的消息，如果回调方法不写，会导致聊天框内没有对方消息展示 |

