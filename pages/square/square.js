import Service from "../../model/service.js"
import Category from "../../model/category.js"

const service = new Service()

Page({

  data: {
    tabs: ["全部服务", "在提供", "正在找"],
    categoryList: [],
    serviceList: []
  },

  onLoad(options) {
    this.handleServiceList()
    this.handleCategoryList()
  },

  // 页面下拉刷新的处理函数
  async onPullDownRefresh() {
    const serviceList = await service.reset().getServiceList()
    this.setData({
      serviceList
    })
    // 停止下拉刷新
    wx.stopPullDownRefresh()
  },

  // 页面上拉触底事件的处理函数
  onReachBottom() {
    this.handleServiceList()
  },

  async handleServiceList() {
    const serviceList = await service.getServiceList()
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
    console.log(e.detail);
  },

  handleCategoryChange(e) {
    console.log(e.detail);
  },

})