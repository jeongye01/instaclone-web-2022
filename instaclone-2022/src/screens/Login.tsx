import React, {useState} from "react";
import { authService } from '../fbase';
import {Link} from "react-router-dom";
import styled from "styled-components";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from '../components/Auth/AuthLayout';
import TopBox from '../components/Auth/TopBox';
import BottomBox,{BottomLink} from '../components/Auth/BottomBox';
import Separator from '../components/Auth/Separator';
const FBLogin=styled.span`
  color:#385185;
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
         <Separator />
        
         <FBLogin> <FontAwesomeIcon icon={faFacebookSquare} />  Facebook으로 로그인</FBLogin>
       </TopBox>
       <BottomBox>
          <span>
            계정이 없으신가요? <BottomLink to="/">로그인</BottomLink>
          </span>
       </BottomBox>
     
     </AuthLayout>
   );
}

export default Login;
