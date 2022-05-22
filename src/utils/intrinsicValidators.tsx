/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ValidatorType } from '../types/common';
import {
  CHARACTER_WORD,
  INPUT_REQUIRED_MESSAGE,
  LENGTH_BETWEEN_MESSAGE,
  LENGTH_EXACT_MESSAGE,
  LENGTH_MAX_MESSAGE,
  LENGTH_MIN_MESSAGE,
} from './DEFAULT_MESSAGES';

const getMinLengthValidator = (minLength: number) => ({
  isValid: (value: string) => !value || value.length >= minLength,
  message: `${LENGTH_MIN_MESSAGE} ${minLength} ${CHARACTER_WORD}`,
});

const getMaxLengthValidator = (maxLength: number) => ({
  isValid: (value: string) => !value || value.length <= maxLength,
  message: `${LENGTH_MAX_MESSAGE} ${maxLength} ${CHARACTER_WORD}`,
});

const getExactLengthValidator = (exactLength: number) => ({
  isValid: (value: string) => !value || value.length === exactLength,
  message: `${LENGTH_EXACT_MESSAGE} ${exactLength} ${CHARACTER_WORD}`,
});

const getBothLengthValidator = (minLength: number, maxLength: number) => ({
  isValid: (value: string) => !value || (value.length >= minLength && value.length <= maxLength),
  message: `${LENGTH_BETWEEN_MESSAGE} ${minLength} y ${maxLength} ${CHARACTER_WORD}`,
});

export const getLengthValidator = (
  minLength: number | undefined,
  maxLength: number | undefined,
)
   : ValidatorType | undefined => {
  if (!minLength && !maxLength) {
    return undefined;
  }
  if (minLength === maxLength) {
    // ts does not detect it is impossible that minLength !== undefined at this point
    // @ts-ignore
    return getExactLengthValidator(minLength);
  } if (minLength && maxLength) {
    return getBothLengthValidator(minLength, maxLength);
  }
  if (minLength) {
    return getMinLengthValidator(minLength);
  }
  if (maxLength) {
    return getMaxLengthValidator(maxLength);
  }
  return undefined;
};

export const isRequiredValidator = {
  isValid: (value: string | boolean) => !!value,
  message: INPUT_REQUIRED_MESSAGE,
};
