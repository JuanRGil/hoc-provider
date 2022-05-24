import './App.scss';
import './global-styles/inputs.scss';
import withValidators from './hoc/withValidators';
import Input from './components/form-components/Input/Input';
import { FormValidationProvider } from './providers/FormValidationProvider';
import {
  containsA, containsB, containsC, containsD,
} from './utils/validators';
import SubmitButton from './components/form-components/SubmitButton/SubmitButton';
import PhoneInput from './components/form-components/Input/PhoneInput/PhoneInput';
import CheckBox from './components/form-components/Input/CheckBox/CheckBox';
import Paper from './components/this-app-components/Paper/Paper';
import All from './components/test-components/policies/All';
import First from './components/test-components/policies/First';
import None from './components/test-components/policies/None';
import Blur from './components/test-components/validate-on/Blur';
import Change from './components/test-components/validate-on/Change';
import Both from './components/test-components/validate-on/Both';

function App() {
  const ValidateWithAllMessages = withValidators(Input, [containsA, containsB], { validateOn: 'both', showMessagePolicy: 'all' });

  const DoubleProcess = withValidators(ValidateWithAllMessages, [containsD, containsC], { validateOn: 'onBlur', showMessagePolicy: 'all' });

  const handleOnChange = (e: any) => {
    console.log({ value: e.target.value });
  };
  const handleOnBlur = (e: any) => {
    console.log({ value: e.target.value });
  };

  return (
    <div>
      <FormValidationProvider className="form-provider" contextName="form-text-inputs">
        <Paper title="with Validator options">
          <Paper title="Policies (show all errors, first error or none)">
            <All label="All" name="hoc-all" value="ab" onChange={handleOnChange} />
            <First label="First Message" name="hoc-first" value="ab" onChange={handleOnChange} />
            <None label="No Messages" name="hoc-none" value="ab" onChange={handleOnChange} />
          </Paper>
          <Paper title="When to show errors">
            <Blur label="show on Blur" name="hoc-blur" value="ab" onChange={handleOnChange} />
            <Change label="show on Change" name="hoc-change" value="ab" onChange={handleOnChange} />
            <Both label="on blur and on change" name="hoc-both" value="ab" onChange={handleOnChange} />
          </Paper>
        </Paper>
        <SubmitButton />
      </FormValidationProvider>
    </div>
  );
}

export default App;
