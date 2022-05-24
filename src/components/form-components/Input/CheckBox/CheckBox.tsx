import { InputHTMLAttributes, useState } from 'react';
import { ValidableProps } from '../../../../types/common';
import Input from '../Input';

function CheckBox(props: ValidableProps & Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange'>) : any {
  const [checkedValue, setCheckedValue] = useState<boolean>(props.checked || false);
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
    <Input {...props} type="checkbox" checked={checkedValue} onClick={() => setCheckedValue(!checkedValue)} onBlur={handleOnBlur} onChange={handleOnChange} />
  );
}

export default CheckBox;
