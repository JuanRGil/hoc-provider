import withValidators from '../../../hoc/withValidators';
import { containsA, containsB } from '../../../utils/validators';
import Input from '../../form-components/Input/Input';

export default withValidators(Input, [containsA, containsB], { validateOn: 'onBlur' });
