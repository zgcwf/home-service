class Base {
  page = 1
  count = 4
  list = []
  hasMoreData = true

  reset() {
    this.page = 1
    this.count = 4
    this.list = []
    this.hasMoreData = true
    console.log('this', this);
    return this
  }
}

export default Base