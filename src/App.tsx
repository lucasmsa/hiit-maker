import React from 'react';
import Routes from './routes';
import GlobalStyle from './styles/global';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <>
      <div>
        <Toaster />
      </div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
      <GlobalStyle />
    </>
  );
}

export default App;
