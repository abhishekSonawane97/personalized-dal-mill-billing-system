import React, { createContext, useState } from 'react';

export const TypeContext = createContext();

const TypeProvider = ({ children }) => {
    
    const [types, setTypes] = useState("toor");


  return (
    <TypeContext.Provider value={{ types, setTypes }}>
      {children}
    </TypeContext.Provider>
  )
}

export default TypeProvider;
