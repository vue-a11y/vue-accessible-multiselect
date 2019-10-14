<template lang="pug">
  .v-multiselect(:class="className")
    span.v-multiselect__label(
      v-if="hasSlot('label') || label"
      :id="labelId"
      )
      slot(name="label") {{ label }}:
    .v-multiselect__inner
      button.v-multiselect__btn(
        :id="buttonId"
        ref="button"
        :disabled="disabled"
        :aria-expanded="ariaExpanded"
        :aria-labelledby="`${labelId ? labelId : ''} ${buttonId}`"
        :class="btnClass"
        type="button"
        aria-haspopup="listbox"
        @click="toggle"
        )
        span.v-multiselect__prepend(v-if="hasSlot('prepend')")
          slot(name="prepend")
        span.v-multiselect__placeholder(v-if="isPlaceholderVisible")
          slot(
            name="placeholder"
            :placeholder="placeholder"
            ) {{ placeholder }}
        span.v-multiselect__selected(v-if="Array.isArray(value) && value.length !== 0")
          slot(
            :value="value"
            :options="options"
            name="selected"
            ) {{ selectedText }}
        span.v-multiselect__arrow
          slot(name="arrow")
            svg(viewBox="0 0 255 255")
              path(d="M0 64l128 127L255 64z")
      transition(
        :name="transition ? transition.name : ''"
        :mode="transition ? transition.mode : ''"
        )
        .v-multiselect__menu(v-if="open")
          ul.v-multiselect__list(
            v-if="Array.isArray(options) && options.length"
            ref="list"
            aria-multiselectable="true"
            :aria-activedescendant="getOptionId(options[activeDescendantIndex])"
            :aria-labelledby="labelId"
            role="listbox"
            tabindex="-1"
            style="position: relative;"
            @keydown="keyDownHandler"
            @keydown.space="$event.preventDefault()"
            @keyup="keyUpHandler"
            @keyup.up="directionHandler($event, 'up')"
            @keyup.down="directionHandler($event, 'down')"
            @keyup.esc="escapeHandler"
            @keyup.space="spaceHandler"
            @keyup.home="homeAndEndHandler"
            @keyup.end="homeAndEndHandler"
            @blur="blurHandler"
            )
            li.v-multiselect__option(
              v-for="(option, index) in options"
              :key="index"
              :id="getOptionId(option)"
              ref="options"
              role="option"
              :class="{ 'v-multiselect__option--selected': isSelected(option), 'v-multiselect__option--focus': index === activeDescendantIndex }"
              :aria-selected="isSelected(option) ? 'true': 'false'"
              @click="input(option)"
              )
              slot(
                name="option"
                :option="option"
                :value="value"
                ) {{ option.label }}
          .v-multiselect__no-options(v-else)
            slot(name="no-options")
              span No options provided
</template>

<script>
// NOTES:
// 1. I can't bind event with keyCodes: see deprecation warning https://vuejs.org/v2/guide/events.html#Key-Codes
// 2. e._keyCode is passed when running tests, beacause @vue-test-utils does not allow to pass `keyCode` https://github.com/vuejs/vue-test-utils/issues/1285
import { KEY_END, KEY_HOME, KEY_A } from 'keycode-js'

import config from '../../config'

import { ARROWS } from '../../constants/key-codes'
import { TYPE_AHEAD_TIMEOUT } from '../../constants/type-ahead'

import {
  options as optionsValidator,
  value as valueValidator,
  transition as transitionValidator,
} from '../../helpers/validators'

import { getItemsByRange } from '../../helpers'

