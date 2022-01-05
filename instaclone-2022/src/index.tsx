import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {isDarkModeVar} from "./States";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme,GlobalStyles } from "./styles";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={isDarkModeVar?darkTheme:lightTheme}>
      <GlobalStyles/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


