import { useFormContext } from "../../providers/FormValidationProvider";

export  function SubmitButton(){
    const {isFormValid} = useFormContext();
    return (
        <button type="submit" disabled={!isFormValid}>Submit</button>
    )
}