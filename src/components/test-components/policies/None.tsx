import withValidators from '../../../hoc/withValidators';
import { ValidableProps } from '../../../types/common';
import { containsA, containsB } from '../../../utils/validators';
import Input from '../../form-components/Input/Input';

function None(props: ValidableProps & {value?: string}) : any {
  return (
    <Input {...props} />
  );
}
None.defaultProps = {
  value: '',
};
export default withValidators(None, [containsA, containsB], { showMessagePolicy: 'none' });
