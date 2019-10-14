import { shallowMount } from '@vue/test-utils'

import { KEY_A, KEY_END, KEY_HOME, KEY_R, KEY_C, KEY_T } from 'keycode-js'

import { ARROWS } from '../src/constants/key-codes'
import { TYPE_AHEAD_TIMEOUT } from '../src/constants/type-ahead'

import VueAccessibleMultiselect from '../src/components/VueAccessibleMultiselect/VueAccessibleMultiselect.vue'

import FIXTURES_OPTIONS from './fixtures/options'
import FIXTURES_VALUE from './fixtures/value'

import { open as openMenu, getAllTypes } from './helpers'

beforeEach(() => {
  console.error = jest.fn()
  // TODO: refactor line below
  jest.setTimeout(TYPE_AHEAD_TIMEOUT * 2)
})

const classes = {
  label: '.v-multiselect__label',
  button: '.v-multiselect__btn',
  prepend: '.v-multiselect__prepend',
  placeholder: '.v-multiselect__placeholder',
  selected: '.v-multiselect__selected',
  list: '.v-multiselect__list',
  option: '.v-multiselect__option',
  'option--selected': '.v-multiselect__option--selected',
  arrow: '.v-multiselect__arrow',
  'no-options': '.v-multiselect__no-options',
}

async function factory(options = {}, open = true) {
  const defaultOptions = {
    propsData: {
      value: FIXTURES_VALUE(),
      options: FIXTURES_OPTIONS,
    },
  }

  const wrapper = shallowMount(
    VueAccessibleMultiselect,
    Object.assign({}, defaultOptions, options)
  )

  if (open) {
    await openMenu(wrapper)
  }

  return wrapper
}

