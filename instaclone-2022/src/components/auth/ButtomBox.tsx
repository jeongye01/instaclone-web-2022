import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { BaseBox } from '../shared';
import PropTypes from "prop-types";
const Container = styled(BaseBox)`
  padding: 20px 0px;
  text-align: center;
  a {
    font-weight: 600;
    margin-left:2px;
    color: ${props=>props.theme.accent};
  }
`;

function BottomBox({cta,link,linkText}){
  return (
    <Container>
       <span>{cta}</span>
       <Link to={link}>{linkText}</Link>
    </Container>);
}

BottomBox.propTypes={
  cta:PropTypes.string.isRequired,
  link:PropTypes.string.isRequired,
  linkText:PropTypes.string.isRequired
}
export default BottomBox;
