import {
  squareurl
} from '../../utils/apis.js'
const util = require('../../utils/util');

Page({
  data: {
    isRealScroll: false, // 滚动状态

    list: [], // 内容列表
    loadingStatus: true, // loading状态
  },
  onShareAppMessage() {
    return {
      title: '【程序员趣图】',
      path: `/pages/square/square`,
      imageUrl: '../../image/peach.jpeg'
    }
  },
  onLoad(option) {
    this.page = 1;
    this.limit = 10;
    this.getLists();

    // 分享页重定向跳转: path需要 encode !!!
    const {
      homeToPage
    } = option;
    if (homeToPage) {
      wx.navigateTo({
        url: decodeURIComponent(homeToPage)
      })
    }
  },
  onUnload() {
    clearInterval(this.scrollFinishTimer);
    clearTimeout(this.pageScrollNavTimer);
    clearTimeout(this.pageScrollTimer);
  },
  touchStart() {
    this.touchStartStatus = true;
  },
  touchEnd() {
    this.touchStartStatus = false;
  },
  // page scrollEnd判断
  setScrollFinishTimer() {
    this.scrollFinishTimer = setInterval(() => {
      if (!this.animateScroll && !this.touchStartStatus && this.data.isRealScroll) {
        clearInterval(this.scrollFinishTimer);
        this.scrollFinishTimer = null;
        this.setData({
          isRealScroll: false
        });
      }
    }, 90);
  },
  // 定时器创建
  setPageScrollTimer(fn, time) {
    return setTimeout(() => {
      fn();
    }, time || 300);
  },

  // 触底加载
  onReachBottom() {
    this.page++;
    this.getLists();
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.page = 1;
    this.limit = 10;
    this.getLists(() => {
      wx.stopPullDownRefresh();
    });
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 4000);
  },

  // 获取列表数据
  getLists(callback) {
    wx.fetch({
      url: squareurl,
      data: {
        pageSize: this.limit,
        pageIndex: this.page,
      }
    }).then(res => {
      if (this.page === 1) this.data.list = [];
      const length = this.data.list.length;
      const resObj = {};

      // 请求到了最后一页
      if (res.data.list.length < this.limit) {
        this.setData({
          loadingStatus: false
        });
        return;
      }

      const {
        success,
        data
      } = res;
      if (success) {
        // const imagePromise = [];
        data.list.forEach((item, i) => {
          const itemDate = new Date(item.createTime);
          resObj[`list[${length + i}]`] = {
            id: item._id,
            title: item.title,
            img: item.img,
            author: item.author,
            createTime: util.transformDateTime(itemDate),
            day: util.fillZero(itemDate.getDate()),
            month: `${itemDate.getMonth() + 1}`
          };
        });
        // console.log(resObj);
        this.setData(resObj);
        if (callback && typeof callback === 'function') {
          callback();
        }
      }

    })
  },
  
  // 更新页面分享参数
  updateShareMessage(shareInfo) {
    this.onShareAppMessage = () => shareInfo;
  },
  
  // 图片预览
  previewImage(event) {
    const {
      url
    } = event.currentTarget.dataset;
    wx.previewImage({
      current: url,
      urls: [url]
    })
  },
  // 获取图片信息
  getImageInfo(imgUrl) {
    return new Promise((reslove, reject) => {
      wx.getImageInfo({
        src: imgUrl,
        success: (res) => {
          reslove(res);
        },
        fail: (err) => {
          reject(err);
        }
      })
    })
  }
})
