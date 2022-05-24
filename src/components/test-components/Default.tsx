import withValidators from '../../hoc/withValidators';
import { ValidableProps } from '../../types/common';
import { containsA, containsB } from '../../utils/validators';
import Input from '../form-components/Input/Input';

function Default(props: ValidableProps & {defaultValue?: string}) : any {
  return (
    <Input {...props} />
  );
}
Default.defaultProps = {
  defaultValue: undefined,
};
export default withValidators(Default, [containsA, containsB]);
