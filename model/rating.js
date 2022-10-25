import Http from "../utils/http";
import Base from "./base";

class Rating extends Base {
  /**
   * 
   * @param {page} 分页页码 
   * @param {count} 每页条数
   * @param {service_id} 服务id
   */
  async getServiceRatingList(serviceId) {
    if (!this.hasMoreData) {
      return this.list
    }

    const res = await Http.request({
      url: 'v1/rating/service',
      data: {
        page: this.page,
        count: this.count,
        service_id: serviceId
      }
    })

    this.list = [...this.list, ...res.data]
    this.hasMoreData = !(this.page === res.last_page)
    this.page++
    return this.list
  }
}

export default Rating