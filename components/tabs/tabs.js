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
    handleTabChange(event) {
      const tabIndex = event.currentTarget.dataset.index
      this.setData({
        currentTabIndex: tabIndex
      })

      this.triggerEvent('change', tabIndex)
    },
  },

  options: {
    //  表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）
    styleIsolation: "isolated"
  },

})