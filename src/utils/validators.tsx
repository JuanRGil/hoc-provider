export const containsA = {
    isValid: (value: string) => {
      return !value.includes("a");
    },
    message: `the field includes a!`
  }
export const containsB = {
    isValid: (value: any) => {
      return !value.includes("b");
    },
    message: `the field includes b!`
  }
  export const containsC = {
    isValid: (value: any) => {
      return !value.includes("c");
    },
    message: `the field includes c!`
  }
export const containsD = {
    isValid: (value: any) => {
      return !value.includes("d");
    },
    message: `the field includes d!`
  }

  export const phoneValidator = {
    isValid: (phone: string) => {
      return !phone || /^\+?(6\d{2}|7[1-9]\d{1})\d{6}$/.test(phone);
    },
    message: `the Phone has not a correct format!!`
  }