import {
  ChangeEvent, ComponentClass, FocusEvent, FunctionComponent,
} from 'react';

export type OnChangeFunction = (e: ChangeEvent<HTMLInputElement>)=> void
export type OnBlurFunction = (e: FocusEvent<HTMLInputElement>)=> void
interface PropsForValidation {
    name: string; // required
    errorMessages?: string[];
    showError?: boolean;
    withValidator?: boolean;
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
export type ValidatorType = {isValid: (value: any) => boolean, message: string};
