import React, { 
  createContext, 
  useContext,
  useEffect,
  useState } from 'react';

const crypto = createContext();

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setsymbol] = useState("$");

  useEffect(() => {
    if (currency === "USD") setsymbol("$") 
    else if (currency === "CAD" ) setsymbol("C$")
  }, [currency])
  return (
    <crypto.Provider value={{currency, symbol, setCurrency}}>   
      {children}
    </crypto.Provider>
  )
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(crypto)
}
