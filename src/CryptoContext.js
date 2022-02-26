import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import React, { 
  createContext, 
  useContext,
  useEffect,
  useState } from 'react';
import { CoinList } from './config/api';
import { auth } from './Firebase';

const crypto = createContext();

const CryptoContext = ({children}) => {
  const [currency, setCurrency] = useState("USD");
  const [symbol, setsymbol] = useState("$");
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    type: "success"
  })

  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) setUser(user);
      else setUser(null)
    })
  }, [])
  console.log('user', user);

  const fetchCoins = async () => {
    setLoading(true)
    const { data } = await axios.get(CoinList(currency));
    setCoins(data);
    setLoading(false)
  }
  console.log(coins)

  useEffect(() => {
    if (currency === "USD") setsymbol("$") 
    else if (currency === "CAD" ) setsymbol("C$")
  }, [currency])

  return (
    <crypto.Provider 
    value={{
      currency, 
      symbol, 
      setCurrency, 
      coins, 
      loading, 
      fetchCoins,
      alert,
      setAlert,
      user}}>   
      {children}
    </crypto.Provider>
  )
};

export default CryptoContext;

export const CryptoState = () => {
  return useContext(crypto)
}
