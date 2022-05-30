import { InputHTMLAttributes } from 'react';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onBlur' |'onChange' | 'pattern'> {
    label?: string
    pattern?: RegExp;
    patternMgs?: string;
    showInfoMessage?: boolean;
    infoMessages?: string[];
}
export type Option = {id: string, label: string, value: unknown};
