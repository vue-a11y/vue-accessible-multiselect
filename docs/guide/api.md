# API

## Props

`<vue-accessible-multiselect>` accepts some `props`:

| Prop                  | Description                                                                                                                                                             |
| --------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `options: array`      | `required`. Array of multiselect options. Should be an array of objects that match the following pattern `{ value: any, label: string }`                                |
| `value: array`        | `required`. Current value of multiselect.                                                                                                                               |
| `label: string`       | Multiselect label                                                                                                                                                       |
| `placeholder: string` | Multiselect placeholder                                                                                                                                                 |
| `disabled: boolean`   | Whether multiselect is disabled                                                                                                                                         |
| `transition: object`  | Through this object you can configure the transition of `.v-multiselect__menu` entrance and leave. Should match the following pattern `{ name: string, mode: string? }` |

## Slots

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

```vue
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