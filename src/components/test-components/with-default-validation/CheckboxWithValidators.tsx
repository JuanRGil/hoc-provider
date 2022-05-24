import withValidators from '../../../hoc/withValidators';
import { isRequiredValidator } from '../../../utils/intrinsicValidators';
import CheckBox from '../../form-components/Input/CheckBox/CheckBox';

export default withValidators(CheckBox, [isRequiredValidator]);
