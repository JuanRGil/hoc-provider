import { ChangeEvent, FocusEvent } from "react"
import { InputProps} from "../../types/common"

export function Input(props: InputProps) : any {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        props.onChange(e.target.value, e)
    }
    const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
        props.onBlur(e.target.value, e)
    }
    return (
        <label>
            {props.label}
            <input {...props} onChange={handleChange} onBlur={handleBlur}/>
        </label>
    )
}