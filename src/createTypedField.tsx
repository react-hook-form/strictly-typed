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
  FieldProps,
  ControllerProps,
} from './types';

export const createTypedField = <
  TFieldValues extends FieldValuesFromControl<TControl>,
  TControl extends Control = Control
>({
  control,
}: Options<TControl>) => {
  const Field = <
    TFieldName extends DeepPath<TFieldValues, TFieldName>,
    TAs extends 'input' | 'select' | 'textarea' = 'input'
  >({
    name,
    as = 'input' as TAs,
    rules,
    ...rest
  }: FieldProps<TFieldValues, TFieldName, TAs>) => {
    const formattedName = formatName(name as any);
    const methods = useFormContext<TFieldValues>();
    const { register } = control || methods;
    return React.createElement(as, {
      name: formattedName,
      ref: rules ? register(rules as any) : register,
      ...rest,
    });
  };

  const Controller = <TFieldName extends DeepPath<TFieldValues, TFieldName>>({
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
  };

  return {
    Field,
    Controller,
  };
};
