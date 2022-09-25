// components/carousel/carousel.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    carouselList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentCarouselId: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCarouselChange(e) {
      const carouselId = e.currentTarget.dataset.id
      this.setData({
        currentCarouselId: carouselId
      })

      this.triggerEvent("change", carouselId)
    },
  }
})