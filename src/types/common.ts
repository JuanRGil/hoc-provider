import {
  ChangeEvent, ComponentClass, FocusEvent, FunctionComponent, InputHTMLAttributes,
} from 'react';

export type OnChangeFunction = (e: ChangeEvent<HTMLInputElement>)=> void
export type OnBlurFunction = (e: FocusEvent<HTMLInputElement>)=> void

export type ValidatorType = {isValid: (value: any) => boolean, message: string};
export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange' | 'pattern'> {
    pattern?: RegExp;
    patternMgs?: string;
}
interface PropsForValidation {
    name: string; // required
    label: string;
    errorMessages?: string[];
    showError?: boolean;
    withValidator?: boolean;
    validators?: ValidatorType[];
    required?: boolean;
    readOnly?: boolean
}
interface WithOnBlurRequired {
    onBlur: OnBlurFunction;
    onChange?: OnChangeFunction;
}
interface WithOnChangeRequired{
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

export type ValidableProps = (
    WithOnBlurRequired | WithOnChangeRequired
    ) & PropsForValidation;
export type ExtendedValidableProps = ValidableProps & {[key: string]: any| undefined};
