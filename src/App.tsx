import { useRoutes, useNavigate } from 'react-router-dom';
import router from 'src/router';

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

import { CssBaseline } from '@mui/material';
import ThemeProvider from './theme/ThemeProvider';

import { Provider, useDispatch } from 'react-redux';
import { persistor, store } from './store';

import React, {useState, useEffect} from 'react';
import setAuthToken from './api/setAuthToken';

import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const content = useRoutes(router);
  const navigate: any = useNavigate()
  
  useEffect(() => {
    // check for token in LS when app first runs
    if (localStorage.token) {
      // if there is a token set axios headers for all requests
      setAuthToken(localStorage.token);
    } else {
      navigate('/')
    }
  }, []);

  return (
    <React.StrictMode>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <CssBaseline />
              {content}
            </LocalizationProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </React.StrictMode>
  );
}
export default App;