export default {
  name: 'VueAccessibleMultiselect',
  props: {
    options: {
      type: Array,
      required: true,
      validator: optionsValidator,
    },
    value: {
      required: true,
      validator: valueValidator,
    },
    transition: {
      type: Object,
      default: () => config.transition || null,
      validator: transitionValidator,
    },
    label: String,
    placeholder: String,
    disabled: Boolean,
  },
  data() {
    const { _uid } = this

    return {
      open: false,
      timeout: null,
      printedText: '',
      localId_: _uid,
      activeDescendantIndex: -1,
    }
  },
  computed: {
    className() {
      return { 'v-multiselect--opened': this.open }
    },
    labelId() {
      return this.label || this.hasSlot('label')
        ? `v-multiselect-label-${this.localId_}`
        : null
    },
    buttonId() {
      return `v-multiselect-button-${this.localId_}`
    },
    ariaExpanded() {
      return this.open ? 'true' : false
    },
    btnClass() {
      return {
        'v-multiselect__btn--disabled': this.disabled,
      }
    },
    isPlaceholderVisible() {
      return (
        (this.placeholder ||
        this.hasSlot('placeholder')) &&
          (!this.value || (Array.isArray(this.value) && this.value.length === 0))
      )
    },
    selectedText() {
      if (Array.isArray(this.value)) {
        return this.value
          .map(value => {
            const option = this.options.find(option => option.value === value)
            return option.label ? option.label : ''
          })
          .join(', ')
      }
    },
  },
  watch: {
    open(val) {
      if (val) {
        this.$nextTick(() => {
          document.addEventListener('click', this.clickListener)

          this.$refs.list.focus()
          // if there are selected options, then set focus to the first
          if (this.value.length) {
            // if there ar options provided
            if (this.$refs.options) {
              const firstSelectedOptionIndex = this.$refs.options.findIndex(
                option =>
                  option.classList.contains('v-multiselect__option--selected')
              )

              this.activeDescendantIndex = firstSelectedOptionIndex
            }
          } else {
            // if not select to the first option
            this.activeDescendantIndex = 0
          }

          this.$emit('open')
        })
      } else {
        document.removeEventListener('click', this.clickListener)
        this.$emit('close')
      }
    },
    activeDescendantIndex() {
      this.scrollToActiveDescendant()
    },
  },
  /*
   * SSR Safe Client Side ID attribute generation
   * id's can only be generated client side, after mount.
   * this._uid is not synched between server and client.
   */
  mounted() {
    this.$nextTick(() => {
      // Update DOM with auto ID after DOM loaded to prevent
      // SSR hydration errors.
      this.localId_ = this._uid
    })
  },
  methods: {
    toggle() {
      this.open = !this.open
    },
    clickListener(e) {
      const { target } = e
      const { list, button } = this.$refs
      if ((list && list.contains(target)) || button.contains(target)) {
      } else {
        this.open = false
      }
    },
    isSelected(option) {
      if (Array.isArray(this.value)) {
        return this.value.includes(option.value)
      } else {
        return false
      }
    },
    input(option) {
      let value = this.value

      if (!Array.isArray(value)) value = []

      const { value: optionValue } = option

      if (value.includes(optionValue)) {
        value.splice(value.indexOf(optionValue), 1)
      } else {
        value.push(optionValue)
      }

      this.$emit('input', value)
    },
    directionHandler(e, direction) {
      const { activeDescendantIndex } = this

      switch (direction) {
        case 'up':
          if (this.activeDescendantIndex !== 0) {
            this.activeDescendantIndex--
          }
          break
        case 'down':
          if (this.activeDescendantIndex !== this.options.length - 1) {
            this.activeDescendantIndex++
          }
          break
      }

      if (e.shiftKey && activeDescendantIndex !== this.activeDescendantIndex) {
        this.input(this.options[this.activeDescendantIndex])
      }
    },
    getOptionId(option) {
      return `v-multiselect-option-${this.options.indexOf(option)}_${
        this.localId_
      }`
    },
    escapeHandler() {
      this.open = false
      this.$refs.button.focus()
    },
    printHandler(e) {
      const keyCode = e.keyCode || e._keyCode

      this.printedText += String.fromCharCode(keyCode)

      this.selectByText(this.printedText)

      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.printedText = ''
      }, TYPE_AHEAD_TIMEOUT)
    },
    selectByText(text) {
      for (const index of this.options.keys()) {
        if (this.options[index].label.toUpperCase().startsWith(text)) {
          this.activeDescendantIndex = index
          return
        }
      }
    },
    /**
     * prevents default scrolling
     */
    keyDownHandler(e) {
      const keyCode = e.keyCode || e._keyCode

      if (ARROWS.indexOf(keyCode) !== -1) {
        e.preventDefault()
      }
    },
    /* istanbul ignore next */
    scrollToActiveDescendant() {
      // get current option DOM node
      const { options } = this.$refs

      if (options) {
        const currentOption = options[this.activeDescendantIndex]

        if (currentOption) {
          const { offsetTop, clientHeight } = currentOption

          const { list } = this.$refs

          const currentVisibleArea = list.scrollTop + list.clientHeight

          if (offsetTop < list.scrollTop) {
            list.scrollTop = offsetTop
          } else if (offsetTop + clientHeight > currentVisibleArea) {
            list.scrollTop = offsetTop - list.clientHeight + clientHeight
          }
        }
      }
    },
    spaceHandler(event) {
      // if shift is pressed then select all options contiguous options
      // from the most recently selected item to the focused item

      if (event.shiftKey) {
        const lastSelectedOptionIndex = this.getLastSelectedOptionIndex()

        if (lastSelectedOptionIndex !== -1) {
          // get items between current focused item and last selected item
          let options = getItemsByRange(
            this.options,
            lastSelectedOptionIndex,
            this.activeDescendantIndex
          )

          // exclude currently selected option
          if (options.length !== 1) {
            if (lastSelectedOptionIndex > this.activeDescendantIndex) {
              options.pop()
            } else {
              options.shift()
            }
          }
          // get only values and then filter that already selected
          options = options
            .map(option => option.value)
            .filter(option => !this.value.includes(option))

          this.$emit('input', this.value.concat(options))
        } else {
          this.input(this.options[this.activeDescendantIndex])
        }
      } else {
        this.input(this.options[this.activeDescendantIndex])
      }
    },
    selectAllToEdge(edge) {
      const array = this.value.splice(0)

      const { options } = this

      switch (edge) {
        case 'start':
          for (let i = this.activeDescendantIndex; i >= 0; i--) {
            const { value } = options[i]

            if (!array.includes(value)) {
              array.push(this.options[i].value)
            }
          }
          this.activeDescendantIndex = 0
          break
        case 'end':
          for (
            let i = this.activeDescendantIndex;
            i <= options.length - 1;
            i++
          ) {
            const { value } = options[i]

            if (!array.includes(value)) {
              array.push(this.options[i].value)
            }
          }
          this.activeDescendantIndex = this.options.length - 1
          break
      }

      this.$emit('input', array)
    },
    toggleAll() {
      if (this.isAllSelected()) {
        this.unselectAll()
      } else {
        this.selectAll()
      }
    },
    isAllSelected() {
      // if array of selected options has the same length that options
      // then all options are selected
      return this.value.length === this.options.length
    },
    selectAll() {
      const { options } = this
      const value = options.map(value => value.value)
      this.$emit('input', value)
    },
    unselectAll() {
      this.$emit('input', [])
    },
    getLastSelectedOption() {
      // if no options is selected return undefined
      if (this.value.length === 0) return
      const lastSelectedValue = this.value[this.value.length - 1]
      return this.options.find(option => option.value === lastSelectedValue)
    },
    getLastSelectedOptionIndex() {
      return this.options.indexOf(this.getLastSelectedOption())
    },
    homeAndEndHandler(e) {
      if (e.shiftKey) return

      switch (e.keyCode) {
        case KEY_END:
          // set focus to the last item
          this.activeDescendantIndex = this.options.length - 1
          break
        case KEY_HOME:
          // set focus to the first item
          this.activeDescendantIndex = 0
          break
      }
    },
    blurHandler(e) {
      // if next focus target not equals to the button element
      // then close the list
      if (e.relatedTarget !== this.$refs.button) {
        this.open = false
      }
    },
    hasSlot(name) {
      return Boolean(this.$slots[name]) || Boolean(this.$scopedSlots[name])
    },
    keyUpHandler(e) {
      const keyCode = e.keyCode || e._keyCode

      if (e.ctrlKey && keyCode === KEY_A) {
        this.toggleAll()
        return
      }

      if (e.ctrlKey && e.shiftKey) {
        if (keyCode === KEY_END) {
          this.selectAllToEdge('end')
          return
        }

        if (keyCode === KEY_HOME) {
          this.selectAllToEdge('start')
          return
        }
      }

      this.printHandler(e)
    },
  },
}
</script>