import React from 'react';
import { Controller, Control } from 'react-hook-form';
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
  control,
}: Options<TControl>) => {
  const TypedController = React.useCallback(
    <
      TFieldName extends DeepPath<TFieldValues, TFieldName>,
      TAs extends 'input' | 'select' | 'textarea'
    >({
      name,
      ...rest
    }: ControllerProps<TFieldValues, TFieldName, TAs>) => {
      const formattedName = formatName(name as any);
      return (
        <Controller name={formattedName as any} control={control} {...rest} />
      );
    },
    [control],
  );

  return TypedController;
};
