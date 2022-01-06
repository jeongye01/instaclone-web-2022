import styled from "styled-components";
import React from "react";


const Container=styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  width:100%;
  margin:20px 0px;
  span{
    opacity:0.3;
    font-weight:600;
   
  }
  div{
    height:1px;
    width:40%;
    background-color: ${props=>props.theme.borderColor};
  }
  

`;

function Separator(){
   return(
   <Container>
    
     <div></div>
      <span>또는</span>
      <div></div>
       
   </Container>
   );
}


export default Separator;