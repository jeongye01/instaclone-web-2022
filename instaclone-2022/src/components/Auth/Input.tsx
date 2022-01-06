import styled from "styled-components";
import React from "react";


export const Input=styled.input<InputProps>`
    box-sizing:border-box;
    width:100%;
    height:35px;
    margin-bottom:5px;
    border-radius:5px;
    background-color:${(props)=>props.theme.bgColor};
    border:0.5px solid ${(props)=>props.hasError? "red" : props.theme.borderColor};
    padding:0px 10px ;
 
`;


interface InputProps {
  hasError?:boolean;
};

export const Submit=styled(Input)`


  margin-top:10px;
  font-weight:600;
  background-color:${(props)=>props.theme.authBtnColor};
  color:white;
  text-align:center;
  cursor:pointer;


`;