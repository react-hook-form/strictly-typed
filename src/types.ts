import { Control } from 'react-hook-form';

export type ArrayWithLength<N extends number> = { [K in N]: any };

export interface DeepPathArray<T, P> extends ReadonlyArray<string | number> {
  ['0']?: keyof T;
  ['1']?: P extends {
    ['0']: infer K0;
  }
    ? K0 extends keyof T
      ? keyof T[K0]
      : never
    : never;
  ['2']?: P extends {
    ['0']: infer K0;
    ['1']: infer K1;
  }
    ? K0 extends keyof T
      ? K1 extends keyof T[K0]
        ? keyof T[K0][K1]
        : never
      : never
    : never;
  ['3']?: P extends {
    ['0']: infer K0;
    ['1']: infer K1;
    ['2']: infer K2;
  }
    ? K0 extends keyof T
      ? K1 extends keyof T[K0]
        ? K2 extends keyof T[K0][K1]
          ? keyof T[K0][K1][K2]
          : never
        : never
      : never
    : never;
  ['4']?: P extends {
    ['0']: infer K0;
    ['1']: infer K1;
    ['2']: infer K2;
    ['3']: infer K3;
  }
    ? K0 extends keyof T
      ? K1 extends keyof T[K0]
        ? K2 extends keyof T[K0][K1]
          ? K3 extends keyof T[K0][K1][K2]
            ? keyof T[K0][K1][K2][K3]
            : never
          : never
        : never
      : never
    : never;
  ['5']?: P extends {
    ['0']: infer K0;
    ['1']: infer K1;
    ['2']: infer K2;
    ['3']: infer K3;
    ['4']: infer K4;
  }
    ? K0 extends keyof T
      ? K1 extends keyof T[K0]
        ? K2 extends keyof T[K0][K1]
          ? K3 extends keyof T[K0][K1][K2]
            ? K4 extends keyof T[K0][K1][K2][K3]
              ? keyof T[K0][K1][K2][K3][K4]
              : never
            : never
          : never
        : never
      : never
    : never;
}

export type DeepPathArrayValue<
  T,
  P extends DeepPathArray<T, P>
> = P extends ArrayWithLength<0 | 1 | 2 | 3 | 4 | 5 | 6>
  ? any
  : P extends ArrayWithLength<0 | 1 | 2 | 3 | 4 | 5>
  ? T[P[0]][P[1]][P[2]][P[3]][P[4]][P[5]]
  : P extends ArrayWithLength<0 | 1 | 2 | 3 | 4>
  ? T[P[0]][P[1]][P[2]][P[3]][P[4]]
  : P extends ArrayWithLength<0 | 1 | 2 | 3>
  ? T[P[0]][P[1]][P[2]][P[3]]
  : P extends ArrayWithLength<0 | 1 | 2>
  ? T[P[0]][P[1]][P[2]]
  : P extends ArrayWithLength<0 | 1>
  ? T[P[0]][P[1]]
  : P extends ArrayWithLength<0>
  ? T[P[0]]
  : never;

export type DeepPath<T, P> = DeepPathArray<T, P> | keyof T;

export type DeepPathValue<
  T,
  P extends DeepPath<T, P>
> = P extends DeepPathArray<T, P>
  ? DeepPathArrayValue<T, P>
  : P extends keyof T
  ? T[P]
  : any;

export type FieldValuesFromControl<
  TControl extends Control
> = TControl extends Control<infer TFieldValues> ? TFieldValues : never;

export type Options<TControl extends Control> = {
  control?: TControl;
};

export type Message = string | React.ReactElement;

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

export type ValidateResult = Message | boolean | undefined;

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

export type Assign<T extends object, U extends object> = T & Omit<U, keyof T>;

export type FieldProps<
  TFieldValues extends Record<string, any>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>,
  TAs extends 'input' | 'select' | 'textarea' = 'input'
> = Assign<
  {
    name: TFieldName;
    as?: TAs;
    rules?: ValidationRules<DeepPathValue<TFieldValues, TFieldName>>;
  },
  JSX.IntrinsicElements[TAs]
>;

export type ControllerProps<
  TFieldValues extends Record<string, any>,
  TFieldName extends DeepPath<TFieldValues, TFieldName>
> = {
  name: TFieldName;
  rules?: ValidationRules<DeepPathValue<TFieldValues, TFieldName>>;
  onFocus?: () => void;
  defaultValue?: DeepPathValue<TFieldValues, TFieldName>;
  render: (data: {
    onChange: (...event: any[]) => void;
    onBlur: () => void;
    value: DeepPathValue<TFieldValues, TFieldName>;
  }) => React.ReactElement;
};
