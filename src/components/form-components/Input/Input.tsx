import {
  ChangeEvent, FocusEvent, InputHTMLAttributes, useState,
} from 'react';
import { ValidableProps } from '../../../types/common';

function Input(props: ValidableProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange'>): any {
  const [value, setValue] = useState<string | number | readonly string[] | undefined>();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (props.onChange) {
      props.onChange(e);
    }
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const {
    showError, errorMessages, label, ...rest
  } = props;

  return (
    <div className="input-container">
      <input
        value={value}
        {...rest}
        id={rest.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label htmlFor={rest.name} className={`${rest.type} ${value ? 'not-empty' : ''}`.trim()}>
        {label}
      </label>
      {showError && errorMessages && (
        <ul>
          {errorMessages?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </div>

  );
}

Input.defaultProps = {
  type: 'text',
};
export default Input;
