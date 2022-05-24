import withValidators from '../../../hoc/withValidators';
import { ValidableProps } from '../../../types/common';
import { containsA, containsB } from '../../../utils/validators';
import Input from '../../form-components/Input/Input';

function Both(props: ValidableProps & {value?: string}) : any {
  return (
    <Input {...props} />
  );
}
Both.defaultProps = {
  value: '',
};
export default withValidators(Both, [containsA, containsB], { validateOn: 'both' });