export const parsedNumber = (value: number) => {
  if (value < 0) {
    return `-$${-value}`;
  }
  return `+$${value}`;
};
