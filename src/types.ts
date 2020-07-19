import { NestedValue, Control } from 'react-hook-form';

export type ArrayWithLength<N extends number> = { [K in N]: any };

export interface DeepPathArray<TValues extends Record<string, any>, TPath>
  extends ReadonlyArray<string | number> {
  ['0']: keyof TValues;
  ['1']?: TPath extends {
    ['0']: infer K0;
  }
    ? K0 extends keyof TValues
      ? keyof TValues[K0]
      : never
    : never;
  ['2']?: TPath extends {
    ['0']: infer K0;
    ['1']: infer K1;
  }
    ? K0 extends keyof TValues
      ? K1 extends keyof TValues[K0]
        ? keyof TValues[K0][K1]
        : never
      : never
    : never;
  ['3']?: TPath extends {
    ['0']: infer K0;
    ['1']: infer K1;
    ['2']: infer K2;
  }
    ? K0 extends keyof TValues
      ? K1 extends keyof TValues[K0]
        ? K2 extends keyof TValues[K0][K1]
          ? keyof TValues[K0][K1][K2]
          : never
        : never
      : never
    : never;
  ['4']?: TPath extends {
    ['0']: infer K0;
    ['1']: infer K1;
    ['2']: infer K2;
    ['3']: infer K3;
  }
    ? K0 extends keyof TValues
      ? K1 extends keyof TValues[K0]
        ? K2 extends keyof TValues[K0][K1]
          ? K3 extends keyof TValues[K0][K1][K2]
            ? keyof TValues[K0][K1][K2][K3]
            : never
          : never
        : never
      : never
    : never;
  ['5']?: TPath extends {
    ['0']: infer K0;
    ['1']: infer K1;
    ['2']: infer K2;
    ['3']: infer K3;
    ['4']: infer K4;
  }
    ? K0 extends keyof TValues
      ? K1 extends keyof TValues[K0]
        ? K2 extends keyof TValues[K0][K1]
          ? K3 extends keyof TValues[K0][K1][K2]
            ? K4 extends keyof TValues[K0][K1][K2][K3]
              ? keyof TValues[K0][K1][K2][K3][K4]
              : never
            : never
          : never
        : never
      : never
    : never;
}

export type DeepPathArrayValue<
  TValues extends Record<string, any>,
  TPath extends DeepPathArray<TValues, TPath>
> = TPath extends ArrayWithLength<0 | 1 | 2 | 3 | 4 | 5 | 6>
  ? any
  : TPath extends ArrayWithLength<0 | 1 | 2 | 3 | 4 | 5>
  ? TValues[TPath[0]][TPath[1]][TPath[2]][TPath[3]][TPath[4]][TPath[5]]
  : TPath extends ArrayWithLength<0 | 1 | 2 | 3 | 4>
  ? TValues[TPath[0]][TPath[1]][TPath[2]][TPath[3]][TPath[4]]
  : TPath extends ArrayWithLength<0 | 1 | 2 | 3>
  ? TValues[TPath[0]][TPath[1]][TPath[2]][TPath[3]]
  : TPath extends ArrayWithLength<0 | 1 | 2>
  ? TValues[TPath[0]][TPath[1]][TPath[2]]
  : TPath extends ArrayWithLength<0 | 1>
  ? TValues[TPath[0]][TPath[1]]
  : TPath extends ArrayWithLength<0>
  ? TValues[TPath[0]]
  : never;

export type DeepPath<TValues extends Record<string, any>, TPath> =
  | DeepPathArray<TValues, TPath>
  | keyof TValues;

export type DeepPathValue<
  TValues extends Record<string, any>,
  TPath extends DeepPath<TValues, TPath>
> = TPath extends DeepPathArray<TValues, TPath>
  ? DeepPathArrayValue<TValues, TPath>
  : TPath extends keyof TValues
  ? TValues[TPath]
  : any;

export type NonUndefined<T> = T extends undefined ? never : T;

export type UnpackNestedValue<T> = NonUndefined<T> extends NestedValue<infer U>
  ? U
  : NonUndefined<T> extends Date | FileList
  ? T
  : NonUndefined<T> extends object
  ? { [K in keyof T]: UnpackNestedValue<T[K]> }
  : T;

export type FieldValuesFromControl<
  TControl extends Control
> = TControl extends Control<infer TFieldValues> ? TFieldValues : never;

export type Options<TControl extends Control> = {
  control?: TControl;
};

export type Message = string;

export type ValidationValue = boolean | number | string | RegExp;

export type ValidationRule<
  TValidationValue extends ValidationValue = ValidationValue
> = TValidationValue | ValidationValueMessage<TValidationValue>;

export type ValidationValueMessage<
  TValidationValue extends ValidationValue = ValidationValue
> = {
  value: TValidationValue;
  message: Message;
};

export type ValidateResult = Message | Message[] | boolean | undefined;

export type Validate<TFieldValue> = (
  data: TFieldValue,
) => ValidateResult | Promise<ValidateResult>;

export type ValidationRules<TFieldValue> = Partial<{
  required: Message | ValidationRule<boolean>;
  min: ValidationRule<number | string>;
  max: ValidationRule<number | string>;
  maxLength: ValidationRule<number | string>;
  minLength: ValidationRule<number | string>;
  pattern: ValidationRule<RegExp>;
  validate: Validate<TFieldValue> | Record<string, Validate<TFieldValue>>;
}>;

export type Assign<TValues extends object, U extends object> = TValues &
  Omit<U, keyof TValues>;

export type ControllerProps<
  TFieldValues extends Record<string, any>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TAs extends 'input' | 'select' | 'textarea'
> = Assign<
  {
    name: TFieldName;
    as?: TAs;
    rules?: ValidationRules<DeepPathValue<TFieldValues, TFieldName>>;
    onFocus?: () => void;
    defaultValue?: DeepPathValue<TFieldValues, TFieldName>;
    render?: (props: {
      onChange: (...event: any[]) => void;
      onBlur: () => void;
      value: DeepPathValue<TFieldValues, TFieldName>;
    }) => React.ReactElement;
  },
  JSX.IntrinsicElements[TAs]
>;
