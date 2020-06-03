# @hookform/typed-field
Strictly typed input.

```tsx
const { control } = useForm<{
  nested: [
    {
      key: string,
    }
  ]
}>()

const TypedField = createField<FormValues>({ control });

<TypedField as={TextInput} name={['nested', 0, 'key2']} />
```
