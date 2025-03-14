# Vue 技巧

::: tip 前言
工欲善其事，必先利其器
:::

## 单个组件懒加载

点击按钮，动态加载一个页面外的组件：
```html
<template>
  <div id="app">
    <button @click="loadComponent">加载组件</button>
    <component :is="dynamicComponent" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dynamicComponent: null,
    };
  },
  methods: {
    loadComponent() {
      // 动态加载组件
      import('./components/MyComponent.vue').then(module => {
        this.dynamicComponent = module.default;
      }).catch(error => {
        console.error('Error loading component:', error);
      });
    },
  },
};
</script>
```


## 滚动加载的核心逻辑

1. 定义辅助变量

```js
cacheList: [],
cacheIndex: 1,
```

2. 设置初始值，比如头 4 个 item

```js
this.list = this.cacheList.slice(0, this.cacheIndex * 4);
```

3. 监听滚动事件

```js
listenScrollbar() {
  // cacheList: [],
  // cacheIndex: 1,
  // 一把锁，避免多次触发滚动到底部的事件
  let hasReachedBottom = false
  // 滚动事件的回调函数
  const handleScroll = (e) => {
    // 计算距离底部的距离：实际滚动的DIV的高度 - (窗口高度 + 已滚动的距离)
    const distanceToBottom = document.querySelector('#layout').offsetHeight - (window.innerHeight + window.scrollY)
    // 距离页面底部小于20px时，并且还未抵达底部
    if (distanceToBottom <= 20 && !hasReachedBottom) {
      // 从缓存数组里截取对应的片段，这里是4个item一个片段
      // cacheIndex初始值是1，每次截取完片段，就将其增加1
      this.list.push(...this.cacheList.slice(this.cacheIndex * 4, (this.cacheIndex + 1) * 4))
      this.cacheIndex++
      hasReachedBottom = true
    } else if (distanceToBottom > 20) {
      hasReachedBottom = false
    }
  }
  // 绑定滚动事件
  window.addEventListener('scroll', handleScroll)
  // 监听组件销毁事件，解除绑定
  this.$once('hook:beforeDestroy', () => {
    window.removeEventListener('scroll', handleScroll)
  })
}
```

## 部署路径

通过设置**空路径**，可以将 vue 项目部署到任意子路径。

```js
// vue.config.js
module.exports = defineConfig({
  publicPath: "",
});

// vite.config.js
export default defineConfig({
  base: "",
});
```

## DefineProps 的坑

```html
<script setup>
  // 只能在顶层使用，前面不能有代码，坑！
  const props = defineProps(["myCanvas"]);
</script>
```

## Vue3 自动引入模块

使用 `unplugin-auto-import/vite` 自动引入常用模块

```js
plugins: [
    vue(),
    AutoImport({
      imports: ["vue"],
    })
  ],
```

## 一款插件实现 office 文件在线预览

