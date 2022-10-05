import Http from "../utils/http";

class Category {
  static getCategoryList() {
    return Http.request({
      url: 'v1/category'
    })
  }
}

export default Category