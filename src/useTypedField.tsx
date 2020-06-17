import React from 'react';
import {
  useFormContext,
  Controller as RHFController,
  Control,
} from 'react-hook-form';
import { formatName } from './formatName';
import {
  DeepPath,
  FieldValuesFromControl,
  Options,
  UncontrollerProps,
  ControllerProps,
} from './types';

export const useTypedField = <
  TFieldValues extends FieldValuesFromControl<TControl>,
  TControl extends Control = Control
>({
  control: controlFromOptions,
}: Options<TControl>) => {
  const methods = useFormContext<TFieldValues>();
  const control = controlFromOptions || methods.control;

  const Uncontroller = React.useCallback(
    <
      TFieldName extends DeepPath<TFieldValues, TFieldName>,
      TAs extends 'input' | 'select' | 'textarea' = 'input'
    >({
      name,
      as = 'input' as TAs,
      rules,
      ...rest
    }: UncontrollerProps<TFieldValues, TFieldName, TAs>) => {
      const formattedName = formatName(name as any);
      const { register } = control;
      return React.createElement(as, {
        name: formattedName,
        ref: rules ? register(rules as any) : register,
        ...rest,
      });
    },
    [],
  );

  const Controller = React.useCallback(
    <TFieldName extends DeepPath<TFieldValues, TFieldName>>({
      name,
      ...rest
    }: ControllerProps<TFieldValues, TFieldName>) => {
      const formattedName = formatName(name as any);
      return (
        <RHFController
          name={formattedName as any}
          control={control as any}
          {...rest}
        />
      );
    },
    [],
  );

  return {
    Uncontroller,
    Controller,
  };
};
