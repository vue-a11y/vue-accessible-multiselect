import Vue from 'vue'
import App from './App.vue'
import VueAccessibleMultiselect, { config } from '../src'

Vue.config.productionTip = false

/* config.transition = {
  name: 'fade'
} */

Vue.use(VueAccessibleMultiselect)

new Vue({
  el: '#app',
  render: h => h(App),
})
