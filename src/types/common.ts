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
declare interface WithOnBlurRequired {
    onBlur: OnBlurFunction;
    onChange?: OnChangeFunction;
}
declare interface WithOnChangeRequired{
    onBlur?: OnBlurFunction;
    onChange: OnChangeFunction;
}

export type InputProps = (WithOnBlurRequired | WithOnChangeRequired) & CustomInput;
export type InputType = ComponentType<InputProps>;

export type ValidableProps = (WithOnBlurRequired | WithOnChangeRequired);
export type ValidableType = ComponentType<ValidableProps>;

export type ValidatorType = {isValid: (value: any) => boolean, message: string};
