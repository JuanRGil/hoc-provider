import { useState } from 'react';
import { ValidableProps } from '../../../../types/common';
import Input from '../Input';
import { InputProps } from '../types';

function CheckBox(props: ValidableProps & InputProps) : any {
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
