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
  const ReqCheck = withValidators(CheckBox, [], { validateOn: 'onBlur', showMessagePolicy: 'all' });
  const ReqRadio = withValidators(RadioGroup, [isRequiredValidator]);

  const handleOnChange = (e, value) => {
    console.log({ value });
  };
  const handleOnBlur = (e, value) => {
    console.log({ value });
  };

  return (
    <div>
      <FormValidationProvider className="form-provider" contextName="form-text-inputs">
        <Paper title="Several Inputs">
          <ValidateWithAllMessages label="With All Errors (*)" name="allMsgs" required minLength={4} onBlur={handleOnBlur} onChange={handleOnChange} />
          <ValidateWithFirstMessage label="With One Error (*)" name="firstMsgs" required onBlur={handleOnBlur} onChange={handleOnChange} />
          <ValidateWithoutMessages label="With No Errors" name="noMsgs" onBlur={handleOnBlur} onChange={handleOnChange} />
          <PhoneInput label="Telefono" name="phoneNumber" onBlur={handleOnBlur} onChange={handleOnChange} />
          <InputDni label="DNI: " required name="dni" onBlur={handleOnBlur} />
          <CustomReqMessage label="Custom Message: " name="cuistom-required" onBlur={handleOnBlur} />
        </Paper>
        <SubmitButton />
      </FormValidationProvider>
      <FormValidationProvider className="form-provider" contextName="form-checkbox-radio-select">
        <Paper title="Checkboxes Radio and Select">
          <CheckBox label="Checkbox" name="mycheck" onBlur={handleOnBlur} />
          <ReqCheck label="Checkbox (*)" required name="mycheck-req" />
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
