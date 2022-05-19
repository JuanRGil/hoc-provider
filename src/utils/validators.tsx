export const containsA = {
  isValid: (value: string) => !value.includes('a'),
  message: 'the field includes a!',
};
export const containsB = {
  isValid: (value: any) => !value.includes('b'),
  message: 'the field includes b!',
};
export const containsC = {
  isValid: (value: any) => !value.includes('c'),
  message: 'the field includes c!',
};
export const containsD = {
  isValid: (value: any) => !value.includes('d'),
  message: 'the field includes d!',
};

export const phoneValidator = {
  isValid: (phone: string) => !phone || /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/.test(phone),
  message: 'the Phone has not a correct format!!',
};
