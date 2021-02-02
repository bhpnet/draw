import App from './App.vue'
import router from './router'
import store from './store'
//import './assets/js/rem';
import i18n from './i18n/i18n'


Vue.config.productionTip = false

Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
