/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import React, {
  ChangeEvent, FocusEvent, useEffect, useState,
} from 'react';
import { useFormContext } from '../providers/FormValidationProvider';
import { InputProps, InputType, ValidatorType } from '../types/common';
import { getLengthValidator, isRequiredValidator } from '../utils/intrinsicValidators';

const withValidators = (
  WrappedComponent: InputType,
  validators: ValidatorType[],
  options: {
    validateOn?: 'onBlur' | 'onChange' | 'both';
    showMessagePolicy?: 'all' | 'first' | 'none';
  } = { validateOn: 'both', showMessagePolicy: 'first' },
) => function WithValidator(props: InputProps) {
  const { setFieldsStates } = useFormContext();
  const [intrinsicValidators, setIntrinsicValidators] = useState<ValidatorType[]>([]);
  const [nativeInputProps, setNativeInputProps] = useState({ ...props });
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const setInputState = (isInputValid: boolean) => {
    const { name } = props;
    if (setFieldsStates) {
      setFieldsStates((prevFieldsState) => ({
        ...prevFieldsState,
        [name]: isInputValid,
      }));
    } else {
      console.warn('FormValidationProvider not set. Please consider to include it as parent of your input fields');
    }
  };

  // TODO: generateValidatorsFromProps
  const generateValidatorsFromProps = (): ValidatorType[] => {
    const { maxLength, minLength, required } = props;
    const newValidators: ValidatorType[] = [];
    if (minLength || maxLength) {
      const lengthValidator = getLengthValidator(minLength, maxLength);
      if (lengthValidator) {
        newValidators.push(lengthValidator);
      }
      setNativeInputProps(
        (prevInputProps) => ({ ...prevInputProps, minLength: undefined, maxLength: undefined }),
      );
    }
    if (required) {
      newValidators.push(isRequiredValidator);
      setNativeInputProps((prevInputProps) => ({ ...prevInputProps, required: undefined }));
    }
    return newValidators;
  };

  useEffect(() => {
    setInputState(false);
    setIntrinsicValidators(generateValidatorsFromProps());
  }, []);

  const validate = (value: unknown) => {
    const { readOnly } = props;
    let isInputValid = true;
    const newErrorMessages: string[] = [];
    let i = 0;
    if (!readOnly) {
      const allValidators = intrinsicValidators.concat(validators);
      while (
        (options.showMessagePolicy === 'all' || isInputValid)
        && i < allValidators.length
      ) {
        if (!allValidators[i].isValid(value)) {
          const newMessage = allValidators[i].message;
          newErrorMessages.push(newMessage);
          isInputValid = false;
        }
        i += 1;
      }
    }
    setErrorMessages(newErrorMessages);
    setInputState(isInputValid);
  };

  const genericHandle = (eventFunction: 'onBlur' | 'onChange', e: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>, value: unknown) => {
    if (props[eventFunction]) {
      if (options.validateOn === 'both' || options.validateOn === eventFunction) {
        validate(value !== undefined ? value : e.target.value);
      }
      // ts does not detect it is impossible that props[eventFunction] !== undefined at this point
      // @ts-ignore
      props[eventFunction](e, value);
    }
  };

  const handleOnBlur = (e: FocusEvent<HTMLInputElement>, value: unknown) => {
    genericHandle('onBlur', e, value);
  };

  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, value: unknown) => {
    genericHandle('onChange', e, value);
  };

  return (
    <WrappedComponent
      {...nativeInputProps}
      onChange={(value, e) => handleOnChange(value, e)}
      onBlur={(value, e) => handleOnBlur(value, e)}
      showError={options.showMessagePolicy !== 'none'}
      errorMessages={errorMessages}
    />
  );
};

export default withValidators;
