import './App.scss';
import './global-styles/inputs.scss';
import { useMemo, useRef, useState } from 'react';
import withValidators from './hoc/withValidators';
import Input from './components/form-components/Input/Input';
import { FormValidationProvider } from './providers/FormValidationProvider';
import SubmitButton from './components/form-components/SubmitButton/SubmitButton';
import Paper from './components/this-app-components/Paper/Paper';
import All from './components/test-components/policies/All';
import First from './components/test-components/policies/First';
import None from './components/test-components/policies/None';
import Blur from './components/test-components/validate-on/Blur';
import Change from './components/test-components/validate-on/Change';
import Both from './components/test-components/validate-on/Both';
import CheckboxWithValidators from './components/test-components/with-default-validation/CheckboxWithValidators';
import RadioGroupWithValidators from './components/test-components/with-default-validation/RadioGroupWithValidators';
import WithoutValidators from './components/test-components/WithoutValidators';

function App() {
  const [inputValue, setInputValue] = useState<string>('abc');
  const [dependantInput, setDependantInput] = useState<string>('abc');
  const DependantInput = useMemo(() => withValidators(Input, [{ isValid: (value) => value !== inputValue, message: 'el valor debe ser distinto del valor de Input A ' }], { validateOn: 'both', showMessagePolicy: 'all' }), [inputValue]);

  const handleOnChange = (e: any) => {
    console.log({ value: e.target.value });
  };
  const handleDependantOnChange = (e: any) => {
    setDependantInput(e.target.value);
  };
  const handleOnBlur = (e: any) => {
    console.log({ value: e.target.value });
  };

  return (
    <div>
      <FormValidationProvider className="form-provider" contextName="form-text-inputs">
        <Paper title="with Validator options">
          <Paper title="Policies (show all errors, first error or none)">
            <All label="All" name="hoc-all" placeholder="All" onChange={handleOnChange} />
            <First label="First Message" name="hoc-first" defaultValue="ab" onChange={handleOnChange} />
            <None label="No Messages" name="hoc-none" defaultValue="ab" onChange={handleOnChange} />
          </Paper>
          <Paper title="INFO">
            <WithoutValidators label="Info" name="hoc-info-required" showInfoMessage infoMessages={['This is required', 'second message']} required onChange={handleOnChange} />
          </Paper>
          <Paper title="When to show errors">
            <Blur label="show on Blur" name="hoc-blur" defaultValue="ab" onChange={handleOnChange} />
            <Change label="show on Change" name="hoc-change" defaultValue="ab" onChange={handleOnChange} />
            <Both label="on blur and on change" name="hoc-both" defaultValue="ab" onChange={handleOnChange} />
          </Paper>
          <Paper title="Validation depends on other input value">
            <Input label="Input A" name="plain-input" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <DependantInput label="Input dependiente de A" name="input-dependiente" value={dependantInput} onChange={handleDependantOnChange} />
          </Paper>
          <Paper title="Attribute validators">
            <WithoutValidators label="required" name="hoc-required" required onChange={handleOnChange} />
            <WithoutValidators label="Max length" name="hoc-max" maxLength={1} defaultValue="ab" onChange={handleOnChange} />
            <WithoutValidators label="Min length" name="hoc-min" minLength={2} defaultValue="a" onChange={handleOnChange} />
            <WithoutValidators label="Min length & MaxLength" name="hoc-min-max" minLength={2} maxLength={4} defaultValue="a" onChange={handleOnChange} />
            <WithoutValidators label="Exact length" name="hoc-exact" minLength={1} maxLength={1} defaultValue="ab" onChange={handleOnChange} />
            <WithoutValidators label="Pattern (phone)" name="hoc-pattern" defaultValue="ab" pattern={/^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/} onChange={handleOnChange} />
          </Paper>
          <Paper title="Checkbox & RadioGroup">
            <CheckboxWithValidators
              label="Checkbox 1"
              name="hoc-checkbox"
              required
              checked
              onChange={handleOnChange}
            />
            <RadioGroupWithValidators
              label="Radio Group"
              name="hoc-radio"
              required
              onChange={handleOnChange}
              radioOptions={[
                { id: '1', label: 'option 1', value: { a: 'a' } },
                { id: '2', label: 'option 2', value: { a: 'b' } },
                { id: '3', label: 'option 3', value: { a: 'c' } },
              ]}
            />
          </Paper>
        </Paper>
        <SubmitButton />
      </FormValidationProvider>
    </div>
  );
}

export default App;
