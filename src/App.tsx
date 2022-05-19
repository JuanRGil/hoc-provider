import './App.scss';
import withValidators from './hoc/withValidators';
import Input from './components/form-components/Input/Input';
import { FormValidationProvider } from './providers/FormValidationProvider';
import {
  containsA, containsB, containsC, containsD,
} from './utils/validators';
import SubmitButton from './components/form-components/SubmitButton/SubmitButton';
import PhoneInput from './components/form-components/PhoneInput/PhoneInput';
import CheckBox from './components/form-components/CheckBox/CheckBox';
import Paper from './components/this-app-components/Paper/Paper';

function App() {
  const ValidateWithAllMessages = withValidators(Input, [containsA, containsB], { validateOn: 'both', showMessagePolicy: 'all' });
  const ValidateWithoutMessages = withValidators(Input, [containsD, containsA, containsB, containsC], { validateOn: 'onBlur', showMessagePolicy: 'all' });
  const ValidateWithFirstMessage = withValidators(Input, [containsD, containsA, containsB, containsC], { validateOn: 'onBlur', showMessagePolicy: 'first' });

  const handleOnChange = (e: any, value: any) => {
    console.log({ value });
  };
  const handleOnBlur = (e: any, value: any) => {
    console.log({ value });
  };

  return (
    <div>
      <FormValidationProvider className="form-provider" contextName="form-text-inputs">
        <Paper title="Several Inputs">
          <ValidateWithAllMessages label="With All Errors" name="allMsgs" required minLength={4} maxLength={4} onBlur={handleOnBlur} onChange={handleOnChange} />
          <ValidateWithoutMessages label="With No Errors" name="noMsgs" onBlur={handleOnBlur} onChange={handleOnChange} />
          <ValidateWithFirstMessage label="With One Error" name="firstMsgs" required onBlur={handleOnBlur} onChange={handleOnChange} />
          <PhoneInput label="Telefono" name="phoneNumber" onBlur={handleOnBlur} onChange={handleOnChange} />
        </Paper>
        <SubmitButton />
      </FormValidationProvider>
      <FormValidationProvider className="form-provider" contextName="form-checkbox-radio-select">
        <Paper title="Checkboxes Radio and Select">
          <PhoneInput label="Telefono" name="phoneNumber" onBlur={handleOnBlur} onChange={handleOnChange} />
          <CheckBox label="Checkbox" name="mycheck" onBlur={handleOnBlur} />
        </Paper>
        <SubmitButton />
      </FormValidationProvider>

      <div className="form-provider">
        <ValidateWithAllMessages label="With All Errors" name="allMsgs2" onChange={handleOnChange} onBlur={handleOnBlur} />
        <ValidateWithoutMessages label="With No Errors" name="noMsgs2" onChange={handleOnChange} onBlur={handleOnBlur} />
        <ValidateWithFirstMessage label="With One Error" name="firstMsgs2" onChange={handleOnChange} onBlur={handleOnBlur} />
        <SubmitButton />
      </div>
    </div>
  );
}

export default App;
