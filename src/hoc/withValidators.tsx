import React, { ChangeEvent, FocusEvent, useEffect, useState } from 'react';
import { useFormContext } from '../providers/FormValidationProvider';
import { InputProps, InputType, ValidatorType } from '../types/common';
import { getLengthValidators, isRequiredValidator } from '../utils/intrinsicValidators';

export const withValidators = (
  WrappedComponent: InputType,
  validators: ValidatorType[],
  options: {
    validateOn?: 'onBlur' | 'onChange' | 'both';
    showMessagePolicy?: 'all' | 'first' | 'none';
  } = { validateOn: 'both', showMessagePolicy: 'first' },
) => (props: InputProps) => {
  const { setFieldsStates } = useFormContext();
  const [intrinsicValidators, setIntrinsicValidators] = useState<ValidatorType[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const setInputState = (isInputValid: boolean) => {
    const { name } = props;
    if(setFieldsStates){
      setFieldsStates((prevFieldsState) => ({
        ...prevFieldsState,
        [name]: isInputValid,
      }));
    } else {
      console.warn("FormValidationProvider not set. Please consider to include it as parent of your input fields")
    }
  };

  useEffect(() => {
    setInputState(false);
    setIntrinsicValidators(generateValidatorsFromProps());
  }, []);

  // TODO: generateValidatorsFromProps
  const generateValidatorsFromProps = (): ValidatorType[] => {
    const { maxLength, minLength, required, checked } = props;
    const lenghtValidators =
      minLength || maxLength ? getLengthValidators(minLength, maxLength) : [];
      const requiredValidator = required ? [isRequiredValidator] : [];
    return [...lenghtValidators, ...requiredValidator];
  };

  const validate = (value: unknown) => {
    const { readOnly } = props;
    let isInputValid = true;
    const newErrorMessages: string[] = [];
    let i = 0;
    if (!readOnly) {
      const allValidators = intrinsicValidators.concat(validators);
      while (
        (options.showMessagePolicy === 'all' || isInputValid) &&
        i < allValidators.length
      ) {
        if (!allValidators[i].isValid(value)) {
          const newMessage = allValidators[i].message;
          newErrorMessages.push(newMessage);
          isInputValid = false;
        }
        i = i + 1;
      }
    }
    setErrorMessages(newErrorMessages);
    setInputState(isInputValid);
  };
  const handleOnBlur = (e: FocusEvent<HTMLInputElement>, value: unknown) => {
    if (props.onBlur) {
      if (options.validateOn === 'both' || options.validateOn === 'onBlur') {
        validate(value || e.target.value);
      }
      props.onBlur(e, value || e.target.value);
    }
  };
  const handleOnChange = (e: ChangeEvent<HTMLInputElement>, value: unknown) => {
    if (props.onChange) {
      if (options.validateOn === 'both' || options.validateOn === 'onChange') {
        validate(value || e.target.value);
      }
      props.onChange(e, value || e.target.value);
    }
  };

  return (
    <WrappedComponent
      {...props}
      onChange={(value, e) => handleOnChange(value, e)}
      onBlur={(value, e) => handleOnBlur(value, e)}
      showError={options.showMessagePolicy !== 'none'}
      errorMessages={errorMessages}
    />
  );
};
