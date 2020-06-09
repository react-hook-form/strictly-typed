# @hookform/typed-field

React Hook Form strictly typed Field component.

## Usage

```tsx
import { useForm } from "react-hook-form";
import { createTypedField } from "@hookform/typed-field";

type FormValues = {
  test: string;
  nested: {
    test: string;
  }[];
};

export default function App() {
  const { control, handleSubmit } = useForm<FormValues>();
  const TypedField = createTypedField<FormValues>({ control });
  const onSubmit = handleSubmit((data) => alert(JSON.stringify(data)));

  return (
    <form onSubmit={onSubmit}>
      <TypedField as="input" name="test" rules={{ required: true }} />
      <TypedField
        as="input"
        name={["nested", 0, "test"]}
        rules={{ required: true }}
      />
      <input type="submit" />
    </form>
  );
}
```
