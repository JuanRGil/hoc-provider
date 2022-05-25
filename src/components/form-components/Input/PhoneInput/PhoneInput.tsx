import { InputProps, ValidableProps } from '../../../../types/common';
import Input from '../Input';

function PhoneInput(props: ValidableProps & InputProps) : any {
  const handleOnBlur = (e: any) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  return (
    <Input {...props} type="tel" onBlur={handleOnBlur} />
  );
}

export default PhoneInput;
