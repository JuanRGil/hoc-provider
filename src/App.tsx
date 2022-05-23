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
import { isRequiredValidator } from './utils/intrinsicValidators';
import RadioGroup from './components/form-components/Input/RadioGroup/RadioGroup';

function App() {
  const ValidateWithAllMessages = withValidators(Input, [containsA, containsB], { validateOn: 'both', showMessagePolicy: 'all' });
  const ValidateWithoutMessages = withValidators(Input, [containsD, containsA, containsB, containsC], { validateOn: 'onBlur', showMessagePolicy: 'all' });
  const ValidateWithFirstMessage = withValidators(Input, [containsD, containsA, containsB, containsC], { validateOn: 'onBlur', showMessagePolicy: 'first' });
  const InputDni = withValidators(Input, [{ isValid: (value) => !value || /^[0-9]{8,8}[A-Za-z]$/.test(value), message: 'invalid dni' }]);
  const CustomReqMessage = withValidators(Input, [{ ...isRequiredValidator, message: 'my custom required message' }]);
  const WithPattern = withValidators(Input, []);
  const ReqCheck = withValidators(CheckBox, [], { validateOn: 'onBlur', showMessagePolicy: 'all' });
  const ReqRadio = withValidators(RadioGroup, [isRequiredValidator]);

  const handleOnChange = (e: any) => {
    console.log({ value: e.target.value });
  };
  const handleOnBlur = (e: any) => {
    console.log({ value: e.target.value });
  };

  return (
    <div>
      <FormValidationProvider className="form-provider" contextName="form-text-inputs">
        <Paper title="Inputs with Validator HOC">
          <ValidateWithAllMessages label="With All Errors (*)" name="HOC-allMsgs" required minLength={4} onBlur={handleOnBlur} onChange={handleOnChange} />
          <ValidateWithFirstMessage label="With One Error (*)" name="HOC-firstMsgs" required onBlur={handleOnBlur} onChange={handleOnChange} />
          <ValidateWithoutMessages label="With No Errors" name="HOC-noMsgs" onBlur={handleOnBlur} onChange={handleOnChange} />
          <InputDni label="DNI: " required name="HOC-dni" onBlur={handleOnBlur} />
          <CustomReqMessage label="Custom Message: " name="HOC-cuistom-required" onBlur={handleOnBlur} />
          <WithPattern label="Only number (default msg)" name="HOC-with-pattern" pattern={/^\d*$/} onBlur={handleOnBlur} />
          <WithPattern label="Only number (custom msg)" name="HOC-with-pattern-custom-msg" pattern={/^\d*$/} patternMgs="Only numbers" onBlur={handleOnBlur} />
        </Paper>
        <Paper title="Inputs without Validator HOC">
          <PhoneInput label="Telefono" name="phoneNumber" onChange={handleOnChange} />
          <Input label="Only numbers" name="with-pattern" onBlur={handleOnBlur} />
        </Paper>
        <SubmitButton />
      </FormValidationProvider>
      <FormValidationProvider className="form-provider" contextName="form-checkbox-radio-select">
        <Paper title="Checkboxes Radio and Select">
          <CheckBox label="Checkbox" name="mycheck" onBlur={handleOnBlur} />
          <ReqCheck label="Checkbox (*)" onChange={handleOnChange} required name="mycheck-req" />
          <ReqRadio
            label="RadioGroup"
            name="radio-group"
            radioOptions={[
              { id: '1', label: 'option 1', value: { a: 'whatever1', b: 'hello1' } },
              { id: '2', label: 'option 2', value: { a: 'whatever2', b: 'hello2' } },
              { id: '3', label: 'option 3', value: { a: 'whatever3', b: 'hello3' } },
            ]}
            onChange={handleOnChange}
          />
        </Paper>
        <SubmitButton />
      </FormValidationProvider>
    </div>
  );
}

export default App;
