import Http from "../utils/http";

class Service {
  page = 1
  count = 4
  serviceList = []
  hasMoreData = true

  /**
   * @param page 分页页码
   * @param count 分页页面条数
   * @param category_id 服务分类id
   * @param type 服务类型
   */
  async getServiceList(category_id, type) {
    if (!this.hasMoreData) {
      return this.serviceList
    }

    const res = await Http.request({
      url: 'v1/service/list',
      data: {
        page: this.page,
        count: this.count,
        category_id: category_id || "",
        type: type || ""
      }
    })

    this.serviceList = [...this.serviceList, ...res.data]
    this.hasMoreData = !(this.page === res.last_page)
    this.page++
    return this.serviceList
  }

  reset() {
    this.page = 1
    this.count = 4
    this.serviceList = []
    this.hasMoreData = true
    return this
  }

  static getServiceDetail(id) {
    return Http.request({
      url: `v1/service/${id}`
    })
  }
}

export default Service