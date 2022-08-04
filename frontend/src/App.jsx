import HomePage from "./components/HomePage/HomePage";
import AxiosContext from "./components/AxiosContext";
import axios from "axios";
import { useState, useEffect } from 'react';

function App() {
  const [token, setToken] = useState('')
  const [tokenAvailable, setTokenAvailable] = useState(false)

  const TokenInstance = axios.create({
    headers: {
      'Authorization': 'Token ' + token
    }
  });

  useEffect(() => {
    axios.post('/api/login/').then(
      (response) => {
        setToken(response.data.token);
        setTokenAvailable(true);
        window.addEventListener("beforeunload", (e) => {
          TokenInstance.post('/api/logout/', {}, {
            headers: {
              'Authorization': 'Token ' + response.data.token
            }
          })
        }
        )
      });
  }, [])

  return (
    <AxiosContext.Provider value={{
      TokenInstance,
      setToken,
      tokenAvailable
    }}>
      <div className="bg-l-green min-h-screen w-screen">
        <HomePage />
      </div>
    </AxiosContext.Provider>
  );
}

export default App;
