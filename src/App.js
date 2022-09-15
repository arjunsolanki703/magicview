import React from 'react';
import RoutesComp from './routes';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <>
      <HelmetProvider>
        <RoutesComp />
      </HelmetProvider>
    </>
  );
}

export default App;
