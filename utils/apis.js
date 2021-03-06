import md5 from './md5.min.js'

const appid = '20190514000297574'
const key = '8xV5s2vFt68NBHZKO077'

function translate(q, {
  from = 'auto',
  to = 'auto'
} = {
  from: 'auto',
  to: 'auto'
}) {
  return new Promise((resolve, reject) => {
    let salt = Date.now()
    let sign = md5(`${appid}${q}${salt}${key}`)
    wx.request({
      url: 'https://fanyi-api.baidu.com/api/trans/vip/translate',
      data: {
        q,
        from,
        to,
        appid,
        salt,
        sign
      },
      success(res) {
        if (res.data && res.data.trans_result) {
          resolve(res.data)
        } else {
          reject({
            status: 'error',
            msg: '翻译失败'
          })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 2000
          })
        }
      },
      fail() {
        reject({
          status: 'error',
          msg: '翻译失败'
        })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 2000
        })
      }
    })
  })
}

module.exports.squareurl = `https://www.frontendjs.com/api/hot_funs/list`
module.exports.translate = translate