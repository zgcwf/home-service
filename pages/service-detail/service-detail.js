// pages/service-detail/service-detail.js
import Service from "../../model/service.js"
import User from "../../model/user.js"

Page({

  data: {
    service: null,
    serviceId: '',
    isPublisher: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.data.serviceId = Number(options?.id)
    await this.handleGetServiceDetail()
    this.checkRole()
  },

  async handleGetServiceDetail() {
    const service = await Service.getServiceDetail(this.data.serviceId)
    this.setData({
      service
    })
  },

  checkRole() {
    const userInfo = User.getUserInfoByLocal();
    if (userInfo && userInfo.id === this.data.service.publisher.id) {
      this.setData({
        isPublisher: true
      })
    }
  },

})