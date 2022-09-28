## WXS

tips:当为了实现某个功能，会导致视图层与逻辑层频繁交互时，就需要考虑是否能使用 WXS 来代替这部分的实现,比如以下两种场景：

1. 需要在 WXML 中对数据进行较复杂的格式化或者转换
2. 像这种频繁的触发事件又做数据绑定的

### 1. ownerInstance 表示的是触发事件的组件所在的组件的实例，如果触发事件的组件是在页面内的,则表示页面实例，

1. 使用 ownerInstance.callMethod(‘函数名’,‘参数’)来调用页面/组件的函数，并给这个方法传递参数;WXS 所在的组件或者页面，必须已经存在要调用的函数。
2. 使用 ownerInstance.triggerEvent(‘事件名称’, ‘参数’)来触发一个自定义事件;想要监听到这个事件，必须是在使用了这个 WXS 的自定义组件外部，即父组件或者页面，才能监听到。

### 2. 限制：

1.  只能使用 ES5 语法，不支持 ES6
2.  不能够调用小程序提供的 Api

## 自定义组件

### 1. 配置

```js
options: {
// 表示启用样式隔离，在自定义组件内外，使用 class 指定的样式将不会相互影响（一般情况下的默认值）
styleIsolation: "isolated",
multipleSlots: true // 在组件定义时的选项中启用多 slot 支持
},
```

### 2. 组件通信

#### 1. 数据绑定：父组件向子组件传递数据

```js
父组件：
<i-tabs tabs="{{tabs}}" /> //tabs为data内的数据

子组件：
 properties: {
    tabs: {
      type: Array,
      value: [],
    }
  },
```

#### 2. 自定义事件：用于子组件向父组件传递数据

tips：自定义事件全部单词小写

```js
父组件：
 <i-tabs tabs="{{tabs}}" bind:onchange="handleTabChange" />  //handleTabChange 为父组件中的回调函数

子组件：
 this.triggerEvent('onchange', tabIndex)  //子组件触发事件，并且传入参数
```

#### 3. 父组件可以获取子组件实例对象：直接访问子组件的任意数据和方法

```js
父组件：
 const child = this.selectComponent('#the-id')

子组件：
 <my-component id="the-id" />
```

## WXML

### 1. 模板向方法传递参数

```js
//wxml：
<swiper-item
  wx:for="{{carouselList}}"
  wx:key="id"
  bindtap="handleCarouselChange"
  data-id="{{item.id}}"
></swiper-item>

//js：
handleCarouselChange(e) {
  const carouselId = e.currentTarget.dataset.id
  // 拿到模板传递的参数
  this.triggerEvent("onchange", carouselId)
},
```

### 2. 列表渲染：wx:for

```js
categoryList: [
  {
    id: 1,
    name: "保洁",
  },
  {
    id: 2,
    name: "汽修",
  },
];

tabs:["进行中","已完成"]

// 1. wk:key="字符串"，代表在item中的某个属性
<swiper-item
  wx:for="{{carouselList}}"
  wx:key="id"
></swiper-item>;

// 2. 保留关键字 *this 代表在 for 循环中的 item 本身，这种表示需要 item 本身是一个唯一的字符串或者数字
<view
  wx:for="{{tabs}}"
  wx:key="*this"
></view>;
```

### 2. 条件渲染：wx:if

```js
<view wx:if="{{length > 2}}"> 1 </view>
<view wx:elif="{{length > 5}}"> 2 </view>
<view wx:else> 3 </view>
```

block wx:if，因为 wx:if 是一个控制属性，需要将它添加到一个标签上。
如果要一次性判断多个组件标签，可以使用一个 <block/> 标签将多个组件包装起来，并在上边使用 wx:if 控制属性。

```js
<block wx:if="{{true}}">
  <view> view1 </view>
  <view> view2 </view>
</block>
```
