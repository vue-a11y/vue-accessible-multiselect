# vue-accessible-multiselect

Vue.js accessible multiselect component made according to [WAI-ARIA practices](https://www.w3.org/TR/wai-aria-practices/#Listbox).

## Features

- ♿️ fully accessible to screen readers;
- ⌨️ supports keyboard navigation (there really a lot of keyboard shortcuts);
- 🔣 type-ahead to focus option that starts with typed symbols;
- 💅 style agnostic, so you can style it whatever you like (but including `core.scss` is highly encouraged).

## Links
- [Documentation](https://multiselect.vue-a11y.com)
- [Demo - Edit on codesandbox](https://codesandbox.io/s/vue-accessible-multiselect-u7rdh)

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
