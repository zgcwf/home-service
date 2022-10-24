import Service from "../../model/service.js"
import Category from "../../model/category.js"

const service = new Service()

Page({

  data: {
    tabs: ["全部服务", "在提供", "正在找"],
    categoryList: [],
    serviceList: [],
    tabIndex: "",
    categoryId: "",
    loading: true
  },

  async onLoad(options) {
    await this.handleServiceList()
    await this.handleCategoryList()
    this.setData({
      loading: false
    })
  },

  // 页面下拉刷新的处理函数
  onPullDownRefresh() {
    this.handleServiceList()
    // 停止下拉刷新
    wx.stopPullDownRefresh()
  },

  // 页面上拉触底事件的处理函数
  async onReachBottom() {
    // 因为需要获取下一页数据并于当前数据合并，所以不能复用handleServiceList方法
    const serviceList = await service.getServiceList(this.data.categoryId, this.data.tabIndex)
    this.setData({
      serviceList
    })
  },

  async handleServiceList() {
    const serviceList = await service.reset().getServiceList(this.data.categoryId, this.data.tabIndex)
    this.setData({
      serviceList
    })
  },

  async handleCategoryList() {
    const res = await Category.getCategoryList()
    const categoryList = [{
      id: 0,
      name: "全部"
    }, ...res]
    this.setData({
      categoryList
    })
  },

  handleTabChange(e) {
    this.data.tabIndex = e.detail
    this.handleServiceList()
  },

  handleCategoryChange(e) {
    this.data.categoryId = e.detail
    this.handleServiceList()
  },

  handleSelectedService(e) {
    const serviceId = e.currentTarget.dataset.service.id
    this.goToServiceDetailPage(serviceId)
  },

  goToServiceDetailPage(id) {
    wx.navigateTo({
      url: `/pages/service-detail/service-detail?id=${id}`,
    })
  }

})