[vue-office](https://501351981.github.io/vue-office/examples/docs/)支持 **word(.docx)、excel(.xlsx)、pdf** 等各类型 office 文件预览的 vue 组件集合，提供一站式 office 文件预览方案，**支持 vue2 和 3，也支持 React 等非 Vue 框架。**

## 自定义 vue 代码片段

**VS Code** 左下角`齿轮` > `User Snippets` > `vue.json`，替换成以下内容：

```json
{
  "Print to console": {
    "prefix": "vue2",
    "body": [
      "<template>",
      "  <div class='myComponent-wrap'></div>",
      "</template>",
      "",
      "<script>",
      "export default {",
      "  name: 'myComponent',",
      "  components: {},",
      "  props: {},",
      "  data() {",
      "    return {};",
      "  },",
      "  computed: {},",
      "  mounted() {},",
      "  methods: {},",
      "  watch: {},",
      "};",
      "</script>",
      "",
      "<style scoped lang='scss'>",
      ".myComponent-wrap {",
      "}",
      "</style>"
    ],
    "description": "vue2快速新建模板"
  }
}
```

## 手动双向绑定

1. 使用默认变量实现双向绑定

```html
<template>
  <div>
    <span>{{ value }}</span>
    <button @click="decrease">-</button>
    <button @click="increase">+</button>
  </div>
</template>

<script>
  // 使用示例：
  // <count v-model="num"></count>
  export default {
    name: "count",
    props: ["value"], // 默认是value，需要在props中声明
    data() {
      return {};
    },
    methods: {
      increase() {
        // 需要构建新值
        let v = this.value + 1;
        // 使用默认input事件，把新值传给父级组件
        // vue3中的事件名变成：update:modelValue
        this.$emit("input", v);
      },
      decrease() {
        let v = this.value - 1;
        // vue3中的事件名变成：update:modelValue
        this.$emit("input", v);
      },
    },
  };
</script>
```

2. 自定义变量实现双向绑定

```html
<template>
  <div>
    <span>{{ val }}</span>
    <button @click="decrease">-</button>
    <button @click="increase">+</button>
  </div>
</template>

<script>
  // 使用示例：
  // <count v-model="num"></count>
  export default {
    name: "count",
    model: {
      prop: "val", // 自定义变量名
      event: "changeVal", // 自定义事件名
    },
    props: ["val"], // 需要在props中声明
    data() {
      return {};
    },
    methods: {
      increase() {
        // 需要构建新值
        let v = this.val + 1;
        // 使用changeVal事件，把新值传给父级组件
        this.$emit("changeVal", v);
      },
      decrease() {
        let v = this.val - 1;
        this.$emit("changeVal", v);
      },
    },
  };
</script>
```

## 事件传参

如果需要拿到事件对象

```html
<!-- 第一个参数是事件对象，第二个参数是自定义数据 -->
<button @click="handleClick($event, item)"></button>
```

```js
// 第一个参数是事件对象，第二个参数是自定义数据
handleClick(e,item) {
  e.preventDefault()
}
```

## 批量注册全局组件

新增一个文件：`/components/register.js`

```js
import Vue from "vue";
// require.context返回一个函数，可以加载文件模块
const requireComponent = require.context("./", false, /\.vue$/);

requireComponent.keys().forEach((fileName) => {
  // 加载某个组件，获取组件配置
  const componentConfig = requireComponent(fileName);
  // 提取文件名，原始的fileName是这种格式：./ErrorPage.vue
  const componentName = fileName
    .split("/")
    .pop()
    .replace(/\.\w+$/, "");
  // 全局注册组件
  Vue.component(componentName, componentConfig.default || componentConfig);
});
```

在`main.js`中引入，即可批量全局注册组件

```js
import "@/components/register";
```

## Vue 动态插槽技术

```html
<!-- 在自己封装的子组件中 -->
<template v-for="(index, name) in $scopedSlots" v-slot:[name]="data">
  <slot :name="name" v-bind="data"></slot>
</template>
```

说明：

- `$scopedSlots` 是 Vue.js 中一个特殊的属性，它是一个对象，包含了父组件传递下来的作用域插槽的信息。
- 这个模板允许动态创建插槽，当父组件需要提供不同名称和数据的可变数量的插槽时，非常有用。

## 组合式加载自定义组件

核心思想是：

1. **一个组件加载器**：通过 v-for 循环渲染的 `<component>` 组件
2. **一个组件注册器**：自动注册某个文件夹下的所有自定义组件
3. **一堆自定义组件**：可自由组合使用

```html
<!-- 组件加载器: index.uve -->
<template>
  <div class="dynamic-wrap">
    <!-- 动态匹配加载组件，并且将每一个组件对象传入到子组件 -->
    <component :is="c.name" v-for="(c, i) in listData" :key="i" :childData="c"></component>
  </div>
</template>

<script>
  // 引入隔壁加载的组件列表
  import list from "./list";
  export default {
    name: "dynamic",
    props: {
      listData: {
        type: Array,
        default: function () {
          return [
            {
              name: "", // 子组件名称
              key: "", // 自定义的字段
              models: {}, // 数据层，子组件绑定的数据对象里面的每一个key
              requiredData: [], // 子组件依赖的初始数据
            },
          ];
        },
      },
    },
    components: list, //注册隔壁加载的组件列表
    data() {
      return {};
    },
  };
</script>
```

```js
// 组件注册器：list.js
// 动态加载当前文件夹下的所有非index的vue后缀的组件
const files = require.context(".", false, /[^index]\.vue$/);
const components = {};
files.keys().forEach((key) => {
  // 匹配以 ./ 开头、以 .vue 结尾的字符串，并将中间部分的字符序列保存到分组中。
  // 然后，在 replace 方法中，将匹配到的字符串替换为 $1，即分组中保存的字符序
  const name = key.replace(/^.\/(.*)\.vue/, "$1");
  components[name] = files(key).default;
});
export default components;
```

## 自动批量加载文件

通过`webpack`打包的项目可以通过下面的方法批量加载文件

```js
// 自动加载modules文件夹下的所有js文件
const context = require.context("./modules", true, /\.js$/);
// 通过遍历数组加载模块
context.keys().forEach((filename) => {
  // 加载文件
  context(filename);
});
```

## ElementUI 表格自定义列抖动问题

```js
// 每次新增或删除列，需要重新绘制表格，否则表格会抖动
this.$nextTick(() => {
  this.$refs.multiTable.doLayout();
});
```

## computed 传参

```javascript
computed: {
  genUrl() {
    return function (str) {
      return `https://${str}:8090/${this.path}`
    }
  }
}
```

## 在 vue 中使用防抖技术

```javascript
// 方式一：
// <el-button @click="handleClick">防抖</el-button>
// 直接引入工具函数对象
import utils from "@/utils/index.js";
export default {
  methods: {
    handleClick: utils.debounce(() => {
      console.log("防抖");
    }, 2000),
  },
};
```

```javascript
// 方式二：
// <el-button @click="handleClick">防抖</el-button>
created() {
  // 使用全局的工具函数对象
  this.handleClick = this.$utils.debounce(() => {
    console.log("防抖");
  }, 2000);
}
```

## Vue 中父子组件生命周期顺序

1. 父 beforeCreate -> 父 created -> 父 beforeMount ->
2. 子 beforeCreate -> 子 created -> 子 beforeMount -> 子 mounted ->
3. 父 mounted

4. 父 beforeUpdate->子 beforeUpdate->子 updated->父 updated

5. 父 beforeDestroy->子 beforeDestroy->子 destroyed->父 destroyed
