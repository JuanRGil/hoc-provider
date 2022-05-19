import { useFormContext } from '../../../providers/FormValidationProvider';

function SubmitButton() {
  const { isFormValid, canSubmit } = useFormContext();
  const handleOnClick = () => {
    if (canSubmit()) {
      console.log('proceed');
    } else {
      console.log('stop');
    }
  };
  return (
    <button type="submit" onClick={handleOnClick}>Submit</button>
  );
}
export default SubmitButton;
