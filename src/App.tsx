import React from 'react';
import './App.css';
import { withValidators } from './hoc/withValidators';
import { Input } from './components/Input/Input';
import { FormValidationProvider } from './providers/FormValidationProvider';

function App() {
  const isDivisibleBy5Validator = {
    isValid: (value: any) => {
      return value.length % 2 === 0;
    },
    message: `the field length is not divisible by 2`
  }
  const isDivisibleBy7Validator = {
    isValid: (value: any) => {
      return value.length % 3 === 0;
    },
    message: 'the field length is divisible by 3'
  }
  const InputWithAllValidator = withValidators(Input, isDivisibleBy5Validator, isDivisibleBy7Validator )
  const LenghtDivisibleBy2 = withValidators(Input, isDivisibleBy5Validator)
  const LenghtDivisibleBy3 = withValidators(Input, isDivisibleBy7Validator)
  const handleOnChange = (value: any) => {
    console.log({value})
  }
  const handleOnBlur = (value: any) => {
    console.log({value})
  }

  return (
  <FormValidationProvider>
    <InputWithAllValidator onChange={handleOnChange} onBlur={handleOnBlur}/>
    <LenghtDivisibleBy2 onChange={handleOnChange} onBlur={handleOnBlur}/>
    <LenghtDivisibleBy3 onChange={handleOnChange} onBlur={handleOnBlur}/>
  </FormValidationProvider>)
}

export default App;
