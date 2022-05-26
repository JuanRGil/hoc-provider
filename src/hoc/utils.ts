/* eslint-disable import/prefer-default-export */
import { ExtendedValidableProps, ValidatorType } from '../types/common';
import { getLengthValidator, isRequiredValidator, getPatternValidator } from '../utils/intrinsicValidators';

export const generateValidatorsFromProps = <P extends ExtendedValidableProps>(
  props: P,
  setNativeInputProps: React.Dispatch<React.SetStateAction<P>>): ValidatorType[] => {
  const {
    maxLength, minLength, required, pattern, patternMgs,
  } = props;
  const newValidators: ValidatorType[] = [];
  /**
     * LENGTH VALIDATORS
     */
  if (minLength || maxLength) {
    const lengthValidator = getLengthValidator(minLength, maxLength);
    if (lengthValidator) {
      newValidators.push(lengthValidator);
    }
    setNativeInputProps(
      (prevInputProps) => ({
        ...prevInputProps,
        minLength: undefined,
        maxLength: undefined,
      }),
    );
  }
  /**
     * REQUIRED VALIDATOR
     */
  if (required) {
    newValidators.push(isRequiredValidator);
    setNativeInputProps((prevInputProps) => ({ ...prevInputProps, required: undefined }));
  }

  /**
     * PATTERN VALIDATOR
     */
  if (pattern) {
    newValidators.push(getPatternValidator(pattern, patternMgs));
    setNativeInputProps((prevInputProps) => ({ ...prevInputProps, required: undefined }));
  }

  return newValidators;
};

export const getAllValidators = <P extends ExtendedValidableProps>(
  validators: ValidatorType[],
  props: P,
  setNativeInputProps: React.Dispatch<React.SetStateAction<P>>): ValidatorType[] => {
  const propsValidators = props.validators ? [...props.validators] : [];
  return validators
    .concat(generateValidatorsFromProps(props, setNativeInputProps).concat(propsValidators));
};
