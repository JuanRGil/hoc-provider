import PropTypes from 'prop-types';
import { ValidableProps } from '../../../../types/common';
import Input from '../Input';

function RadioElement(props: ValidableProps) : any {
  return (
    <Input {...props} type="radio" />
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
