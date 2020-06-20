import React from 'react';
import { Control } from 'react-hook-form';
import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { useTypedController } from './useTypedController';

const reconfigureControl = (
  controlOverrides: Partial<Control> = {},
): Control => ({
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
  dirtyFieldsRef: {
    current: {},
  },
  watchFieldsHookRef: {
    current: {},
  },
  watchFieldsHookRenderRef: {
    current: {},
  },
  watchInternal: jest.fn(),
  validateSchemaIsValid: jest.fn(),
  getValues: jest.fn(),
  reRender: jest.fn(),
  setValue: jest.fn(),
  register: jest.fn(),
  unregister: jest.fn(),
  trigger: jest.fn(),
  removeFieldEventListener: jest.fn(),
  errorsRef: { current: {} },
  touchedFieldsRef: { current: {} },
  mode: { isOnSubmit: false, isOnBlur: false, isOnChange: false },
  reValidateMode: {
    isReValidateOnBlur: false,
    isReValidateOnSubmit: false,
  },
  formState: {
    isDirty: false,
    isSubmitted: false,
    dirtyFields: {},
    submitCount: 0,
    touched: {},
    isSubmitting: false,
    isValid: false,
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
  isDirtyRef: {
    current: false,
  },
  isSubmittedRef: {
    current: false,
  },
  readFormStateRef: {
    current: {
      isDirty: true,
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
  unmountFieldsStateRef: { current: {} },
  ...controlOverrides,
});

describe('useTypedField', () => {
  const control = reconfigureControl();
  const { result } = renderHook(() =>
    useTypedController<{
      test: string;
      test1: { test2: string }[];
    }>({
      control,
    }),
  );
  const TypedController = result.current;

  it('should render correctly when name is string', () => {
    render(
      <TypedController
        name="test"
        defaultValue=""
        render={(props) => <input {...props} />}
      />,
    );
    expect(control.register).toHaveBeenCalledWith(
      {
        focus: undefined,
        name: 'test',
      },
      undefined,
    );
  });

  it('should render correctly when name is array', () => {
    render(
      <TypedController
        name={['test1', 0, 'test2'] as const}
        defaultValue=""
        render={(props) => <input {...props} />}
      />,
    );
    expect(control.register).toHaveBeenCalledWith(
      {
        focus: undefined,
        name: 'test1[0].test2',
      },
      undefined,
    );
  });
});
