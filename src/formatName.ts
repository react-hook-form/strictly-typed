const isNumber = (value: unknown): value is number => typeof value === 'number';

export const formatName = (
  name: string | [string, ...(string | number)[]],
): string => {
  if (Array.isArray(name)) {
    return name
      .reduce((accumulator, currentValue) => {
        if (isNumber(currentValue)) {
          const lastIndex = accumulator.length - 1;
          accumulator[lastIndex] = `${accumulator[lastIndex]}[${currentValue}]`;
          return accumulator;
        }
        return [...accumulator, currentValue];
      }, [] as string[])
      .join('.');
  }
  return name;
};
