import {
  ChangeEvent, ComponentType, FocusEvent, InputHTMLAttributes,
} from 'react';

export type OnChangeFunction = (e: ChangeEvent<HTMLInputElement>, value?: any)=> void
export type OnBlurFunction = (e: FocusEvent<HTMLInputElement>, value?: any)=> void

declare interface PropsForValidation {
    name: string; // required
    label: string;
    errorMessages?: string[];
    showError?: boolean;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    readOnly?: boolean
}
declare interface WithOnBlurRequired {
    onBlur: OnBlurFunction;
    onChange?: OnChangeFunction;
}
declare interface WithOnChangeRequired{
    onBlur?: OnBlurFunction;
    onChange: OnChangeFunction;
}

export type ValidableProps = (WithOnBlurRequired | WithOnChangeRequired) & PropsForValidation;
export type Omit<T, K extends string> = Pick<T, Exclude<keyof T, K>>;

export type ValidableType = ComponentType<ValidableProps>;

export type ValidatorType = {isValid: (value: any) => boolean, message: string};
