import styled from "styled-components";
import React from "react";

const Message=styled.span`
  font-size:10px;
  color:tomato;
`
interface messageProps{
  message?:string;
}
function FormError({message}:messageProps){
  return (message==="" || !message ? null : <Message>{message}</Message>);
}

export default FormError;
