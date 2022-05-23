/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import {
  ChangeEvent, ComponentType, FocusEvent, useEffect, useState,
} from 'react';
import { useFormContext } from '../providers/FormValidationProvider';
import {
  CustomComponentType,
  ValidableProps, ValidatorType,
} from '../types/common';
import { getLengthValidator, isRequiredValidator } from '../utils/intrinsicValidators';

const withValidators = <P extends ValidableProps>(
  WrappedComponent: CustomComponentType<P>,
  validators: ValidatorType[],
  options: {
    validateOn?: 'onBlur' | 'onChange' | 'both';
    showMessagePolicy?: 'all' | 'first' | 'none';
  } = { validateOn: 'both', showMessagePolicy: 'first' },
): ComponentType<P> => function WithValidator(
    props: P,
  ) {
    const { setFieldsStates, submitTries } = useFormContext();
    const [intrinsicValidators, setIntrinsicValidators] = useState<ValidatorType[]>([]);
    const [nativeInputProps, setNativeInputProps] = useState({ ...props });
    const [errorMessages, setErrorMessages] = useState<string[]>([]);
    const [valueForValidation, setValueForValidation] = useState<unknown>('');

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
          (prevInputProps) => ({
            ...prevInputProps,
            minLength: undefined,
            maxLength: undefined,
          }),
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
      console.log('display name: ', WrappedComponent.name);
      console.log('valueForValidation: ', valueForValidation);
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

    useEffect(() => {
      if (submitTries > 0) {
        validate(valueForValidation);
      }
    }, [submitTries]);

    const genericHandle = (eventFunction: 'onBlur' | 'onChange', e: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>, value: unknown) => {
      if (options.validateOn === 'both' || options.validateOn === eventFunction) {
        validate(value !== undefined ? value : e.target.value);
      }
      if (props[eventFunction]) {
        // ts does not detect it is impossible that props[eventFunction] === undefined at this point
        // @ts-ignore
        props[eventFunction](e, value !== undefined ? value : e.target.value);
      }
    };

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>, value: unknown) => {
      genericHandle('onBlur', e, value);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>, value: unknown) => {
      if (e.target.type !== 'checkbox') {
        setValueForValidation(e.target.value);
      } else {
        setValueForValidation(e.target.checked);
      }
      genericHandle('onChange', e, value);
    };

    return (
      <WrappedComponent
        {...nativeInputProps as any}
        onChange={
        (e: ChangeEvent<HTMLInputElement>, value: unknown) => handleOnChange(e, value)
      }
        onBlur={
        (e: FocusEvent<HTMLInputElement>, value: unknown) => handleOnBlur(e, value)
      }
        showError={options.showMessagePolicy !== 'none'}
        errorMessages={errorMessages}
      />
    );
  };

export default withValidators;
