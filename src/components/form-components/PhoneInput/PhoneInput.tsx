import withValidators from '../../../hoc/withValidators';
import { InputProps } from '../../../types/common';
import { phoneValidator } from '../../../utils/validators';
import Input from '../Input/Input';

function PhoneInput(props: InputProps) : any {
  const handleOnBlur = (e: any) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  return (
    <Input {...props} type="tel" onBlur={handleOnBlur} />
  );
}

export default withValidators(PhoneInput, [phoneValidator]);
