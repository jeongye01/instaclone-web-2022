import styled from "styled-components";
import React from "react";
import Box from "./Box";
const Container=styled(Box)`
  margin-bottom:10px;
  padding:40px;
  img{
    width:100%;
    height:80px;
    margin-bottom:20px; 
   
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