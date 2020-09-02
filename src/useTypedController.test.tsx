import React from 'react';
import { Control } from 'react-hook-form';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useTypedController } from './useTypedController';

export const reconfigureControl = (
  controlOverrides: Partial<Control> = {},
): Control => ({
  unmountFieldsStateRef: {
    current: {},
  },
  defaultValuesRef: {
    current: {},
  },
  isWatchAllRef: {
    current: false,
  },
  validFieldsRef: {
    current: new Set(),
  },
  fieldsWithValidationRef: {
    current: new Set(),
  },
  fieldArrayDefaultValues: {
    current: {},
  },
  watchFieldsRef: {
    current: new Set(),
  },
  watchFieldsHookRef: {
    current: {},
  },
  watchFieldsHookRenderRef: {
    current: {},
  },
  watchInternal: jest.fn(),
  validateResolver: jest.fn(),
  setValue: jest.fn(),
  getValues: jest.fn(),
  register: jest.fn(),
  unregister: jest.fn(),
  trigger: jest.fn(),
  removeFieldEventListener: jest.fn(),
  mode: {
    isOnSubmit: false,
    isOnBlur: false,
    isOnChange: false,
    isOnTouch: false,
    isOnAll: false,
  },
  reValidateMode: {
    isReValidateOnBlur: false,
    isReValidateOnChange: false,
  },
  formStateRef: {
    current: {
      errors: {},
      isDirty: false,
      isSubmitted: false,
      dirtyFields: {},
      submitCount: 0,
      touched: {},
      isSubmitting: false,
      isValid: false,
    },
  },
  fieldsRef: {
    current: {},
  },
  resetFieldArrayFunctionRef: {
    current: {},
  },
  fieldArrayNamesRef: {
    current: new Set<string>(),
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  updateFormState: () => {},
  readFormStateRef: {
    current: {
      isDirty: true,
      errors: true,
      isSubmitted: false,
      submitCount: false,
      touched: false,
      isSubmitting: false,
      isValid: false,
      dirtyFields: false,
    },
  },
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  renderWatchedInputs: () => {},
  ...controlOverrides,
});

type FormValues = {
  flat: string;
  nested: {
    object: { test: string };
    array: { test: string }[];
  };
};

describe('useTypedField', () => {
  it('should render correctly when as is input and name is string', () => {
    const control = reconfigureControl();
    const { result } = renderHook(() =>
      useTypedController<FormValues>({
        control,
      }),
    );
    const TypedController = result.current;

    const { asFragment } = render(
      <TypedController as="input" name="flat" defaultValue="test" />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when name is string and render is textarea', () => {
    const control = reconfigureControl();
    const { result } = renderHook(() =>
      useTypedController<FormValues>({
        control,
      }),
    );
    const TypedController = result.current;

    const { asFragment } = render(
      <TypedController
        name="flat"
        defaultValue="test"
        render={(props) => <textarea {...props} />}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when as is textarea and name is array', () => {
    const control = reconfigureControl();
    const { result } = renderHook(() =>
      useTypedController<FormValues>({
        control,
      }),
    );
    const TypedController = result.current;

    const { asFragment } = render(
      <TypedController
        as="textarea"
        name={['nested', 'object', 'test']}
        defaultValue="test"
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when name is array and render is input', () => {
    const control = reconfigureControl();
    const { result } = renderHook(() =>
      useTypedController<FormValues>({
        control,
      }),
    );
    const TypedController = result.current;

    const { asFragment } = render(
      <TypedController
        name={['nested', 'array', 0, 'test']}
        defaultValue="test"
        render={(props) => <input {...props} />}
      />,
    );

    expect(asFragment()).toMatchSnapshot();
  });

  it('should render correctly when name is string', () => {
    const control = reconfigureControl();
    const { result } = renderHook(() =>
      useTypedController<FormValues>({
        control,
      }),
    );
    const TypedController = result.current;

    render(
      <TypedController
        name="flat"
        defaultValue=""
        render={(props) => <input {...props} />}
      />,
    );

    expect(control.register).toHaveBeenCalledWith(
      {
        focus: undefined,
        name: 'flat',
      },
      undefined,
    );
  });

  it('should format name correctly when name is array (dot syntax)', () => {
    const control = reconfigureControl();
    const { result } = renderHook(() =>
      useTypedController<FormValues>({
        control,
      }),
    );
    const TypedController = result.current;

    render(
      <TypedController
        name={['nested', 'object', 'test']}
        defaultValue=""
        render={(props) => <input {...props} />}
      />,
    );

    expect(control.register).toHaveBeenCalledWith(
      {
        focus: undefined,
        name: 'nested.object.test',
      },
      undefined,
    );
  });

  it('should format name correctly when name is array (dot-bracket syntax)', () => {
    const control = reconfigureControl();
    const { result } = renderHook(() =>
      useTypedController<FormValues>({
        control,
      }),
    );
    const TypedController = result.current;

    render(
      <TypedController
        name={['nested', 'array', 0, 'test']}
        defaultValue=""
        render={(props) => <input {...props} />}
      />,
    );

    expect(control.register).toHaveBeenCalledWith(
      {
        focus: undefined,
        name: 'nested.array[0].test',
      },
      undefined,
    );
  });
});
