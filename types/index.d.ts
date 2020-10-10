import { PluginObject, Component } from 'vue'

export interface Props<T> {
  options: T[]
  value: T
  transition?: { name: string }
  label?: string
  placeholder?: string
  disabled?: boolean
}

type VueAccessibleMultiselectPlugin = PluginObject<never>

export default VueAccessibleMultiselectPlugin

export type VueAccessibleMultiselect = Component
