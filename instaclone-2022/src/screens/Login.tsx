import React, {useState} from "react";
import { authService } from '../fbase';
import {Link} from "react-router-dom";
import styled from "styled-components";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from '../components/Auth/AuthLayout';
import TopBox from '../components/Auth/TopBox';
import BottomBox from '../components/Auth/BottomBox';


const Separator=styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  width:80%;
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
const FBLogin=styled.span`
  color:#385185;
  font-weight:600;
`;


const SignUpLink=styled(Link)`
  color:${(props)=>props.theme.authBtnColor};
  font-weight:600;
`;


function Login(){
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const onChange=(event:React.FormEvent<HTMLInputElement>)=>{
    const {
      currentTarget: { name,value },
    } = event;
    if(name==="email"){
      setEmail(value);
    }else if(name==="password"){
      setPassword(value);
    }
  };
  const onSubmit=async (event:React.FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    try{await authService.signInWithEmailAndPassword(email, password);
    }catch(error){console.log(error);}
    
  }
   return (
     <AuthLayout>
      
       <TopBox>
        
         <Link to="/"><img alt="logo" src="img/instagram_logo.png" /></Link>
        
         <form onSubmit={onSubmit}>
         
           <input onChange={onChange} value={email} placeholder="이메일" name="email" type="email" required/>
         
           <input onChange={onChange} value={password} placeholder="비밀번호" name="password" type="password" required/>
          
           <input type="submit" value="로그인"/>
         </form>
         <Separator>
          <div></div>
          <span>또는</span>
          <div></div>
         </Separator>
         <FBLogin> <FontAwesomeIcon icon={faFacebookSquare} />  Facebook으로 로그인</FBLogin>
       </TopBox>
       <BottomBox>
          <span>
            계정이 없으신가요? <SignUpLink to="/sign-up">가입하기</SignUpLink>
          </span>
       </BottomBox>
     
     </AuthLayout>
   );
}

export default Login;
