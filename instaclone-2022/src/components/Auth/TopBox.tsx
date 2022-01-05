import styled from "styled-components";
import React from "react";
import Box from "./Box";
const Container=styled(Box)`
  margin-bottom:10px;
  img{
    width:100%;
    height:80px;
   
  }
  form{
    margin-top:20px;
    width:80%;
    input{
    box-sizing:border-box;
    width:100%;
    height:35px;
    margin-bottom:5px;
    border-radius:5px;
    background-color:${(props)=>props.theme.bgColor};
    border:1px solid ${(props)=>props.theme.borderColor};
    padding:0px 10px ;
    &:last-child{
      margin-top:10px;
      font-weight:600;
      background-color:${(props)=>props.theme.authBtnColor};
      color:white;
      text-align:center;
      cursor:pointer;
    }
  }
`;
interface Children{
  children:React.ReactNode;
}

function TopBox(props:Children){
  return(
   <Container>
   {props.children}
   </Container>
   );
}

export default TopBox;