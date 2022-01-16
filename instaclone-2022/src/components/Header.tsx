import {useState} from "react";
import {faPlusSquare,faTimesCircle} from "@fortawesome/free-regular-svg-icons"
import { faCompass, faUser } from "@fortawesome/free-regular-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import useUser from "../redux/Auth/userHooks";
import {Link,useHistory} from "react-router-dom";

const SHeader = styled.header`
  width: 100%;
  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  background-color: ${(props) => props.theme.boxColor};
  padding: 5px 0px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  max-width: 930px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Column = styled.div``;

const Icon = styled.button`
  all:unset;
  margin-left: 15px;
  font-size:22px;
  cursor:pointer;
`;

function Header() {
  const {isLoggedIn}=useUser();
  const history=useHistory();

  return (
    <SHeader>
      <Wrapper>
        <Column>
           <Link to="/"><img alt="logo" src="img/instagram_logo.png" width="120px" height="50px" /></Link>
        </Column>
        <Column>
          {isLoggedIn ? (
            <>
              <Icon>
                <FontAwesomeIcon icon={faHome} />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faCompass} />
              </Icon>
              <Icon onClick={()=>{history.push("/create/select")}}>
                <FontAwesomeIcon icon={faPlusSquare}  />
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faUser} />
              </Icon>
            </>
          ) : null}
        </Column>
      </Wrapper>
    </SHeader>
  );
}
export default Header;