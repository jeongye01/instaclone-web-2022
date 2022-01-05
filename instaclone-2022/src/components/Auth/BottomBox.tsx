import styled from "styled-components";
import React from "react";
import Box from "./Box";

const Container=styled(Box)``;

interface Children{
  children:React.ReactNode;
}

function BottomBox(props:Children){
   return(
   <Container>
   {props.children}
   </Container>
   );
}

export default BottomBox;