import React from 'react';
import './App.css';
import { withValidators } from './hoc/withValidators';
import { Input } from './components/Input/Input';
import { FormValidationProvider } from './providers/FormValidationProvider';
import { containsA, containsB, containsC, containsD } from './utils/validators';
import { SubmitButton } from './components/SubmitButton/SubmitButton';
import PhoneInput from './components/PhoneInput/PhoneInput';

function App() {
  
  const ValidateWithAllMessages = withValidators(Input, [containsD, containsA, containsB, containsC], 'all')
  const ValidateWithoutMessages = withValidators(Input, [containsD, containsA, containsB, containsC], 'none')
  const ValidateWithFirstMessage = withValidators(Input, [containsD, containsA, containsB, containsC])
  const handleOnChange = (value: any) => {
    //console.log({value})
  }
  const handleOnBlur = (value: any) => {
    //console.log({value})
  }
  const style = {
    border: 'solid 1px black',
    display: 'grid',
    padding: '5px',
    margin: '5px',
  };
  return (
    <div>

    <div style={style}>

  <FormValidationProvider contextName='form1'>
    <ValidateWithAllMessages label="With All Errors" name="allMsgs" onChange={handleOnChange} onBlur={handleOnBlur}/>
    <ValidateWithoutMessages label="With No Errors" name="noMsgs" onChange={handleOnChange} onBlur={handleOnBlur}/>
    <ValidateWithFirstMessage label="With One Error" name="firstMsgs" onChange={handleOnChange} onBlur={handleOnBlur}/>
    <PhoneInput label="Telefono" name="phoneNumber" onChange={handleOnChange} onBlur={handleOnBlur}/>
    <SubmitButton/>
  </FormValidationProvider>
    </div>
    <div style={style}>

    <FormValidationProvider contextName='form2'>
      <ValidateWithAllMessages label="With All Errors" name="allMsgs2" onChange={handleOnChange} onBlur={handleOnBlur}/>
      <ValidateWithoutMessages label="With No Errors" name="noMsgs2" onChange={handleOnChange} onBlur={handleOnBlur}/>
      <ValidateWithFirstMessage label="With One Error" name="firstMsgs2" onChange={handleOnChange} onBlur={handleOnBlur}/>
      <SubmitButton/>
    </FormValidationProvider>
      </div>
    </div>
  )}

export default App;
