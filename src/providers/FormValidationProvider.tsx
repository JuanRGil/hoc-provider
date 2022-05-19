import {
  createContext, useContext, useEffect, useState,
} from 'react';

const useFormContextValue = (contextName: string) => {
  const [fieldsState, setFieldsStates] = useState<{[key: string]: boolean}>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const [submitTries, setSubmitTries] = useState<number>(0);

  useEffect(() => {
    const areAllFieldsValid = Object.values(fieldsState).every((fieldValue) => fieldValue === true);
    setIsFormValid(areAllFieldsValid);
  }, [fieldsState]);

  useEffect(() => {
    console.log('submit tries: ', submitTries);
  }, [submitTries]);

  const scrollToFirstNotValidField = () => {
    if (!isFormValid) {
      const keyFounded = Object.keys(fieldsState).find((key) => fieldsState[key] === false);
      const element = document.getElementById(contextName)?.querySelector(`input[name=${keyFounded}]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      } else {
        console.warn(`input element with name ${keyFounded} has not been found `);
      }
    }
  };

  const canSubmit = () => {
    if (!isFormValid) {
      scrollToFirstNotValidField();
      setSubmitTries((prevTries) => prevTries + 1);
    }
    return isFormValid;
  };

  return {
    isFormValid,
    canSubmit,
    submitTries,
    scrollToFirstNotValidField,
    setIsFormValid,
    fieldsState,
    setFieldsStates,
  };
};
export const FormContext = createContext({} as ReturnType<typeof useFormContextValue>);

export const useFormContext = () => useContext(FormContext);

export function FormValidationProvider(props:
  {
    children: any;
    contextName: string,
    className: string,
  }) {
  const { children, contextName, className } = props;
  return (
    <FormContext.Provider value={useFormContextValue(contextName)}>
      <div className={className} id={contextName}>
        {children}
      </div>
    </FormContext.Provider>
  );
}
