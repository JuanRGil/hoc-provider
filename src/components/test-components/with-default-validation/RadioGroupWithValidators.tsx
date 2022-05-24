import withValidators from '../../../hoc/withValidators';
import { isRequiredValidator } from '../../../utils/intrinsicValidators';
import RadioGroup from '../../form-components/Input/RadioGroup/RadioGroup';

export default withValidators(RadioGroup, [isRequiredValidator]);
