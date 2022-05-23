import {
  ChangeEvent, ComponentClass, ComponentType, FocusEvent, FunctionComponent,
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

interface ComponentClassWithAnyPropTypes<P> extends ComponentClass<P>{
    propTypes?: any;
}
interface FunctionComponentWithAnyPropTypes<P> extends FunctionComponent<P>{
    propTypes?: any;
}
export type CustomComponentType<P> = ComponentClassWithAnyPropTypes<P>
| FunctionComponentWithAnyPropTypes<P>;
export type ValidableProps = (WithOnBlurRequired | WithOnChangeRequired) & PropsForValidation;

export type ValidatorType = {isValid: (value: any) => boolean, message: string};
