import {createContext, useContext, useEffect, useState} from 'react';

const useFormContextValue = (contextName: string) => {
  const [fieldsState, setFieldsStates] = useState<{[key: string]: boolean}>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

  useEffect(()=> {
    console.log({context: contextName, fieldsState});
    const areAllFieldsValid = Object.values(fieldsState).every((fieldValue)=> fieldValue === true);
    setIsFormValid(areAllFieldsValid);
  }, [fieldsState])

  const scrollToFirstNotValidField = () => {
    if(!isFormValid){
      const keyFounded = Object.keys(fieldsState).find(key => fieldsState[key] === false);
      const element = document.getElementById(contextName)?.querySelector(`input[name=${keyFounded}]`);
      if(element) {
        element.scrollIntoView({ behavior: 'smooth'});
      } else {
        console.warn(`input element with name ${keyFounded} has not been found `)
      }
    }
  }

  return {
    isFormValid, 
    scrollToFirstNotValidField,
    setIsFormValid, 
    fieldsState, 
    setFieldsStates,
  }
}
export const FormContext = createContext({} as ReturnType<typeof useFormContextValue>);

export const useFormContext = () => useContext(FormContext);

export const FormValidationProvider = (props: { children: any; contextName: string, className: string }) => {
  
  const {children, contextName, className } = props;
  return (
    <FormContext.Provider value={useFormContextValue(contextName)}>
      <div className={className} id={contextName}>
        {children}
      </div>
    </FormContext.Provider>
  );
};