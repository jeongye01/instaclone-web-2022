import {DefaultTheme,createGlobalStyle} from "styled-components";
import { normalize } from "styled-normalize";

export const lightTheme: DefaultTheme = {
  bgColor:"#FAFAFA",
  fontColor:"black",
  borderColor:"#CCCCCC",
  boxColor:"white",
  authBtnColor:"#1289F1",
  reactionColor:"#1289F1"
};

export const darkTheme: DefaultTheme = {
  bgColor:"black",
  fontColor:"white",
  borderColor:"white",
  boxColor:"black",
  authBtnColor:"black",
  reactionColor:"red"
};

export const GlobalStyles=createGlobalStyle`
   ${normalize}
   input {
    all:unset;
  }
  * {
    box-sizing:border-box;
  }
   body{
    background-color:${(props) => props.theme.bgColor};
    font-size:14px;
    font-family:'Open Sans', sans-serif;
    color:${(props) => props.theme.fontColor};
    }
    a {
      text-decoration: none;
    }
`;