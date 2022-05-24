import withValidators from '../../../hoc/withValidators';
import { ValidableProps } from '../../../types/common';
import { containsA, containsB } from '../../../utils/validators';
import Input from '../../form-components/Input/Input';

function Blur(props: ValidableProps & {value?: string}) : any {
  return (
    <Input {...props} />
  );
}
Blur.defaultProps = {
  value: '',
};
export default withValidators(Blur, [containsA, containsB], { validateOn: 'onBlur' });
