import styled from "styled-components";
import Header from "./Header";
const Main=styled.main`
  margin-top:50px;
  max-width:930px;
  width:100%;
  margin:0 auto;
`;





interface Children{
  children:React.ReactNode;
}
function Layout(props:Children){
  return(
  <>
    <Header />
    <Main>{props.children}</Main>
  </>
  );
}

export default Layout;