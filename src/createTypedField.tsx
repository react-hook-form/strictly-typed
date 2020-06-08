import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { formatName } from './formatName';
import { DeepPath, FieldValuesFromControl, Options, Props } from './types';

export const createTypedField = <
  TFieldValues extends FieldValuesFromControl<TControl>,
  TControl extends Control = Control
>({
  control,
}: Options<TControl>) => {
  const TypedField = <
    TFieldName extends DeepPath<TFieldValues, TFieldName>,
    TAs extends
      | React.ReactElement
      | React.ComponentType<any>
      | keyof JSX.IntrinsicElements
  >({
    name,
    as,
    ...rest
  }: Props<TFieldValues, TFieldName, TAs>) => {
    const formattedName = formatName(name as any);
    return (
      <Controller
        control={control}
        name={formattedName as any}
        as={as as any}
        {...rest}
      />
    );
  };

  return TypedField;
};
