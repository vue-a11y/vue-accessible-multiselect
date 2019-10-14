<template>
  <div id="app">
    <h1>vue-accessible-multiselect</h1>
    <section>
      <h2>Default usage</h2>
      <form action="/foo" method="POST">
        <vue-accessible-multiselect
          v-model="value"
          :options="options"
          :disabled="disabled"
          label="Select one of the following options"
          placeholder="Select one of the following options"
        >
          <template v-slot:prepend>
            <svg viewBox="0 0 54 54">
              <path d="M27 1l8 17 19 3-14 13 4 19-17-9-17 9 3-19L0 21l19-3z" />
            </svg>
          </template>
          <template v-slot:label>😋 Select one of the following options:</template>
          <template v-slot:placeholder>🎃 Select one of the following options</template>
          <!-- <template v-slot:arrow>💎</template> -->
          <!-- <template v-slot:selected="{ value, options }">🔥 Woooow, {{ value }}</template> -->
          <template v-slot:option="{ option }">{{ option.label }}</template>
        </vue-accessible-multiselect>
      </form>
      <br />
      <br />
      <output>
        <span class="tag">Value:</span>
        <code>{{ value }}</code>
      </output>
      <br />
      <label>
        <span class="tag">Disabled:</span>
        <input type="checkbox" v-model="disabled" />
      </label>
      <h2>⌨️ Keyboard navigation</h2>
      <ul>
        <li>
          <code>Down Arrow</code> Moves focus to the next option
        </li>
        <li>
          <code>Up Arrow</code> Moves focus to the previous option
        </li>
        <li>
          <code>Home</code> Moves focus to first option
        </li>
        <li>
          <code>End</code> Moves focus to last option
        </li>
        <li>
          <code>Space</code> Changes the selection state of the focused option
        </li>
        <li>
          <code>Shift + Down Arrow</code> Moves focus to and toggles the selected state of the next option
        </li>
        <li>
          <code>Shift + Up Arrow</code> Moves focus to and toggles the selected state of the previous option
        </li>
        <li>
          <code>Shift + Space</code> Selects contiguous items from the most recently selected item to the focused item
        </li>
        <li>
          <code>Control + Shift + Home</code> Selects the focused option and all options up to the first option. Moves focus to the first option.
        </li>
        <li>
          <code>Control + Shift + End</code> Selects the focused option and all options down to the last option. Moves focus to the last option
        </li>
        <li>
          <code>Control + A</code> Selects all options in the list. If all options are selected, unselects all options
        </li>
      </ul>
    </section>
  </div>
</template>

<script>
export default {
  name: 'App',
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
        {
          value: 'melon',
          label: '🍈 Melon',
        },
        {
          value: 'kiwi',
          label: '🥝 Kiwi',
        },
        {
          value: 'foo',
          label: 'Hello World',
        },
      ],
      disabled: false,
    }
  },
}
</script>

<style lang="scss">
$v-multiselect-menu-position-top: calc(100% - 1px);
@import './src/styles/core.scss';
@import './src/styles/themes/default.scss';

html {
  font-family: sans-serif;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

.v-multiselect {
  &__prepend {
    svg {
      display: inline-block;
      width: 24px;
      height: 24px;
      vertical-align: middle;
      fill: teal;
    }
  }
}

// bulma styles
code {
  padding: 0.25em 0.5em 0.25em;
  background-color: #f5f5f5;
  color: #ff3860;
  font-size: 0.875em;
}

.tag {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  padding: {
    right: 0.75em;
    left: 0.75em;
  }
  border-radius: 4px;
  background-color: #f5f5f5;
  color: #4a4a4a;
  font-size: 0.75rem;
  line-height: 1.5;
  white-space: nowrap;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.48s;
}

.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>