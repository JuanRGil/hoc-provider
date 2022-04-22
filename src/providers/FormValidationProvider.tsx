import {createContext, useContext, useState} from 'react';

export const FormContext = createContext({isFormValid: false, setIsFormValid: (isValid: boolean) => console.log('not setted') });

export const useFormContext = () => useContext(FormContext);

export const FormValidationProvider = (props: { children: any }) => {
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  return (
    <FormContext.Provider value={{isFormValid, setIsFormValid}}>
      {props.children}
    </FormContext.Provider>
  );
};