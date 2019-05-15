
const util = require('../../utils/util');
const CLunar = require('../../utils/chinese-lunar');

const app = getApp();

const dayText = ['日', '一', '二', '三', '四', '五', '六'];

Page({
  data: {
    dateInfo: null,
    pageCards: [{
      name: 'square',
      text: '趣图广场',
      icon: 'application-joke.png'
    }, {
      name: 'translate',
      text: '翻译',
      icon: 'application-star.png'
    }, {
      name: 'postalCode',
      text: '邮编查询',
      icon: 'application-images.png'
    }, {
      name: 'cal',
      text: '计算器',
      icon: 'application-stock.png'
    }, {
      name: 'todos',
      text: '待办清单',
      icon: 'application-weather.png'
    } ]
  },
  onShareAppMessage() {
    return {
      title: 'toolbox',
      path: `/pages/index/index`,
      imageUrl: '../../image/peach.jpeg'
    }
  },
  onLoad() {
    const current = new Date();
    this.setData({
      dateInfo: {
        chineseDate: CLunar.solarToLunar(current, 'YMD'),
        weekDay: `周${dayText[current.getDay()]}`,
        date: util.fillZero(current.getDate())
      }
    })
  },
  // 跳转
  onNavigatorTap(e) {
    var index = e.currentTarget.dataset.index
    var item = this.data.pageCards[index]
    if (item.name == 'square') {
      wx.navigateTo({
        url: '../square/square',
      })
    } else if (item.name == 'todos') {
      wx.navigateTo({
        url: '../todos/todos',
      })
    } else if (item.name == 'cal') {
      wx.navigateTo({
        url: '../cal/cal'
      })
    } else if (item.name == 'postalCode') {
      wx.navigateTo({
        url: '../postalCode/postalCode'
      })
    } else if (item.name == 'translate') {
      wx.navigateTo({
        url: '../translate/index',
      })
    }
  }
})