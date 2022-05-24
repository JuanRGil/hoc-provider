import withValidators from '../../../hoc/withValidators';
import { ValidableProps } from '../../../types/common';
import { containsA, containsB } from '../../../utils/validators';
import Input from '../../form-components/Input/Input';

function All(props: ValidableProps & {value?: string}) : any {
  return (
    <Input {...props} />
  );
}
All.defaultProps = {
  value: '',
};

export default withValidators(All, [containsA, containsB], { showMessagePolicy: 'all' });
