/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable react/display-name */
import {
  ChangeEvent, ComponentType, FocusEvent, useEffect, useState,
} from 'react';
import { useFormContext } from '../providers/FormValidationProvider';
import {
  CustomComponentType,
  ExtendedValidableProps,
  ValidatorType,
} from '../types/common';
import { getAllValidators } from './utils';

const DEFAULT_OPTIONS = { validateOn: 'both', showMessagePolicy: 'first' };
const withValidators = <P extends ExtendedValidableProps>(
  WrappedComponent: CustomComponentType<P>,
  validators: ValidatorType[],
  options?: {
    validateOn?: 'onBlur' | 'onChange' | 'both';
    showMessagePolicy?: 'all' | 'first' | 'none';
  },
): ComponentType<P> => function WithValidator(
    props: P,
  ) {
    const { setFieldsStates, submitTries } = useFormContext();
    const [nativeInputProps, setNativeInputProps] = useState({ ...props });
    const [errorMessages, setErrorMessages] = useState<string[]>([]);

    const [valueForValidation, setValueForValidation] = useState<unknown>(props.value || props.defaultValue || props.checked || '');
    const finalOptions = { ...DEFAULT_OPTIONS, ...options };
    const [allValidators] = useState(getAllValidators(validators, props, setNativeInputProps));
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

    useEffect(() => {
      setInputState(false);
      console.log('display name: ', WrappedComponent.name);
      console.log('valueForValidation: ', valueForValidation);
    }, []);

    const validate = (value: unknown) => {
      const { readOnly } = props;
      let isInputValid = true;
      const newErrorMessages: string[] = [];
      let i = 0;
      if (!readOnly) {
        while (
          (finalOptions.showMessagePolicy === 'all' || isInputValid)
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

    const genericHandle = (eventFunction: 'onBlur' | 'onChange', e: FocusEvent<HTMLInputElement> | ChangeEvent<HTMLInputElement>) => {
      if (finalOptions.validateOn === 'both' || finalOptions.validateOn === eventFunction) {
        if (e.target.type !== 'checkbox') {
          validate(e.target.value);
        } else {
          validate(e.target.checked);
        }
      }
      if (props[eventFunction]) {
        // ts does not detect it is impossible that props[eventFunction] === undefined at this point
        // @ts-ignore
        props[eventFunction](e);
      }
    };

    const handleOnBlur = (e: FocusEvent<HTMLInputElement>) => {
      genericHandle('onBlur', e);
    };

    const handleOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      console.log(`${WrappedComponent.name} has changed`);
      if (e.target.type !== 'checkbox') {
        setValueForValidation(e.target.value);
      } else {
        setValueForValidation(e.target.checked);
      }
      genericHandle('onChange', e);
    };

    return (
      <WrappedComponent
        {...nativeInputProps as any}
        withValidator
        validators={allValidators}
        onChange={
        (e: ChangeEvent<HTMLInputElement>) => handleOnChange(e)
      }
        onBlur={
        (e: FocusEvent<HTMLInputElement>) => handleOnBlur(e)
      }
        showError={finalOptions.showMessagePolicy !== 'none'}
        errorMessages={errorMessages}
      />
    );
  };

export default withValidators;
