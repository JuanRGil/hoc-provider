import React, { ChangeEvent, FocusEvent, useState, useEffect } from 'react';
import { InputProps } from '../../types/common';

export function Input(props: InputProps): any {
  const [nativeInputProps, setNativeInputProps] = useState({ ...props });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (props.onChange) {
      props.onChange(e, e.target.value);
    }
  };
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    if (props.onBlur) {
      props.onBlur(e, e.target.value);
    }
  };
  const omitNativeInputProps = (nativeProps: string[]): InputProps => {
    const newInputProps : {[key: string]: any} = { ...nativeInputProps };
    nativeProps.forEach(
      (propToOmit) => {newInputProps[propToOmit] = undefined},
    );
    return newInputProps as InputProps;
  };
  useEffect(() => {
    setNativeInputProps(
      omitNativeInputProps([
        'maxLength',
        'minLength',
        'max',
        'min',
        'required',
      ]),
    );
  }, []);
  return (
    <label>
      {props.label}
      <input
        {...nativeInputProps}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {props.showError && props.errorMessages && (
        <ul>
          {props.errorMessages?.map((error) => (
            <li>{error}</li>
          ))}
        </ul>
      )}
    </label>
  );
}
