import React, { ChangeEvent, ComponentType, FocusEvent, useEffect, useState } from 'react';
import { useFormContext } from '../providers/FormValidationProvider';
import { InputType, ValidatorType } from '../types/common';

export const  withValidators = 
(WrappedComponent: InputType, ...validators: ValidatorType[] ) => 
//TODO: add id OR name prop to inputType. Its neccessary for Form validation
(props: {onChange: (value: any, e: ChangeEvent<HTMLInputElement>) => void; [key: string]: any}) => 
{ 
  const {isFormValid, setIsFormValid} = useFormContext();
  const [isFieldValid, setIsFieldValid] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>();

  useEffect(
    ()=> console.log(`is form valid: ${isFormValid}`),
    [isFormValid]
  )
  useEffect(
    ()=> console.log(`is field valid: ${isFieldValid}`),
    [isFieldValid]
  )
  const validate = (value: any) => {
    console.log(value)
        let isInputValid = true;
        let i = 0;
        while(isInputValid && i < validators.length){
          isInputValid = validators[i].isValid(value);
          if(!isInputValid) {
            setErrorMessage(validators[i].message)
          }
          i=i + 1;
        }
        setIsFieldValid(isInputValid);
        // TODO: add map here with inputs id|name and more complex setIsFormValid 
        setIsFormValid(isInputValid);
  }
const handleOnBlur = (value: any, e: FocusEvent<HTMLInputElement>) => {
        validate(value);
        props.onChange(value, e)
    }

  function printErrorMessage(msg : string = "default error message"){
    return msg;
  }
  
  return (
    <>
      <WrappedComponent {...props} onChange={(value, e)=>props.onChange(value, e)} onBlur={(value, e)=>handleOnBlur(value, e)}/>
      {
      !isFieldValid && (
      <div>{printErrorMessage(errorMessage)}</div>
      )
    }
    </>
  )
}
