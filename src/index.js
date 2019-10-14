import VueAccessibleMultiselect from './components/VueAccessibleMultiselect/VueAccessibleMultiselect.vue'

import config from './config'

const Plugin = {
  install(Vue) {
    // Make sure that plugin can be installed only once
    if (this.installed) {
      return
    }

    this.installed = true

    Vue.component('VueAccessibleMultiselect', VueAccessibleMultiselect)
  },
}

export default Plugin

export { VueAccessibleMultiselect, config }