describe('VueAccessibleMultiselect', () => {
  describe('props', () => {
    describe('options', () => {
      const validPropTypes = [Array]

      it('should call `console.error` if invalid value is passed', () => {
        const error = jest.spyOn(global.console, 'error')

        const types = getAllTypes({ except: validPropTypes })

        types.forEach(type => {
          shallowMount(VueAccessibleMultiselect, {
            propsData: { value: [], options: type },
          })
        })

        expect(error).toHaveBeenCalledTimes(types.length)
      })

      it('should not call `console.error` if valid value is passed', () => {
        const error = jest.spyOn(global.console, 'error')

        const types = getAllTypes({ only: validPropTypes })

        types.forEach(type => {
          shallowMount(VueAccessibleMultiselect, {
            propsData: { value: [], options: type },
          })
        })

        expect(error).not.toHaveBeenCalled()
      })
    })

    describe('value', () => {
      const validPropTypes = [Array, undefined, null]

      it('should call `console.error` if value with invalid type is passed', () => {
        const error = jest.spyOn(global.console, 'error')

        const types = getAllTypes({ except: validPropTypes })

        types.forEach(type => {
          shallowMount(VueAccessibleMultiselect, {
            propsData: { value: type, options: [] },
          })
        })

        expect(error).toHaveBeenCalledTimes(types.length)
      })

      it('should not call `console.error` if value with valid type is passed', () => {
        const error = jest.spyOn(global.console, 'error')

        const types = getAllTypes({ only: validPropTypes })

        types.forEach(type => {
          shallowMount(VueAccessibleMultiselect, {
            propsData: { value: type, options: FIXTURES_OPTIONS },
          })
        })

        expect(error).not.toHaveBeenCalled()
      })
    })

    describe('transition', () => {
      it('should call `console.error` if value with invalid type is passed', () => {
        const error = jest.spyOn(global.console, 'error')
        const types = getAllTypes({ except: [undefined, null] })
        types.push({ foo: 'bar' })

        types.forEach(type => {
          shallowMount(VueAccessibleMultiselect, {
            propsData: {
              value: FIXTURES_VALUE(),
              options: FIXTURES_OPTIONS,
              transition: type,
            },
          })
        })

        expect(error).toHaveBeenCalledTimes(types.length)
      })

      it('should not call `console.error` if valid value is passed', () => {
        const error = jest.spyOn(global.console, 'error')

        shallowMount(VueAccessibleMultiselect, {
          propsData: {
            value: FIXTURES_VALUE(),
            options: FIXTURES_OPTIONS,
            transition: { name: 'foo' },
          },
        })

        expect(error).not.toHaveBeenCalled()
      })
    })

    describe('disabled', () => {
      const validPropTypes = [Boolean, undefined, null]

      it('should not call `console.error` if value with valid type is passed', () => {
        const error = jest.spyOn(global.console, 'error')

        const types = getAllTypes({ only: validPropTypes })

        types.forEach(type => {
          shallowMount(VueAccessibleMultiselect, {
            propsData: {
              value: FIXTURES_VALUE(),
              options: FIXTURES_OPTIONS,
              disabled: type,
            },
          })
        })

        expect(error).not.toHaveBeenCalled()
      })

      it('should call `console.error` if value with invalid type is passed', () => {
        const error = jest.spyOn(global.console, 'error')
        const types = getAllTypes({ except: validPropTypes })

        types.forEach(type => {
          shallowMount(VueAccessibleMultiselect, {
            propsData: {
              value: FIXTURES_VALUE(),
              options: FIXTURES_OPTIONS,
              disabled: type,
            },
          })
        })

        expect(error).toHaveBeenCalledTimes(types.length)
      })
    })
  })

  describe('label', () => {
    it('should render with value passed via props', () => {
      const label = 'foo'

      const wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { label },
      })

      expect(wrapper.find(classes.label).text()).toBe(`${label}:`)
    })

    it('should have unique id', () => {
      const label = 'foo'

      const wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { label },
      })

      expect(wrapper.find(classes.label).element.id).toBe(
        `v-multiselect-label-${wrapper.vm._uid}`
      )
    })

    it("should render it's slot", () => {
      const label = '<span>foo</span>'

      const wrapper = shallowMount(VueAccessibleMultiselect, {
        slots: {
          label,
        },
      })

      expect(wrapper.find(classes.label).element.innerHTML).toBe(label)
    })

    it('should not render if value or slot are not passed', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)
      expect(wrapper.find(classes.label).exists()).toBe(false)
    })

    const validPropTypes = [String, undefined, null]

    it('should not call `console.error` if value with valid type is passed', () => {
      const error = jest.spyOn(global.console, 'error')

      const types = getAllTypes({ only: validPropTypes })

      types.forEach(type => {
        shallowMount(VueAccessibleMultiselect, {
          propsData: {
            value: FIXTURES_VALUE(),
            options: FIXTURES_OPTIONS,
            label: type,
          },
        })
      })

      expect(error).not.toHaveBeenCalled()
    })

    it('should call `console.error` if value with invalid type is passed', () => {
      const error = jest.spyOn(global.console, 'error')
      const types = getAllTypes({ except: validPropTypes })

      types.forEach(type => {
        shallowMount(VueAccessibleMultiselect, {
          propsData: {
            value: FIXTURES_VALUE(),
            options: FIXTURES_OPTIONS,
            label: type,
          },
        })
      })

      expect(error).toHaveBeenCalledTimes(types.length)
    })
  })

  describe('button', () => {
    it('should have unique id', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)

      expect(wrapper.find(classes.button).element.id).toBe(
        `v-multiselect-button-${wrapper.vm._uid}`
      )
    })

    it('should have `disabled` attribute when `disabled` prop is passed', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { disabled: true },
      })

      expect(wrapper.find(classes.button).element.disabled).toBe(true)
    })

    it('should not have `disabled` attribute when `disabled` prop is not passed', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)

      expect(wrapper.find(classes.button).element.disabled).toBe(false)
    })

    it('should have appropriate class when `disabled` prop is passed', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { disabled: true },
      })

      expect(
        wrapper
          .find(classes.button)
          .element.classList.contains('v-multiselect__btn--disabled')
      ).toBe(true)
    })

    it('should not have `aria-expanded` attribute when menu is closed', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)

      expect(
        wrapper.find(classes.button).element.getAttribute('aria-expanded')
      ).toBe(null)
    })

    it('should have `aria-expanded` attribute with `true` value when menu is open', async () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)

      await openMenu(wrapper)

      expect(
        wrapper.find(classes.button).element.getAttribute('aria-expanded')
      ).toBe('true')
    })

    it('should have `aria-haspopup` attribute with `listbox` value', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)

      expect(
        wrapper.find(classes.button).element.getAttribute('aria-haspopup')
      ).toBe('listbox')
    })

    it('should have `type` attribute with `button` value', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)

      expect(wrapper.find(classes.button).element.getAttribute('type')).toBe(
        'button'
      )
    })

    it('should have appropriate `aria-labelledby` attribute with correct value', () => {
      let wrapper = shallowMount(VueAccessibleMultiselect)

      expect(
        wrapper.find(classes.button).element.getAttribute('aria-labelledby')
      ).toBe(` v-multiselect-button-${wrapper.vm._uid}`)

      const label = 'foo'
      wrapper = shallowMount(VueAccessibleMultiselect, { propsData: { label } })

      expect(
        wrapper.find(classes.button).element.getAttribute('aria-labelledby')
      ).toBe(
        `v-multiselect-label-${wrapper.vm._uid} v-multiselect-button-${wrapper.vm._uid}`
      )

      wrapper = shallowMount(VueAccessibleMultiselect, { slots: { label } })

      expect(
        wrapper.find(classes.button).element.getAttribute('aria-labelledby')
      ).toBe(
        `v-multiselect-label-${wrapper.vm._uid} v-multiselect-button-${wrapper.vm._uid}`
      )
    })

    it('should toggle `open` data property state when clicked', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)

      wrapper.find(classes.button).trigger('click')
      expect(wrapper.vm.open).toBe(true)

      wrapper.find(classes.button).trigger('click')
      expect(wrapper.vm.open).toBe(false)
    })
  })

  describe('prepend slot', () => {
    it('should render', () => {
      const prepend = '<span>foo</span>'
      const wrapper = shallowMount(VueAccessibleMultiselect, {
        slots: {
          prepend,
        },
      })
      expect(wrapper.find(classes.prepend).element.innerHTML).toBe(prepend)
    })

    it('should not render when it is not passed', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)
      expect(wrapper.find(classes.prepend).exists()).toBe(false)
    })
  })

  describe('placeholder', () => {
    it("should not render when `value` prop is truthy or `values` is type of `Array` and it's `length` is greater `0`", () => {
      const wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { value: true },
      })

      expect(wrapper.find(classes.placeholder).exists()).toBe(false)

      wrapper.setProps({ value: [] })

      expect(wrapper.find(classes.placeholder).exists()).toBe(false)
    })

    describe('props', () => {
      it('should render with passed value', () => {
        const placeholder = 'foo'

        const wrapper = shallowMount(VueAccessibleMultiselect, {
          propsData: { placeholder },
        })
        expect(wrapper.find(classes.placeholder).text()).toBe(placeholder)
      })

      it('should not render if value is not passed', () => {
        const wrapper = shallowMount(VueAccessibleMultiselect)
        expect(wrapper.find(classes.placeholder).exists()).toBe(false)
      })

      const validPropTypes = [String, undefined, null]

      it('should not call `console.error` if value with valid type is passed', () => {
        const error = jest.spyOn(global.console, 'error')
        const types = getAllTypes({ only: validPropTypes })

        types.forEach(type => {
          shallowMount(VueAccessibleMultiselect, {
            propsData: {
              value: FIXTURES_VALUE(),
              options: FIXTURES_OPTIONS,
              placeholder: type,
            },
          })
        })

        expect(error).not.toHaveBeenCalled()
      })

      it('should call `console.error` if value with invalid type is passed', () => {
        const error = jest.spyOn(global.console, 'error')
        const types = getAllTypes({ except: validPropTypes })

        types.forEach(type => {
          shallowMount(VueAccessibleMultiselect, {
            propsData: {
              value: FIXTURES_VALUE(),
              options: FIXTURES_OPTIONS,
              placeholder: type,
            },
          })
        })

        expect(error).toHaveBeenCalledTimes(types.length)
      })
    })

    describe('slot', () => {
      it('should render', () => {
        const placeholder = '<span>foo</span>'

        const wrapper = shallowMount(VueAccessibleMultiselect, {
          slots: {
            placeholder,
          },
        })

        expect(wrapper.find(classes.placeholder).element.innerHTML).toBe(
          placeholder
        )
      })

      it('should correctly expose scopedSlots data', () => {
        const placeholderSlot =
          '<span slot-scope="foo">{{ foo.placeholder }}</span>'
        const placeholderValue = 'foo'

        const wrapper = shallowMount(VueAccessibleMultiselect, {
          propsData: {
            placeholder: placeholderValue,
          },
          scopedSlots: {
            placeholder: placeholderSlot,
          },
        })

        expect(wrapper.find(classes.placeholder).element.innerHTML).toBe(
          `<span>${placeholderValue}</span>`
        )
      })

      it('should not render if it is not passed', () => {
        const wrapper = shallowMount(VueAccessibleMultiselect)
        expect(wrapper.find(classes.placeholder).exists()).toBe(false)
      })
    })
  })

  describe('selected', () => {
    it("should render appropriate text when `value` with type of `Array` is passed and it's `length` is not equals to `0`", async () => {
      const wrapper = await factory()

      const text = FIXTURES_OPTIONS.map(option => option.label).join(', ')

      expect(wrapper.find(classes.selected).text()).toBe(text)
    })

    it("should not render when `value` with invalid type is passed and it's `length` is equals to `0`", () => {
      const types = getAllTypes()

      types.forEach(type => {
        const wrapper = shallowMount(VueAccessibleMultiselect, {
          propsData: { value: type, options: FIXTURES_OPTIONS },
        })
        expect(wrapper.find(classes.selected).exists()).toBe(false)
      })
    })

    describe('slot', () => {
      it('should render when it is passed', async () => {
        const selected = '<span>foo</span>'

        const wrapper = await factory({
          slots: {
            selected,
          },
        })

        expect(wrapper.find(classes.selected).element.innerHTML).toBe(selected)
      })

      it('should correctly expose `scopedSlots` props', async () => {
        const selected =
          '<span slot-scope="foo">{{ foo.value.length }} {{ foo.options.length }}</span>'

        const wrapper = await factory({
          scopedSlots: {
            selected,
          },
        })

        expect(wrapper.find(classes.selected).element.innerHTML).toBe(
          `<span>${FIXTURES_VALUE().length} ${FIXTURES_OPTIONS.length}</span>`
        )
      })
    })
  })

  describe('arrow', () => {
    describe('slot', () => {
      it('should render when it is passed', () => {
        const arrow = '<span>foo</span>'
        const wrapper = shallowMount(VueAccessibleMultiselect, {
          slots: {
            arrow,
          },
        })

        expect(wrapper.find(classes.arrow).element.innerHTML).toBe(arrow)
      })

      it('should render with default slot content', () => {
        const wrapper = shallowMount(VueAccessibleMultiselect)
        expect(wrapper.find(classes.arrow).exists()).toBe(true)
      })
    })
  })

  describe('list', () => {
    it('should not render if `options` is falsy or `options` type is not `Array` or `options.length === 0` and render if previous options are respected', async () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)

      await openMenu(wrapper)

      expect(wrapper.find(classes.list).exists()).toBe(false)

      wrapper.setProps({ options: {} })

      expect(wrapper.find(classes.list).exists()).toBe(false)

      wrapper.setProps({ options: [] })

      expect(wrapper.find(classes.list).exists()).toBe(false)

      wrapper.setProps({ options: [{ value: 0, label: 'foo' }] })

      expect(wrapper.find(classes.list).exists()).toBe(true)
    })

    it('should have `aria-multiselectable` attribute with `true` value', async () => {
      const wrapper = await factory()

      expect(
        wrapper.find(classes.list).element.getAttribute('aria-multiselectable')
      ).toBe('true')
    })

    it('should set `open` to `false` on blur event, if `e.relatedTarget` not equals to the button', async () => {
      const wrapper = await factory()

      wrapper.find(classes.list).trigger('blur')

      expect(wrapper.vm.open).toBe(false)

      wrapper.setData({ open: true })

      wrapper.find(classes.button).element.focus()

      expect(wrapper.find(classes.button).element).toBe(document.activeElement)
      expect(wrapper.vm.open).toBe(true)
    })

    it('should have correct `aria-activedescendant` attribute', async () => {
      const wrapper = await factory()

      const list = wrapper.find(classes.list).element

      let index = 0

      wrapper.setData({ activeDescendantIndex: index })

      expect(list.getAttribute('aria-activedescendant')).toBe(
        `v-multiselect-option-${index}_${wrapper.vm._uid}`
      )

      index++

      wrapper.setData({ activeDescendantIndex: index })

      expect(list.getAttribute('aria-activedescendant')).toBe(
        `v-multiselect-option-${index}_${wrapper.vm._uid}`
      )
    })

    it('should have `aria-labelledby` attribute which equals to `labelId`', async () => {
      const wrapper = await factory()

      expect(
        wrapper.find(classes.list).element.getAttribute('aria-labelledby')
      ).toBe(wrapper.vm.labelId)
    })

    it('should have `role` attribute with `listbox` value', async () => {
      const wrapper = await factory()
      expect(wrapper.find(classes.list).element.getAttribute('role')).toBe(
        'listbox'
      )
    })

    it('should have `tabindex` attribute with `-1` value', async () => {
      const wrapper = await factory()
      expect(wrapper.find(classes.list).element.getAttribute('tabindex')).toBe(
        '-1'
      )
    })

    it('should have `position: relative;` style', async () => {
      const wrapper = await factory()
      expect(wrapper.find(classes.list).element.style.position).toBe('relative')
    })
  })

  describe('option', () => {
    it('should have unique id', async () => {
      const wrapper = await factory()

      wrapper.findAll(classes.option).wrappers.forEach((option, index) => {
        expect(option.element.id).toBe(
          `v-multiselect-option-${index}_${wrapper.vm._uid}`
        )
      })
    })

    it('should have attribute `role` with value `option`', async () => {
      const wrapper = await factory()

      wrapper.findAll(classes.option).wrappers.forEach(option => {
        expect(option.element.getAttribute('role')).toBe('option')
      })
    })

    it('should have attribute `aria-selected` with value `true` if `option.value` is in `value` and `false` if not', async () => {
      const wrapper = await factory()

      wrapper.setData({ value: FIXTURES_VALUE(1) })

      const options = wrapper.findAll(classes.option).wrappers

      expect(options[0].element.getAttribute('aria-selected')).toBe('true')
      expect(options[1].element.getAttribute('aria-selected')).toBe('false')
    })

    it('should emit `input` event with/without `option.value` when option is clicked', async () => {
      const wrapper = await factory()

      wrapper.find(classes.option).trigger('click')

      // option was selected so expect value without this option
      const value = FIXTURES_VALUE().slice(1)
      expect(wrapper.emitted('input')[0]).toEqual([value])

      // emit v-model
      wrapper.setData({ value })

      wrapper.find(classes.option).trigger('click')

      // option was not selected so expect value with this option
      value.push(FIXTURES_VALUE()[0])
      expect(wrapper.emitted('input')[1]).toEqual([value])
    })

    it("should have appropriate class when selected and should not when isn't selected", async () => {
      const wrapper = await factory()
      const className = 'v-multiselect__option--selected'

      wrapper.setData({ value: FIXTURES_VALUE(1) })

      const options = wrapper.findAll(classes.option).wrappers

      options.forEach((option, index) => {
        const { classList } = option.element
        if (index === 0) {
          expect(classList.contains(className)).toBe(true)
        } else {
          expect(classList.contains(className)).toBe(false)
        }
      })
    })

    it("should have appropriate class when option index equals to `activeDescendantIndex` and should not when doen't", async () => {
      const wrapper = await factory()
      const className = 'v-multiselect__option--focus'
      const activeDescendantIndex = 0

      wrapper.setData({ activeDescendantIndex })

      const options = wrapper.findAll(classes.option).wrappers

      options.forEach((option, index) => {
        const { classList } = option.element
        if (index === activeDescendantIndex) {
          expect(classList.contains(className)).toBe(true)
        } else {
          expect(classList.contains(className)).toBe(false)
        }
      })
    })

    it('should correctly expose `scopedSlots` props', async () => {
      const option =
        '<span slot-scope="foo">{{ foo.value.length }} {{ foo.option.label }}</span>'

      const wrapper = await factory({
        scopedSlots: {
          option,
        },
      })

      const options = wrapper.findAll(classes.option).wrappers

      options.forEach((option, index) => {
        expect(option.element.innerHTML).toBe(
          `<span>${wrapper.vm.value.length} ${FIXTURES_OPTIONS[index].label}</span>`
        )
      })
    })
  })

  describe('no-options', () => {
    it('should not render if `options` is type of `Array` and `options.length !== 0`', async () => {
      const wrapper = await factory()
      expect(wrapper.find(classes['no-options']).exists()).toBe(false)
    })

    it('should render if `options` is not type of `Array` or `options.length == 0`', async () => {
      const types = getAllTypes({ except: [Array] })
      types.push([])

      types.forEach(async type => {
        const wrapper = await factory({
          propsData: { value: [], options: type },
        })
        expect(wrapper.find(classes['no-options']).exists()).toBe(true)
      })
    })

    describe('slot', () => {
      it('should render with passed value', async () => {
        const slot = '<span>foo</span>'
        const wrapper = shallowMount(VueAccessibleMultiselect, {
          slots: { 'no-options': slot },
        })
        await openMenu(wrapper)
        expect(wrapper.find(classes['no-options']).element.innerHTML).toBe(slot)
      })
    })
  })

  describe('keyboard navigation', () => {
    it('should set `activeDescendantIndex` to the last option index when `END` key is pressed', async () => {
      const wrapper = await factory()

      wrapper.find(classes.list).trigger('keyup.end')

      expect(wrapper.vm.activeDescendantIndex).toBe(
        wrapper.vm.options.length - 1
      )
    })

    it('should set `activeDescendantIndex` to `0` when `END` key is pressed', async () => {
      const wrapper = await factory()

      wrapper.find(classes.list).trigger('keyup.home')

      expect(wrapper.vm.activeDescendantIndex).toBe(0)
    })

    it('should emit `input` event with empty array when `Control + A` keys is clicked and all options is selected', async () => {
      const wrapper = await factory()

      wrapper.find(classes.list).trigger('keyup', {
        _keyCode: KEY_A,
        ctrlKey: true,
      })

      // all options were selected, so empty array is expected
      expect(wrapper.emitted('input')[0]).toEqual([[]])
    })

    it('should emit `input` event with array which contains all options when `Control + A` keys is clicked and one or none options is selected', async () => {
      let wrapper = await factory({
        propsData: { value: FIXTURES_VALUE(1), options: FIXTURES_OPTIONS },
      })

      const event = 'keyup'
      const options = {
        _keyCode: KEY_A,
        ctrlKey: true,
      }

      wrapper.find(classes.list).trigger(event, options)

      expect(wrapper.emitted('input')[0]).toEqual([FIXTURES_VALUE()])

      wrapper = await factory({
        propsData: { value: [], options: FIXTURES_OPTIONS },
      })

      wrapper.find(classes.list).trigger(event, options)

      expect(wrapper.emitted('input')[0]).toEqual([FIXTURES_VALUE()])
    })

    it('should set `open` to `false` when `ESC` key is pressed', async () => {
      const wrapper = await factory()

      wrapper.find(classes.list).trigger('keyup.esc')

      expect(wrapper.vm.open).toBe(false)
    })

    it('should increment `activeDescendantIndex` when `Down Arrow` key is pressed, but should not increment when `activeDescendantIndex === options.length - 1`', async () => {
      const wrapper = await factory()
      const list = wrapper.find(classes.list)
      const { options } = wrapper.vm

      // penult
      wrapper.setData({ activeDescendantIndex: options.length - 2 })

      list.trigger('keyup.down')

      expect(wrapper.vm.activeDescendantIndex).toEqual(
        wrapper.vm.options.length - 1
      )

      list.trigger('keyup.down')

      // cannot be greater then `options` lasts index
      expect(wrapper.vm.activeDescendantIndex).toEqual(
        wrapper.vm.options.length - 1
      )
    })

    it('should increment `activeDescendantIndex` and emit `input` event with/without option with `activeDescendantIndex` when `Down Arrow + Shift` key is pressed and should not do this when `activeDescendantIndex` is equals to `options.length - 1`', async () => {
      const wrapper = await factory()
      const list = wrapper.find(classes.list)
      let value

      wrapper.setData({ activeDescendantIndex: 1 })

      list.trigger('keyup.down', {
        shiftKey: true,
      })

      // without third option because it was selected
      value = [...FIXTURES_VALUE()]
      const spliced = value.splice(2, 1)

      expect(wrapper.emitted('input')[0]).toEqual([value])
      expect(wrapper.vm.activeDescendantIndex).toBe(2)

      // emit v-model
      wrapper.setData({ value })
      wrapper.setData({ activeDescendantIndex: 1 })

      list.trigger('keyup.down', {
        shiftKey: true,
      })

      // now it was not selected so we expect it to be emitted
      value.splice(2, 0, spliced)

      expect(wrapper.emitted('input')[1]).toEqual([value])
      expect(wrapper.vm.activeDescendantIndex).toBe(2)

      wrapper.setData({ activeDescendantIndex: FIXTURES_OPTIONS.length - 1 })

      list.trigger('keyup.down', {
        shiftKey: true,
      })

      expect(wrapper.emitted('input').length).toBe(2)
    })

    it('should decrement `activeDescendantIndex` when `Up Arrow` key is pressed, but should not decrement when `activeDescendantIndex === 0`', async () => {
      const wrapper = await factory()
      const list = wrapper.find(classes.list)

      wrapper.setData({ activeDescendantIndex: 1 })

      list.trigger('keyup.up')

      expect(wrapper.vm.activeDescendantIndex).toEqual(0)

      list.trigger('keyup.up')

      expect(wrapper.vm.activeDescendantIndex).toEqual(0)
    })

    it('should decrement `activeDescendantIndex` and emit `input` event with/without option with `activeDescendantIndex` when `Up Arrow + Shift` key is pressed should not do this when `activeDescendantIndex` is equals to `0`)', async () => {
      const wrapper = await factory()
      const list = wrapper.find(classes.list)
      let value

      wrapper.setData({ activeDescendantIndex: 1 })

      list.trigger('keyup.up', {
        shiftKey: true,
      })

      // without first option because it was selected
      expect(wrapper.emitted('input')[0]).toEqual([FIXTURES_VALUE().slice(1)])
      expect(wrapper.vm.activeDescendantIndex).toBe(0)

      // emit v-model
      wrapper.setData({ value: FIXTURES_VALUE().slice(1) })
      wrapper.setData({ activeDescendantIndex: 1 })

      list.trigger('keyup.up', {
        shiftKey: true,
      })

      // now it was not selected so we expect it to be emitted
      value = FIXTURES_VALUE().slice(1)
      value.push(FIXTURES_VALUE()[0])

      expect(wrapper.emitted('input')[1]).toEqual([value])
      expect(wrapper.vm.activeDescendantIndex).toBe(0)

      wrapper.setData({ activeDescendantIndex: 0 })

      list.trigger('keyup.up', {
        shiftKey: true,
      })

      expect(wrapper.emitted('input').length).toBe(2)
    })

    it(`should call \`preventDefault\` on \`keydown\` event for the following keyCodes: ${ARROWS.join(
      ', '
    )}`, async () => {
      const wrapper = await factory()

      const preventDefault = jest.fn()

      const list = wrapper.find(classes.list)

      ARROWS.forEach(arrow => {
        list.trigger('keydown', {
          _keyCode: arrow,
          preventDefault,
        })
      })

      expect(preventDefault).toHaveBeenCalledTimes(ARROWS.length)
    })

    it('should emit `input` event without option with index equals to `activeDescendantIndex` if option is selected and when `SPACE` key is pressed', async () => {
      const wrapper = await factory()
      const event = 'keyup.space'

      const list = wrapper.find(classes.list)

      list.trigger(event)
      // without first option
      expect(wrapper.emitted('input')[0]).toEqual([FIXTURES_VALUE().slice(1)])

      wrapper.setData({
        activeDescendantIndex: wrapper.vm.activeDescendantIndex + 1,
      })

      list.trigger(event)
      // without first and second option
      expect(wrapper.emitted('input')[1]).toEqual([FIXTURES_VALUE().slice(2)])
    })

    it('should emit `input` event with option with index equals to `activeDescendantIndex` if option is not selected and when `SPACE` key is pressed', async () => {
      const options = [{ value: 1, label: 'foo' }, { value: 2, option: 'bar' }]

      const wrapper = await factory({
        propsData: {
          value: [],
          options,
        },
      })

      const event = 'keyup.space'

      const list = wrapper.find(classes.list)

      const value = [options[0].value]

      list.trigger(event)
      // with first option
      expect(wrapper.emitted('input')[0]).toEqual([value])

      wrapper.setData({
        activeDescendantIndex: wrapper.vm.activeDescendantIndex + 1,
      })

      value.push(options[1].value)

      list.trigger(event)
      // with first and second option
      expect(wrapper.emitted('input')[1]).toEqual([value])
    })

    it('should emit `input` event with option with index equals to `activeDescendantIndex` and all options down to the last option, and also set `activeDescendantIndex` to the last `options` index when `Ctrl + Shift + END` is pressed', async () => {
      const wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { value: [], options: FIXTURES_OPTIONS },
      })

      await openMenu(wrapper)

      wrapper.find(classes.list).trigger('keyup', {
        ctrlKey: true,
        shiftKey: true,
        _keyCode: KEY_END,
      })

      const values = FIXTURES_VALUE()

      expect(wrapper.emitted('input')[0]).toEqual([values])
      expect(wrapper.vm.activeDescendantIndex).toBe(FIXTURES_OPTIONS.length - 1)
    })

    it('should emit `input` event with option with index equals to `activeDescendantIndex` and all options up to the first option, and also set `activeDescendantIndex` to the last `options` index when `Ctrl + Shift + HOME` is pressed', async () => {
      const wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { value: [], options: FIXTURES_OPTIONS },
      })

      await openMenu(wrapper)

      wrapper.setData({ activeDescendantIndex: FIXTURES_OPTIONS.length - 1 })

      wrapper.find(classes.list).trigger('keyup', {
        ctrlKey: true,
        shiftKey: true,
        _keyCode: KEY_HOME,
      })

      const values = FIXTURES_VALUE()

      expect(wrapper.emitted('input')[0]).toEqual([values.reverse()])
      expect(wrapper.vm.activeDescendantIndex).toBe(0)
    })

    describe('type-ahead', () => {
      it('should set `activeDescendantIndex` to the index of item with a `label` that starts with the string of characters typed', async () => {
        const wrapper = await factory()

        const list = wrapper.find(classes.list)

        list.trigger('keyup', { _keyCode: KEY_R })
        jest.setTimeout(TYPE_AHEAD_TIMEOUT - 100)
        list.trigger('keyup', { _keyCode: KEY_A })
        jest.setTimeout(TYPE_AHEAD_TIMEOUT - 200)
        list.trigger('keyup', { _keyCode: KEY_C })
        jest.setTimeout(TYPE_AHEAD_TIMEOUT - 300)
        list.trigger('keyup', { _keyCode: KEY_T })

        expect(wrapper.vm.activeDescendantIndex).toBe(
          FIXTURES_OPTIONS.findIndex(option =>
            option.label.toUpperCase().startsWith('React'.toUpperCase())
          )
        )
      })

      it(`should reset \`printedText\` after ${TYPE_AHEAD_TIMEOUT}ms if no \`keyup\` event is triggered`, async done => {
        const wrapper = await factory()

        const list = wrapper.find(classes.list)

        list.trigger('keyup', { _keyCode: KEY_R })

        expect(wrapper.vm.printedText).toBe('R')

        setTimeout(() => {
          expect(wrapper.vm.printedText).toBe('')
          done()
        }, TYPE_AHEAD_TIMEOUT)
      })
    })

    it('should emit `input` event with options values from the most recently selected option to the `option` with index equals to `activeDescendantIndex`', async () => {
      let wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { value: FIXTURES_VALUE(1), options: FIXTURES_OPTIONS },
      })

      await openMenu(wrapper)

      wrapper.setData({ activeDescendantIndex: FIXTURES_OPTIONS.length - 1 })

      wrapper.find(classes.list).trigger('keyup.space', {
        shiftKey: 'true',
      })

      expect(wrapper.emitted('input')[0]).toEqual([FIXTURES_VALUE()])

      let value = [FIXTURES_OPTIONS[FIXTURES_OPTIONS.length - 1].value]

      wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { value, options: FIXTURES_OPTIONS },
      })

      await openMenu(wrapper)

      wrapper.setData({ activeDescendantIndex: 0 })

      wrapper.find(classes.list).trigger('keyup.space', {
        shiftKey: 'true',
      })

      value.push(...FIXTURES_VALUE().slice(0, -1))

      expect(wrapper.emitted('input')[0]).toEqual([value])

      wrapper = shallowMount(VueAccessibleMultiselect, {
        propsData: { value: [], options: [{ value: 1, label: 'foo' }] },
      })

      await openMenu(wrapper)

      wrapper.find(classes.list).trigger('keyup.space', {
        shiftKey: 'true',
      })

      expect(wrapper.emitted('input')[0]).toEqual([[1]])
    })
  })

  describe('computed', () => {
    describe('labelId', () => {
      it('should be correct', () => {
        let wrapper = shallowMount(VueAccessibleMultiselect)
        expect(wrapper.vm.labelId).toBe(null)

        wrapper = shallowMount(VueAccessibleMultiselect, {
          propsData: { label: 'foo' },
        })
        expect(wrapper.vm.labelId).toBe(
          `v-multiselect-label-${wrapper.vm._uid}`
        )

        wrapper = shallowMount(VueAccessibleMultiselect, {
          slots: { label: 'foo' },
        })
        expect(wrapper.vm.labelId).toBe(
          `v-multiselect-label-${wrapper.vm._uid}`
        )
      })
    })
  })

  describe('events', () => {
    it('should set `open` to `false` when clicked outside of multiselect', async () => {
      const wrapper = await factory({ attachToDocument: true })

      document.body.click()

      expect(wrapper.vm.open).toBe(false)
    })
  })

  describe('classes', () => {
    it('should have appropriate class when `open` is `true`, and does not when `false`', () => {
      const wrapper = shallowMount(VueAccessibleMultiselect)
      const { classList } = wrapper.element
      const className = 'v-multiselect--opened'

      expect(classList.contains(className)).toBe(false)

      wrapper.setData({ open: true })

      expect(classList.contains(className)).toBe(true)
    })
  })

  describe('emit', () => {
    it('should emit `open` event when `open` becomes `true`', async () => {
      const wrapper = await factory({}, false)

      await openMenu(wrapper)

      expect(wrapper.emitted().open).toBeTruthy()
    })

    it('should emit `close` event when `open` becomes `false`', async () => {
      const wrapper = await factory({}, false)

      await openMenu(wrapper)

      wrapper.setData({ open: false })

      expect(wrapper.emitted().close).toBeTruthy()
    })
  })

  it('should set `activeDescendantIndex` to the index of the first option which `option.value` is in `value`', async () => {
    const wrapper = await factory()

    const index = wrapper
      .findAll(classes.option)
      .wrappers.findIndex(wrapper => {
        return wrapper.element.classList.contains(
          classes['option--selected'].substr(1)
        ) // remove `.`
      })

    expect(wrapper.vm.activeDescendantIndex).toBe(index)
  })

  it('should set `activeDescendantIndex` to `0` when `value.length === 0`', async () => {
    const wrapper = await factory({
      propsData: { value: [], options: FIXTURES_OPTIONS },
    })

    expect(wrapper.vm.activeDescendantIndex).toBe(0)
  })
})
