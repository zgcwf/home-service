// components/tabs/tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentTabIndex: 0,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabChange(e) {
      const tabIndex = e.currentTarget.dataset.index

      if (tabIndex === this.data.currentTabIndex) return

      this.setData({
        currentTabIndex: tabIndex
      })

      this.triggerEvent('onchange', tabIndex)
    },

    handleTouchMove(value) {
      const direction = value
      const currentTabIndex = this.data.currentTabIndex
      const targetTabIndex = currentTabIndex + direction

      if (this.disableTouchSlide(targetTabIndex)) return

      // 自定义数据Event，使其能够满足handleTabChange函数的参数结构
      const customEvent = {
        currentTarget: {
          dataset: {
            index: targetTabIndex
          }
        }
      }
      this.handleTabChange(customEvent)
    },

    disableTouchSlide(targetTabIndex) {
      const disabled = targetTabIndex < 0 || targetTabIndex > this.properties.tabs.length - 1
      return disabled ? true : false
    }
  },



  options: {
    //  表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）
    styleIsolation: "isolated",
    multipleSlots: true // 在组件定义时的选项中启用多 slot 支持F
  },

})