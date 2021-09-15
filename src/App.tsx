import React from 'react';
import Routes from './routes'
import GlobalStyle from './styles/global'
import { BrowserRouter } from 'react-router-dom'
import TrainingContext from './context/TrainingContext'

function App() {
  return (
    <>
      <TrainingContext.Provider value={{
        training: {
          trainSetLoops: [],
          afflictedAreas: [],
          totalTrainingTime: 0
        }
      }} >
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </TrainingContext.Provider>
      <GlobalStyle />
    </>
  );
}

export default App;
