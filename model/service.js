import Http from "../utils/http";

class Service {
  /**
   * @param page 分页页码
   * @param count 分页页面条数
   * @param category_id 服务分类id
   * @param type 服务类型
   */
  getServiceList(page, count, category_id = null, type = null) {
    return Http.request({
      url: 'v1/service/list',
      data: {
        page,
        count
      }
    })
  }

}

export default new Service()