import Service from "../../model/service.js"
import Category from "../../model/category.js"
Page({

  data: {
    tabs: ["全部服务", "在提供", "正在找"],
    categoryList: []
  },

  onLoad(options) {
    this.handleServiceList()
    this.handleCategoryList()
  },

  async handleServiceList() {
    const res = await Service.getServiceList(1, 10)
    console.log(res);
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