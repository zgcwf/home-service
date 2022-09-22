// pages/square/square.js
Page({

  data: {
    tabs: ["全部服务", "在提供", "正在找"],
    currentTabIndex: 0
  },
  handleTabChange(event) {
    const currentTabIndex = event.currentTarget.dataset.index
    this.setData({
      currentTabIndex: currentTabIndex
    })
  }

})