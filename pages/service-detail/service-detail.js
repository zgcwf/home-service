// pages/service-detail/service-detail.js
import Service from "../../model/service.js"
import User from "../../model/user.js"
import Rating from "../../model/rating.js"

const rating = new Rating()

Page({

  data: {
    service: null,
    serviceId: '',
    isPublisher: false,
    ratingList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad(options) {
    this.data.serviceId = Number(options?.id)
    await this.handleGetServiceDetail()
    await this.handleServiceRatingList()
    this.checkRole()
  },

  async handleGetServiceDetail() {
    const service = await Service.getServiceDetail(this.data.serviceId)
    this.setData({
      service
    })
  },

  async handleServiceRatingList() {
    const ratingList = await rating.reset().getServiceRatingList(this.data.serviceId)
    this.setData({
      ratingList
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