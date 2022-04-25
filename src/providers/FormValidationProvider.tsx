import {createContext, useContext, useEffect, useState} from 'react';

const useFormContextValue = (contextName: string) => {
  const [fieldsState, setFieldsStates] = useState<{[key: string]: boolean}>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(()=> {
    console.log({context: contextName, fieldsState});
    const areAllFieldsValid = Object.values(fieldsState).every((fieldValue)=> fieldValue === true);
    setIsFormValid(areAllFieldsValid);
  }, [fieldsState])
  return {
    isFormValid, 
    setIsFormValid, 
    fieldsState, 
    setFieldsStates,
  }
}
export const FormContext = createContext({} as ReturnType<typeof useFormContextValue>);

export const useFormContext = () => useContext(FormContext);

export const FormValidationProvider = (props: { children: any; contextName: string }) => {
  

  return (
    <FormContext.Provider value={useFormContextValue(props.contextName)}>
      {props.children}
    </FormContext.Provider>
  );
};