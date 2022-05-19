import {
  ChangeEvent, ComponentType, FocusEvent, InputHTMLAttributes,
} from 'react';

export type OnChangeFunction = (e: ChangeEvent<HTMLInputElement>, value?: any)=> void
export type OnBlurFunction = (e: FocusEvent<HTMLInputElement>, value?: any)=> void

declare interface CustomInput extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange'> {
    name: string; // required
    label: string;
    errorMessages?: string[];
    showError?: boolean;
}
declare interface InputWithOnBlurRequired extends CustomInput {
    onBlur: OnBlurFunction;
    onChange?: OnChangeFunction;
}
declare interface InputWithOnChangeRequired extends CustomInput {
    onBlur?: OnBlurFunction;
    onChange: OnChangeFunction;
}

export type InputProps = InputWithOnBlurRequired | InputWithOnChangeRequired;
export type InputType = ComponentType<InputProps>;
export type ValidatorType = {isValid: (value: any) => boolean, message: string};
