import React from 'react';
import { MainProvider } from './context/MainContext';
import Routes from './routes';

const App = () => {
  return (
    <MainProvider>
      <Routes />
    </MainProvider>
  );
};

export default App;
