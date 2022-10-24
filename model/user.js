class User {
  static getUserInfoByLocal() {
    return wx.getStorageSync('userInfo')
  }
}

export default User