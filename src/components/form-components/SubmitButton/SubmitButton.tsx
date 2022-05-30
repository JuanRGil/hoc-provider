import PropTypes from 'prop-types';
import { useFormContext } from '../../../providers/FormValidationProvider';

function SubmitButton(props: {label?: string; onSubmit: () => void}) {
  const { canSubmit } = useFormContext();
  const { onSubmit, label } = props;
  const handleOnClick = () => {
    if (canSubmit()) {
      onSubmit();
    } else {
      console.warn('The form cant be submitted until all field are valid!');
    }
  };
  return (
    <button type="submit" onClick={handleOnClick}>{label}</button>
  );
}
SubmitButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  label: PropTypes.string,
};
SubmitButton.defaultProps = {
  label: 'Submit',
};
export default SubmitButton;
