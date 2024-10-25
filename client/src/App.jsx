import React from 'react';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/Routes'
import { PersistGate } from 'redux-persist/integration/react';
import './App.css'

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Toaster />
        <AppRoutes />
      </PersistGate>
    </Provider>
  );
};

export default App;
