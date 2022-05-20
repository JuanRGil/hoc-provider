import { InputProps } from '../../../../types/common';
import Input from '../Input';

function CheckBox(props: InputProps) : any {
  const handleOnBlur = (e: any) => {
    if (props.onBlur) {
      props.onBlur(e, e.target.checked);
    }
  };
  return (
    <Input {...props} type="checkbox" onBlur={handleOnBlur} />
  );
}

export default CheckBox;
