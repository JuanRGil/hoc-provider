import { ValidatorType } from '../types/common';
import { CHARACTER_WORD, INPUT_REQUIRED_MESSAGE, LENGTH_BETWEEN_MESSAGE, LENGTH_EXACT_MESSAGE, LENGTH_MAX_MESSAGE, LENGTH_MIN_MESSAGE } from './DEFAULT_MESSAGES';

const getMinLengthValidator = (minLength: number) => ({
  isValid: (value: string) => {
    return !value || value.length >= minLength;
  },
  message: `${LENGTH_MIN_MESSAGE} ${minLength} ${CHARACTER_WORD}`,
});

const getMaxLengthValidator = (maxLength: number) => ({
  isValid: (value: string) => {
    return !value || value.length <= maxLength;
  },
  message: `${LENGTH_MAX_MESSAGE} ${maxLength} ${CHARACTER_WORD}`,
});

const getExactLengthValidator = (exactLength: number) => ({
  isValid: (value: string) => {
    return !value || value.length === exactLength;
  },
  message: `${LENGTH_EXACT_MESSAGE} ${exactLength} ${CHARACTER_WORD}`,
});

const getBothLengthValidator = (minLength: number, maxLength: number) => ({
  isValid: (value: string) => {
    return !value || (value.length >= minLength && value.length <= maxLength);
  },
  message: `${LENGTH_BETWEEN_MESSAGE} ${minLength} y ${maxLength} ${CHARACTER_WORD}`,
})

export const getLengthValidators = (minLength: any, maxLength: any): ValidatorType[] => {
  if (minLength === maxLength) {
    return [getExactLengthValidator(minLength)];
  } else if( minLength && maxLength) {
    return [getBothLengthValidator(minLength, maxLength)]
  } else {
    const lengthValidators = [];
    if (minLength) {
      lengthValidators.push(getMinLengthValidator(minLength));
    }
    if (maxLength) {
      lengthValidators.push(getMaxLengthValidator(maxLength));
    }
    return lengthValidators;
  }
};

export const isRequiredValidator = {
  isValid: (value: string) => {
    return !!value;
  },
  message: INPUT_REQUIRED_MESSAGE,
}
