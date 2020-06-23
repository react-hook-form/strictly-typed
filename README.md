<div align="center">
  <h2>👷🏻‍♂️ under construction</h2>
</div>

<div align="center">
    <p align="center">
        <a href="https://react-hook-form.com" title="React Hook Form - Simple React forms validation">
            <img src="https://raw.githubusercontent.com/bluebill1049/react-hook-form/master/website/logo.png" alt="React Hook Form Logo - React hook custom hook for form validation" width="300px" />
        </a>
    </p>
</div>

<p align="center">Performant, flexible and extensible forms with easy to use validation.</p>

## Goal

React Hook Form strictly typed Controller.

## Install

```
$ npm install @hookform/use-typed-controller
```

## Quickstart

```tsx
import { useTypedController } from '@hookform/use-typed-controller';
import { useForm } from 'react-hook-form';
import { TextField, Checkbox } from '@material-ui/core';

type FormValues = {
  flat: string;
  nested: {
    object: { test: string };
    array: { test: boolean }[];
  };
};

export default function App() {
  const { control, handleSubmit } = useForm<FormValues>();
  const TypedController = useTypedController<FormValues>({ control });

  const onSubmit = handleSubmit((data) => console.log(data));

  return (
    <form onSubmit={onSubmit}>
      <TypedController
        name="flat"
        defaultValue=""
        render={(props) => <TextField {...props} />}
      />

      <TypedController
        as="textarea"
        name={['nested', 'object', 'test']}
        defaultValue=""
        rules={{ required: true }}
      />

      <TypedController
        name={['nested', 'array', 0, 'test']}
        defaultValue={false}
        render={(props) => <Checkbox {...props} />}
      />

      {/* ❌: Type '"notExists"' is not assignable to type 'DeepPath<FormValues, "notExists">'. */}
      <TypedController as="input" name="notExists" defaultValue="" />

      {/* ❌: Type 'number' is not assignable to type 'string | undefined'. */}
      <TypedController
        as="input"
        name={['nested', 'object', 0, 'notExists']}
        defaultValue=""
      />

      {/* ❌: Type 'true' is not assignable to type 'string | undefined'. */}
      <TypedController as="input" name="flat" defaultValue={true} />

      <input type="submit" />
    </form>
  );
}
```

[![Edit React Hook Form - useTypedController](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/react-hook-form-usetypedcontroller-23qv1?fontsize=14&hidenavigation=1&theme=dark)

## Controller Name Reference

| Field Path          | Field Name   |
| :------------------ | :----------- |
| `foo`               | `foo`        |
| `['foo', 'bar']`    | `foo.bar`    |
| `['foo', 0]`        | `foo[0]`     |
| `['foo', '0']`      | `foo.0`      |
| `['foo', 1]`        | `foo[1]`     |
| `['foo', 0, 'bar']` | `foo[0].bar` |
| `['foo']`           | `foo`        |
| `['foo', 'bar']`    | `foo.bar`    |
| `['foo', 'bar', 0]` | `foo.bar[0]` |

## API

- useTypedController

| Name      | Type     | Required |
| :-------- | :------- | :------- |
| `control` | `Object` |          |

---

- TypedController

| Name           | Type                                          | Required |
| :------------- | :-------------------------------------------- | :------- |
| `name`         | `string \| [string, ...(string \| number)[]]` | ✓        |
| `as`           | `'input' \| 'select' \| 'textarea'`           |          |
| `render`       | `Function`                                    |          |
| `defaultValue` | `DeepPathValue`                               |          |
| `rules`        | `Object`                                      |          |
| `onFocus`      | `() => void`                                  |          |

## Backers

Thanks goes to all our backers! [[Become a backer](https://opencollective.com/react-hook-form#backer)].

<a href="https://opencollective.com/react-hook-form#backers">
    <img src="https://opencollective.com/react-hook-form/backers.svg?width=950" />
</a>

## Organizations

Thanks goes to these wonderful organizations! [[Contribute](https://opencollective.com/react-hook-form/contribute)].

<a href="https://github.com/react-hook-form/react-hook-form/graphs/contributors">
    <img src="https://opencollective.com/react-hook-form/organizations.svg?width=950" />
</a>

## Contributors

Thanks goes to these wonderful people! [[Become a contributor](CONTRIBUTING.md)].

<a href="https://github.com/react-hook-form/react-hook-form/graphs/contributors">
    <img src="https://opencollective.com/react-hook-form/contributors.svg?width=950" />
</a>
