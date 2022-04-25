import React, { FocusEvent, useEffect, useState } from 'react';
import { useFormContext } from '../providers/FormValidationProvider';
import { InputProps, InputType, ValidatorType } from '../types/common';

export const  withValidators = 
(WrappedComponent: InputType, validators: ValidatorType[], showMessagePolicy: 'all' | 'first' | 'none' = 'first' ) => 
(props: InputProps) => 
{ 
  const {setFieldsStates} = useFormContext();
  const [isFieldValid, setIsFieldValid] = useState(true);
  const [errorMessages, setErrorMessages] = useState<string[]>([]);

  const setInputState = (isInputValid: boolean) => {
    const {name} = props;
    setFieldsStates(prevFieldsState => ({...prevFieldsState, [name]: isInputValid}));
  }

  useEffect(()=> {
    setInputState(false);
  }, [])

  const validate = (value: any) => {
        let isInputValid = true;
        const newErrorMessages: string[] = []
        let i = 0;

        while((showMessagePolicy === 'all' || isInputValid) && i < validators.length){
          if(!validators[i].isValid(value)) {
            const newMessage = validators[i].message;
            newErrorMessages.push(newMessage)
            isInputValid = false;
          }
          i=i + 1;
        }
        setErrorMessages(newErrorMessages)
        setIsFieldValid(isInputValid);
        setInputState(isInputValid);
  }
const handleOnBlur = (value: any, e: FocusEvent<HTMLInputElement>) => {
        validate(value);
        props.onChange(value, e)
    }

  function printErrorMessages(errorMessages : string[]) {
    return errorMessages.map((error, index) => (<div key={index}>{error}</div>));
  }
  
  return (
    <>
      <WrappedComponent {...props} onChange={(value, e)=>props.onChange(value, e)} onBlur={(value, e)=>handleOnBlur(value, e)}/>
      {
      !isFieldValid &&  showMessagePolicy !== 'none' && (

      <div>{printErrorMessages(errorMessages)}</div>
      )
    }
    </>
  )
}
