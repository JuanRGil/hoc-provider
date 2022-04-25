import { ChangeEvent, ComponentType, FocusEvent, InputHTMLAttributes } from "react";

export type OnChangeFunction = (value: any, e: ChangeEvent<HTMLInputElement>)=> void
export type OnBlurFunction = (value: any, e: FocusEvent<HTMLInputElement>)=> void
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'onBlur'> {
    onChange: OnChangeFunction;
    onBlur: OnBlurFunction;
    name: string //required
    label: string
}
export type InputType = ComponentType<InputProps>;
export type ValidatorType = {isValid: (value: any) => boolean, message: string};