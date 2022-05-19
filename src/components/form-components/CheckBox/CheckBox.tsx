import withValidators from '../../../hoc/withValidators';
import { InputProps } from '../../../types/common';
import { isRequiredValidator } from '../../../utils/intrinsicValidators';
import Input from '../Input/Input';

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

export default withValidators(CheckBox, [{ ...isRequiredValidator, message: 'Custom validator message' }]);
