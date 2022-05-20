import {
  ChangeEvent, FocusEvent, InputHTMLAttributes, useRef,
} from 'react';
import { ValidableProps } from '../../../types/common';

function Input(props: ValidableProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange'>): any {
  const inputElement = useRef<HTMLInputElement>(null);
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
    <div className="input-container">
      <input
        type="text"
        {...rest}
        id={rest.name}
        ref={inputElement}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <label htmlFor={rest.name} className={`${inputElement?.current?.type} ${inputElement?.current?.value ? 'not-empty' : ''}`.trim()}>
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
export default Input;
