import React from 'react';
import styled,{ThemeProvider} from "styled-components";
import { ourTheme } from './styles';
interface IContainerProps{
  floating:boolean;
}
const Container=styled.div<IContainerProps>`
   
`;

function App() {
  return (
    <ThemeProvider theme={ourTheme}>
      <Container floating={true}>App</Container>
    </ThemeProvider>
  );
}

export default App;
