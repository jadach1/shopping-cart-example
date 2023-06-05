import React, { useState } from "react";

export const FormValidationContext = React.createContext({
  signal: {},
  updateSignal: () => {},
});

/*THIS COMPONENT WILL LISTEN AND SEND A SIGNAL WHENEVER 
A USER CLICKS OUTSIDE OF A DESIRED ELEMENT */

const FormValidationContextProvider = (props) => {
  const [signal, setSignal] = useState({});

  const updateSignal = () => {
    setSignal({});
  };

  const validationContext = {
    signal: signal,
    updateSignal: updateSignal,
  };

  return (
    <FormValidationContext.Provider value={validationContext}>
      {props.children}
    </FormValidationContext.Provider>
  );
};

export default FormValidationContextProvider;
