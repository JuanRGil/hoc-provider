import {
  ChangeEvent, ComponentClass, FocusEvent, FunctionComponent,
} from 'react';

export type OnChangeFunction = (e: ChangeEvent<HTMLInputElement>)=> void
export type OnBlurFunction = (e: FocusEvent<HTMLInputElement>)=> void

declare interface PropsForValidation {
    name: string; // required
    label: string;
    errorMessages?: string[];
    showError?: boolean;
    withValidator?: boolean;
    maxLength?: number;
    minLength?: number;
    required?: boolean;
    pattern?: RegExp;
    patternMgs?: string;
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
