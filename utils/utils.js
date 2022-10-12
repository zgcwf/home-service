/**
 * 节流函数
 * @param {Function} callback 需要被节流的函数
 * @param {Number} interval 距离上次执行超过多少毫秒才会执行被节流的函数
 */
function throttle(callback, interval = 150) {
  var last = 0;
  return function () {
    // this和argument
    var _this = this;
    var _arguments = arguments;
    //获取当前时间戳
    var now = new Date().getTime();
    if (now - last > interval) {
      //当前时间减去上一次时间大于间隔时间函数执行
      callback.apply(_this, _arguments);
      last = now;
    }
  }
}

export {
  throttle
}