import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {isLoggedIn,isDarkMode} from "./States";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./styles";

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={isDarkMode?darkTheme:lightTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);


