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
    required?: boolean;
    pattern?: RegExp;
    patternMgs?: string;
    maxLength?: number;
    minLength?: number;
    value?: string | number | readonly string[] | undefined;
    defaultValue?: string | number | readonly string[] | undefined;
    checked?: boolean;
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
