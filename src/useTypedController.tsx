import React from 'react';
import { useFormContext, Controller, Control } from 'react-hook-form';
import { formatName } from './formatName';
import {
  DeepPath,
  FieldValuesFromControl,
  Options,
  ControllerProps,
} from './types';

export const useTypedController = <
  TFieldValues extends FieldValuesFromControl<TControl>,
  TControl extends Control = Control
>({
  control: controlFromOptions,
}: Options<TControl>) => {
  const methods = useFormContext<TFieldValues>();
  const control = controlFromOptions || methods.control;

  const TypedController = React.useCallback(
    <
      TFieldName extends DeepPath<TFieldValues, TFieldName>,
      TAs extends 'input' | 'select' | 'textarea'
    >({
      name,
      as,
      rules,
      ...rest
    }: ControllerProps<TFieldValues, TFieldName, TAs>) => {
      const formattedName = formatName(name as any);
      const { register } = control;
      if (as) {
        return React.createElement(as, {
          name: formattedName,
          ref: rules ? register(rules as any) : register,
          ...rest,
        });
      }
      return (
        <Controller
          name={formattedName as any}
          control={control as any}
          rules={rules}
          {...rest}
        />
      );
    },
    [],
  );

  return TypedController;
};
