import React, { useEffect } from 'react';
import Routes from './routes';
import GlobalStyle from './styles/global';
import toast, { Toaster, useToasterStore } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

function App() {

  const { toasts } = useToasterStore();

  const TOAST_LIMIT = 1

  useEffect(() => {
    toasts
    .filter(t => t.visible)
    .filter((_, index) => index >= TOAST_LIMIT) 
    .forEach((t) => {
      toast.dismiss(t.id);
    }); 
  }, [toasts]);

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
