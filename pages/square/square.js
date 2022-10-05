import service from "../../model/service.js"

Page({

  data: {
    tabs: ["全部服务", "在提供", "正在找"],
    categoryList: [{
        "id": 1,
        "name": "保洁"
      },
      {
        "id": 2,
        "name": "汽修"
      },
      {
        "id": 3,
        "name": "疏通"
      },
      {
        "id": 4,
        "name": "在线教育"
      },
      {
        "id": 5,
        "name": "宠物"
      },
      {
        "id": 6,
        "name": "护理"
      },
      {
        "id": 7,
        "name": "婚恋"
      }
    ]
  },

  onLoad(options) {
    this.handleGetServiceList()
  },

  async handleGetServiceList() {
    const res = await service.getServiceList(1, 10)
    console.log(res);
  },

  handleTabChange(e) {
    console.log(e.detail);
  },

  handleCategoryChange(e) {
    console.log(e.detail);
  },

})