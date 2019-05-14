const fetch = require('./utils/fetch');
const storage = require('./utils/storage');

wx.fetch = fetch;


App({
  onLaunch() {},
  globalData: {},
  /**
   * 用于判断空，Undefined String Array Object
   */
  isBlank: function (str) {
    if (Object.prototype.toString.call(str) === '[object Undefined]') { //空
      return true
    } else if (
      Object.prototype.toString.call(str) === '[object String]' ||
      Object.prototype.toString.call(str) === '[object Array]') { //字条串或数组
      return str.length == 0 ? true : false
    } else if (Object.prototype.toString.call(str) === '[object Object]') {
      return JSON.stringify(str) == '{}' ? true : false
    } else {
      return true
    }
  },
  appConfig: {
    listRotateAnimation: storage.get(storage.keys.listRotateAnimation, true) || false, // 列表页面卡片动画
    appHomePath: '/pages/index/index', // 自定义导航首页路径
  },
  version: 'v1.0.0',
})