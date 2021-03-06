import PropTypes from 'prop-types';
import './radio-group.scss';
import { useState } from 'react';
import { ValidableProps } from '../../../../types/common';
import RadioElement from './RadioElement';
import { Option } from '../types';

function RadioGroup(
  props : ValidableProps
    & {label: string, defaultRadioOption?: Option, radioOptions : Option[]},
) : any {
  const [
    selectedOption,
    setSelectedOption,
  ] = useState<Option | undefined>(props.defaultRadioOption);
  const handleOnBlur = (e: any) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  const handleOnChange = (e: any) => {
    const { radioOptions } = props;
    const { value } = e.target;
    const selectedRadioOption = radioOptions.find((option) => option.id === value);
    setSelectedOption(selectedRadioOption);
    const radioGroupEvent = {
      ...e,
      target: {
        ...e.target,
        value: selectedRadioOption,
      },
    };
    if (props.onChange) {
      props.onChange(radioGroupEvent);
    }
  };
  const {
    label, name, radioOptions, showError, errorMessages,
  } = props;
  return (
    <div className="radio-group" onBlur={handleOnBlur}>
      <label>
        {label}
        <div className="radio-options">
          {radioOptions.map((radioOption) => (
            <RadioElement
              key={radioOption.label}
              name={name}
              label={radioOption.label}
              value={radioOption.id}
              checked={selectedOption ? radioOption.id === selectedOption.id : false}
              onChange={handleOnChange}
            />
          ))}
        </div>
        {showError && errorMessages && (
        <ul>
          {errorMessages?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        )}
      </label>

    </div>
  );
}
// {id: number | string, label: string, value: unknown};
RadioGroup.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultRadioOption: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired,
  }),
  radioOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired,
  })).isRequired,

};
RadioGroup.defaultProps = {
  defaultRadioOption: undefined,
};

export default RadioGroup;
