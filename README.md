# vue-accessible-multiselect

> Vue.js accessible multiselect component made according to [WAI-ARIA practices](https://www.w3.org/TR/wai-aria-practices/#Listbox).

## Table of contents

- [vue-accessible-multiselect](#vue-accessible-multiselect)
  - [Table of contents](#table-of-contents)
  - [Features](#features)
  - [Demo](#demo)
  - [Installation](#installation)
    - [Via NPM](#via-npm)
    - [Via Yarn](#via-yarn)
  - [Initialization](#initialization)
    - [As a plugin](#as-a-plugin)
    - [As a global component](#as-a-global-component)
    - [As a local component](#as-a-local-component)
  - [Usage](#usage)
    - [Template](#template)
    - [Script](#script)
    - [Styles](#styles)
    - [API](#api)
      - [Props](#props)
      - [Slots](#slots)
        - [Example of possible usage of `slots` and `scopedSlots`](#example-of-possible-usage-of-slots-and-scopedslots)
  - [Keyboard shortcuts](#keyboard-shortcuts)
  - [Tests](#tests)
    - [Unit](#unit)
  - [Development](#development)
  - [Build](#build)
  - [Powered by](#powered-by)
  - [License](#license)

## Features

- ♿️ fully accessible to screen readers;
- ⌨️ supports keyboard navigation (there really a lot of keyboard shortcuts);
- 🔣 type-ahead to focus option that starts with typed symbols;
- 💅 style agnostic, so you can style it whatever you like (but including `core.scss` is highly encouraged).

## Demo

[![Edit vue-accessible-multiselect](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/vue-accessible-multiselect-u7rdh)

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

> ℹ️ Note! To set global options (for example `transition` for each multiselect component), you should do the following:

```js
import { config } from 'vue-accessible-multiselect'

config.transition = {
  name: 'foo',
}
```

> ⚠️ Note! Options passed locally via `props` will always take precedence over global config options.

Default `config.js`:

```js
export default {
  transition: null,
}
```

## Usage 

### Template

```html
<template>
  <vue-accessible-multiselect
    v-model="value"
    :options="options"
    :transition="{ name: 'foo' }"
    label="foo"
    placeholder="bar"
    disabled
  ></vue-accessible-multiselect>
</template>
```

### Script

```js
export default {
  // ...
  data() {
    return {
      value: [],
      options: [
        {
          value: 0,
          label: '🍇 Grape',
        },
        {
          value: { foo: 'bar' },
          label: '🍉 Watermelon',
        },
        {
          value: [1, 2, 3],
          label: '🥝 Kiwi',
        },
        {
          value: false,
          label: '🥭 Mango',
        },
        {
          value: true,
          label: '🍓 Strawberry',
        },
        {
          value: 'lemon',
          label: '🍋 Lemon',
        },
      ],
    }
  },
  // ...
}
```

### Styles

After that don't forget to include core styles. Note that library is sipped with default theme styles you can use.

`SASS`:

```scss
// recommended
@import 'vue-accessible-multiselect/src/styles/core.scss';

// optional
@import 'vue-accessible-multiselect/src/styles/themes/default.scss';
```

Or already compiled `CSS`:

```css
/* recommended */
@import 'vue-accessible-multiselect/dist/styles/core.scss';

/* optional */
@import 'vue-accessible-multiselect/dist/styles/themes/default.scss';
```

> ⚠️ Note! When you import already compiled CSS you don't have ability to override `SASS` variables during build process, so it is preferable to use `.scss` file.

`core.scss`, contains some `SASS` variables you can override during build process:

```scss
$v-multiselect-menu-position-top: 100% !default;
$v-multiselect-arrow-size: 8px !default;
```

`/themes/default.scss` `SASS` variables are listed [here](https://github.com/andrewvasilchuk/vue-accessible-multiselect/blob/master/src/styles/core.scss).

### API

#### Props

`<vue-accessible-multiselect>` accepts some `props`:

| Prop                  | Description                                                                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options: array`      | `required`. Array of multiselect options. Should be an array of objects that match the following pattern `{ value: any, label: string }`                                |
| `value: array`        | `required`. Current value of multiselect.                                                                                                                               |
| `label: string`       | Multiselect label                                                                                                                                                       |
| `placeholder: string` | Multiselect placeholder                                                                                                                                                 |
| `disabled: boolean`   | Whether multiselect is disabled                                                                                                                                         |
| `transition: object`  | Through this object you can configure the transition of `.v-multiselect__menu` entrance and leave. Should match the following pattern `{ name: string, mode: string? }` |

#### Slots

`<vue-accessible-multiselect>` provides you with some `slots` and `scopedSlots` you can use to fit your needs.

| Slot          | Scope                | Description      |
| ------------- | -------------------- | ---------------- |
| `label`       |                      | Label slot       |
| `prepend`     |                      | Prepend slot     |
| `placeholder` | `{ placeholder }`    | Placeholder slot |
| `selected`    | `{ value, options }` | Selected slot    |
| `arrow`       |                      | Arrow slot       |
| `option`      | `{ value, option }`  | Option slot      |
| `no-options`  |                      | No options slot  |

##### Example of possible usage of `slots` and `scopedSlots`

```html
<vue-accessible-multiselect>
  <template v-slot:prepend>
    <svg viewBox="0 0 54 54">
      <path d="M27 1l8 17 19 3-14 13 4 19-17-9-17 9 3-19L0 21l19-3z" />
    </svg>
  </template>
  <template v-slot:label
    >😋 Select one of the following options:</template
  >
  <template v-slot:placeholder
    >🎃 Select one of the following options</template
  >
  <template v-slot:arrow>💎</template>
  <template v-slot:selected="{ value, options }">🔥 Woooow, {{ value }}</template>
  <template v-slot:option="{ option }"
    >{{ option.label }}</template
  >
</vue-accessible-multiselect>
```

## Keyboard shortcuts

`<vue-accessisble-select>` is fully accessible when it comes to keyboard interaction.

Here is some useful keys and their appropriate actions:

- `Down Arrow` Moves focus to the next option
- `Up Arrow` Moves focus to the previous option
- `Home` Moves focus to first option
- `End` Moves focus to last option
- `Space` Changes the selection state of the focused option
- `Shift + Down Arrow` Moves focus to and toggles the selected state of the next option
- `Shift + Up Arrow` Moves focus to and toggles the selected state of the previous option
- `Shift + Space` Selects contiguous items from the most recently selected item to the focused item
- `Control + Shift + Home` Selects the focused option and all options up to the first option. Moves focus t first option.
- `Control + Shift + End` Selects the focused option and all options down to the last option. Moves focus t last option
- `Control + A` Selects all options in the list. If all options are selected, unselects all options

Type ahead:

- Type a character: focus moves to the next option with a label that starts with the typed character;
- Type multiple characters in rapid succession: focus moves to the next option with a label that starts with the string of characters typed.

## Tests

### Unit

[`Jest`](https://jestjs.io) and [`VueTestUtils`](https://vue-test-utils.vuejs.org) is used for unit tests.

You can run unit tests by running next command:

```bash
npm run test:unit
```

## Development

1. Clone this repository
2. Install dependencies using `yarn install` or `npm install`
3. Start development server using `npm run dev`

## Build

1. To build production ready build simply run `npm run build`:

After successful build the following `dist` folder will be generated:

```
├── styles
│   ├── themes
│   │   ├── default.css
│   ├── core.css
├── vue-accessible-multiselect.common.js
├── vue-accessible-multiselect.esm.js
├── vue-accessible-multiselect.js
├── vue-accessible-multiselect.min.js
```

## Powered by

- `Rollup` (and plugins)
- `Babel`
- `SASS` and `node-sass`
- `PostCSS`
- `Autoprefixer`
- `Jest`
- `Vue Test Utils`
- `keycode-js`
- `lodash`

## License

[MIT](http://opensource.org/licenses/MIT)
