// 将微信API转换为Promise风格
/**
 * 
 * @param method  微信内部提供的方法
 * @param options 该方法的配置项
 */
function wxToPromise(method, options = {}) {
  return new Promise((resolve, reject) => {
    options.success = resolve
    options.fail = err => {
      reject(err)
    }
    wx[method](options)
  })
}

export {
  wxToPromise
}