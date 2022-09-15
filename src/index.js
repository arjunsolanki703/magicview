import React from 'react';
import ReactDOM from 'react-dom';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import customTheme from './utils/ExtendTheme';
import App from './App';
import { Provider } from 'react-redux';
import store from './store';
import '@fontsource/raleway/400.css';
import '@fontsource/open-sans/700.css';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ColorModeScript />
      <ChakraProvider theme={customTheme}>
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
