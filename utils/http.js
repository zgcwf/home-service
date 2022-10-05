import {
  wxToPromise
} from "./wx"
import APIConfig from "../config/api"
import errorMessage from "../config/error-message"

class Http {
  // static 静态方法，无需实例化即可调用
  static async request({
    url,
    data,
    method = 'GET'
  }) {
    const res = await wxToPromise('request', {
      url: APIConfig.baseUrl + url,
      data,
      method
    })

    // 请求成功
    if (res.statusCode < 400) {
      return res.data.data
    }

    this.showErrorMsg(res.data.error_code, res.data.message)

  }

  static showErrorMsg(errorCode, message) {
    console.log(222);
    let title = errorMessage[errorCode] || message || '未知异常'
    title = this.formatMessage(title)
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000,
      mask: true
    })
  }

  static formatMessage(message) {
    return typeof message === 'object' ? Object.values(message).join(';') : message
  }
}

export default Http

// wx.request({
//   url: APIConfig.baseUrl + url,
//   data,
//   method,
//   success: (res) => {
//     console.log(res);
//     this.showErrorMsg(res.data.error_code, res.data.message)
//   }
// })