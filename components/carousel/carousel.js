// components/carousel/carousel.js
import {
  throttle
} from '../../utils/utils'
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
    handleCarouselChange: throttle(function (e) {
      const carouselId = e.currentTarget.dataset.id
      if (carouselId === this.data.currentCarouselId) return

      this.setData({
        currentCarouselId: carouselId
      })

      this.triggerEvent("onchange", carouselId)
    }),
  }
})