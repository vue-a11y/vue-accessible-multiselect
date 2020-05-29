# Setup

## Installation

### Via NPM

```bash
$ npm install vue-accessible-multiselect --save
```

### Via Yarn

```bash
$ yarn add vue-accessible-multiselect
```

## Initialization

### As a plugin

It must be called before `new Vue()`.

```js
import Vue from 'vue'
import VueAccessibleMultiselect from 'vue-accessible-multiselect'

Vue.use(VueAccessibleMultiselect)
```

### As a global component

```js
import Vue from 'vue'
import { VueAccessibleMultiselect } from 'vue-accessible-multiselect'

Vue.component('VueAccessibleMultiselect', VueAccessibleMultiselect)
```

### As a local component

```js
import { VueAccessibleMultiselect } from 'vue-accessible-multiselect'

export default {
  name: 'YourAwesomeComponent',
  components: {
    VueAccessibleMultiselect,
  },
}
```

::: tip
To set global options (for example `transition` for each multiselect component), you should do the following:
:::

```js
import { config } from 'vue-accessible-multiselect'

config.transition = {
  name: 'foo',
}
```

::: tip
Options passed locally via `props` will always take precedence over global config options.
:::

Default `config.js`:

```js
export default {
  transition: null,
}
```
