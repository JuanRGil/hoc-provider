import withValidators from '../../../hoc/withValidators';
import { ValidableProps } from '../../../types/common';
import { containsA, containsB } from '../../../utils/validators';
import Input from '../../form-components/Input/Input';

function First(props: ValidableProps & {value?: string}) : any {
  return (
    <Input {...props} />
  );
}
First.defaultProps = {
  value: '',
};
export default withValidators(First, [containsA, containsB], { showMessagePolicy: 'first' });
