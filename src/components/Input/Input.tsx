import { ChangeEvent, FocusEvent } from "react"
import { InputProps} from "../../types/common"

export function Input(props: InputProps) : any {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if(props.onChange) {
            props.onChange(e, e.target.value)
        }
    }
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        if(props.onBlur) {
            props.onBlur(e, e.target.value)
        }
    }
    return (
        <label>
            {props.label}
            <input {...props} onChange={handleChange} onBlur={handleBlur}/>
        </label>
    )
}