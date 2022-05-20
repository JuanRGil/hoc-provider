import { InputHTMLAttributes } from 'react';
import { ValidableProps } from '../../../../types/common';
import Input from '../Input';

function CheckBox(props: ValidableProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange'>) : any {
  const handleOnBlur = (e: any) => {
    if (props.onBlur) {
      props.onBlur(e, e.target.checked);
    }
  };
  const handleOnChange = (e: any) => {
    if (props.onChange) {
      props.onChange(e, e.target.checked);
    }
  };
  return (
    <Input {...props} type="checkbox" onBlur={handleOnBlur} onChange={handleOnChange} />
  );
}

export default CheckBox;
