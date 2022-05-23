import {
  useEffect,
  ChangeEvent, FocusEvent, InputHTMLAttributes, useRef, useState,
} from 'react';

import { ValidableProps } from '../../../types/common';

function Input(props: ValidableProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange' | 'pattern'>): any {
  const [value, setValue] = useState<string | number | readonly string[] | undefined>(props.value || '');
  const {
    showError,
    errorMessages,
    label,
    withValidator,
    maxLength,
    minLength,
    required,
    pattern,
    patternMgs,
    ...rest
  } = props;

  useEffect(() => {
    if (!withValidator && (maxLength
      || minLength
      || required
      || pattern
      || patternMgs)) {
      console.warn(`One of the props [maxLength, minLength, required, pattern, patternMgs] has been founded.
      If you want to validate this component please consider using withValidator HoC as they will have no effect on this component`);
    }
  }, []);
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

  return (
    <div className={`input-container -${rest.type}`}>
      <div className={`input-info -${rest.type}`}>
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
      </div>
      <div className="input-error">
        {showError && errorMessages && (
        <ul>
          {errorMessages?.map((error) => (
            <li key={error}>{error}</li>
          ))}
        </ul>
        )}

      </div>
    </div>

  );
}

Input.defaultProps = {
  type: 'text',
};
export default Input;
