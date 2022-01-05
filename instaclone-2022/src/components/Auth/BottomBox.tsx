import styled from "styled-components";
import React from "react";
import Box from "./Box";
import {Link} from "react-router-dom";
const Container=styled(Box)``;
export const BottomLink=styled(Link)`
  color:${(props)=>props.theme.authBtnColor};
  font-weight:600;
`;
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