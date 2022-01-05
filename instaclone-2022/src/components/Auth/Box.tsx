import styled from "styled-components";
import React from "react";

const Box=styled.div`
  background-color:${(props)=>props.theme.boxColor};
  display:flex;
  justify-content:center;
  align-items:center;
  flex-direction:column;
  border:1px solid ${(props)=>props.theme.borderColor};
  padding:20px 0px;

`;

export default Box;



