import { InputHTMLAttributes } from 'react';
import { ValidableProps } from '../../../../types/common';
import Input from '../Input';

function CheckBox(props: ValidableProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange'>) : any {
  const handleOnBlur = (e: any) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  const handleOnChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e);
    }
  };
  return (
    <Input {...props} type="checkbox" onBlur={handleOnBlur} onChange={handleOnChange} />
  );
}

export default CheckBox;
