import styled from "styled-components";
import React from "react";
const Container=styled.div`
  display:flex;
  justify-content:center;
  align-items:center;
  height:100vh;
  flex-direction:column;
 

`;
const Wrapper=styled.div`
  max-width:350px;
  width:100%;
 `;

interface Children{
  children:React.ReactNode
}
function AuthLayout(props:Children){
 
   return (
   <Container>
     <Wrapper>
       {props.children}
     </Wrapper>
   </Container>
   );
}


export default AuthLayout;