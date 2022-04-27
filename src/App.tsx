import React from 'react';
import './App.css';
import { withValidators } from './hoc/withValidators';
import { Input } from './components/Input/Input';
import { FormValidationProvider } from './providers/FormValidationProvider';
import { containsA, containsB, containsC, containsD } from './utils/validators';
import { SubmitButton } from './components/SubmitButton/SubmitButton';
import PhoneInput from './components/PhoneInput/PhoneInput';

function App() {
  
  const ValidateWithAllMessages = withValidators(Input, [containsD, containsA, containsB, containsC], {validateOn: 'both', showMessagePolicy: 'all'})
  const ValidateWithoutMessages = withValidators(Input, [containsD, containsA, containsB, containsC], {validateOn: 'onBlur', showMessagePolicy: 'all'})
  const ValidateWithFirstMessage = withValidators(Input, [containsD, containsA, containsB, containsC], {validateOn: 'onBlur', showMessagePolicy: 'all'})
  const handleOnChange = (e: any, value: any) => {
    console.log({value})
  }
  const handleOnBlur = (e: any, value: any) => {
    console.log({value})
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
    <ValidateWithAllMessages label="With All Errors" name="allMsgs" required minLength={4} maxLength={4} onBlur={handleOnBlur} onChange={handleOnChange}/>
    <ValidateWithoutMessages label="With No Errors" name="noMsgs" onBlur={handleOnBlur} onChange={handleOnChange}/>
    <ValidateWithFirstMessage label="With One Error" name="firstMsgs" required onBlur={handleOnBlur} onChange={handleOnChange}/>
    <PhoneInput label="Telefono" name="phoneNumber" onBlur={handleOnBlur} onChange={handleOnChange}/>
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
