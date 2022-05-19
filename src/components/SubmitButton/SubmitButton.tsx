import { useFormContext } from "../../providers/FormValidationProvider";

export  function SubmitButton(){
    const {isFormValid, scrollToFirstNotValidField} = useFormContext();
    const handleOnClick = () => {
        if(isFormValid){
            console.log('proceed');
        } else {
            scrollToFirstNotValidField();
            console.log('stop')
        }
    }
    return (
        <button type="submit" onClick={handleOnClick}>Submit</button>
    )
}