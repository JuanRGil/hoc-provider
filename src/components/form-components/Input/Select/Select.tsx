import PropTypes from 'prop-types';
import './select.scss';
import ReactSelect from 'react-select';
import { ChangeEvent, useState } from 'react';
import { ValidableProps } from '../../../../types/common';
import { Option } from '../types';

function Select(
  props : ValidableProps
    & {
        label: string,
        selectOptions : Option[],
        defaultSelectOption?: Option,
        placeholder?: string,
        clearable?: boolean,
        isSearchable?: boolean,
     },
) : any {
  const [
    selectedOption,
    setSelectedOption,
  ] = useState<Option | undefined>(props.defaultSelectOption);

  const handleOnChange = (value: any) => {
    setSelectedOption(value);
    const selectEvent = {
      target: {
        value,
      },
    };
    if (props.onChange) {
      props.onChange(selectEvent as unknown as ChangeEvent<HTMLInputElement>);
    }
  };

  const {
    label, name, selectOptions, showError, errorMessages, placeholder, clearable, isSearchable,
  } = props;

  return (
    <div className="radio-group">
      <label>
        {label}
        <ReactSelect
          id={name}
          name={name}
          options={selectOptions}
          value={selectedOption}
          placeholder={placeholder}
          onChange={handleOnChange}
          classNamePrefix="react-select"
          isClearable={clearable}
          isSearchable={isSearchable}
        />
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

Select.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  defaultSelectOption: PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired,
  }),
  selectOptions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    // eslint-disable-next-line react/forbid-prop-types
    value: PropTypes.any.isRequired,
  })).isRequired,

};
Select.defaultProps = {
  defaultSelectOption: undefined,
  placeholder: undefined,
  clearable: false,
  isSearchable: false,

};

export default Select;
