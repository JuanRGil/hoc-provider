import withValidators from '../../../hoc/withValidators';
import { ValidableProps } from '../../../types/common';
import { containsA, containsB } from '../../../utils/validators';
import Input from '../../form-components/Input/Input';

function Change(props: ValidableProps & {defaultValue?: string}) : any {
  return (
    <Input {...props} />
  );
}
Change.defaultProps = {
  defaultValue: undefined,
};
export default withValidators(Change, [containsA, containsB], { validateOn: 'onChange' });
