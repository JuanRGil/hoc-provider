import { withValidators } from "../../hoc/withValidators"
import { InputProps} from "../../types/common"
import { phoneValidator } from "../../utils/validators"
import { Input } from "../Input/Input"

function PhoneInput(props: InputProps) : any {
    return (
        <Input label={props.label} type="tel" name={props.name} onBlur={props.onBlur} onChange={props.onChange} />
    )
}

export default withValidators(PhoneInput, [phoneValidator], 'all')