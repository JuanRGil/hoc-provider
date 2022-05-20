import PropTypes from 'prop-types';
import { InputProps } from '../../../../types/common';
import Input from '../Input';

function RadioElement(props: InputProps) : any {
  const handleOnBlur = (e: any) => {
    if (props.onBlur) {
      props.onBlur(e);
    }
  };
  return (
    <Input {...props} type="radio" onBlur={handleOnBlur} />
  );
}
RadioElement.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  onChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default RadioElement;
