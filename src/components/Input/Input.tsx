import React, { ChangeEvent, FocusEvent} from 'react';
import { InputProps } from '../../types/common';
import './input.scss';

export function Input(props: InputProps): any {
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

  const {showError, errorMessages, label, ...rest} = props;
  
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
