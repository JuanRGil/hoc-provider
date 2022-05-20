import { ChangeEvent, FocusEvent, InputHTMLAttributes } from 'react';
import { ValidableProps } from '../../../types/common';
import './input.scss';

function Input(props: ValidableProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange'>): any {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
    <label>
      {label}
      <input
        {...rest}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {showError && errorMessages && (
        <ul>
          {errorMessages?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
      )}
    </label>
  );
}
export default Input;
