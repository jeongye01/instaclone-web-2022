import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {isDarkModeVar} from "./States";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme,GlobalStyles } from "./styles";
import {Provider} from "react-redux";
import {store} from "./redux/store";



ReactDOM.render(
  
  <Provider store={store}>

 <ThemeProvider theme={isDarkModeVar?darkTheme:lightTheme}>
     
        <GlobalStyles/>
        <App />
      
   
        </ThemeProvider>
  </Provider>
,
  document.getElementById('root')
);







