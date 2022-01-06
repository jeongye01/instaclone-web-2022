import React, {useState} from "react";
import { authService,faceBookLogin } from '../fbase';
import {useForm,SubmitHandler } from "react-hook-form";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from '../components/Auth/AuthLayout';
import TopBox from '../components/Auth/TopBox';
import { Input,Submit } from '../components/Auth/Input';
import FormError from '../components/Auth/FormError';
import BottomBox,{BottomLink} from '../components/Auth/BottomBox';
import Separator from '../components/Auth/Separator';
const FBLogin=styled.button`
  all:unset;
  cursor:pointer;
  color:#385185;
  font-weight:600;
`;

interface IForm{
  email:string;
  password:string;
  }


function Login(){
  const {register,handleSubmit,formState: { errors }}=useForm<IForm>();
  const onSubmit: SubmitHandler<IForm> = async (data) =>{ 
    const {email,password}=data;
    try{await authService.signInWithEmailAndPassword(email, password);
    }catch(error){console.log(error);}
    
  }
   return (
     <AuthLayout>
      
       <TopBox>
        
         <Link to="/"><img alt="logo" src="img/instagram_logo.png" /></Link>
        
         <form onSubmit={handleSubmit(onSubmit)}>
         <FormError message={errors?.email?.message}/>
          <Input {...register("email",{required:"이메일을 입력해 주세요"})} hasError={Boolean(errors?.email?.message)} placeholder="이메일" type="email" />
         
          <FormError message={errors?.password?.message}/>
           <Input  {...register("password", {required:"비밀번호를 입력해 주세요"})} hasError={Boolean(errors?.password?.message)} placeholder="비밀번호" type="password"/>
          
           <Submit type="submit" value="로그인"/>
         </form>
         <Separator />
        
         <FBLogin onClick={faceBookLogin}> <FontAwesomeIcon icon={faFacebookSquare} />  Facebook으로 로그인</FBLogin>
       </TopBox>
       <BottomBox>
          <span>
            계정이 없으신가요? <BottomLink to="/sign-up">가입하기</BottomLink>
          </span>
       </BottomBox>
     
     </AuthLayout>
   );
}

export default Login;
