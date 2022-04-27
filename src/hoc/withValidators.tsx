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
  const [isFieldValid, setIsFieldValid] = useState(true);
  const [intrinsicValidators, setIntrinsicValidators] = useState<ValidatorType[]>([]);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const setInputState = (isInputValid: boolean) => {
    const { name } = props;
    setFieldsStates((prevFieldsState) => ({
      ...prevFieldsState,
      [name]: isInputValid,
    }));
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
    setIsFieldValid(isInputValid);
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

  function printErrorMessages(errorMessages: string[]) {
    return errorMessages.map((error, index) => <div key={index}>{error}</div>);
  }

  return (
    <>
      <WrappedComponent
        {...props}
        onChange={(value, e) => handleOnChange(value, e)}
        onBlur={(value, e) => handleOnBlur(value, e)}
      />
      {!isFieldValid && options.showMessagePolicy !== 'none' && (
        <div>{printErrorMessages(errorMessages)}</div>
      )}
    </>
  );
};
