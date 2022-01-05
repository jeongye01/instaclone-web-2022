import React, {useState} from "react";
import {useForm,SubmitHandler } from "react-hook-form";
import {authService} from "../fbase";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { faFacebookSquare } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import AuthLayout from '../components/Auth/AuthLayout';
import TopBox from '../components/Auth/TopBox';
import BottomBox,{BottomLink} from '../components/Auth/BottomBox';
import Separator from '../components/Auth/Separator';

const JoinMessage=styled.div`
   margin-top:10px;
   opacity:0.5;
   font-weight:600;
   text-align:center;
   width:80%;
   font-size:17px;
`;
const FBLogin=styled.button`
  all:unset;
  cursor:pointer;
  margin-top:20px;
  color:white;
  width:280px;
  height:35px;
  text-align:center;
  font-weight:600;
  border-radius:5px;
  background-color: ${(props)=>props.theme.authBtnColor};
`;
interface IForm{
  email:string;
  name:string;
  username:string;
  password:string;
  }
  //createUserWithEmailAndPassword 
function SignUp(){
  const {register,handleSubmit,formState: { errors }}=useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = async (data) =>{ 
    const {email,password}=data;
    console.log(email,password);
    try{
      await authService.createUserWithEmailAndPassword(email,password);
      console.log("계정 생성됨");
    }catch(error){
      console.log(error);
    }
  
  };
   return (
    <AuthLayout>
        <TopBox>
        

        <Link to="/"><img alt="logo" src="img/instagram_logo.png" /></Link>
        <JoinMessage><span>친구들의 사진과 동영상을 보려면<br/> 가입하세요.</span></JoinMessage>
        <FBLogin> <FontAwesomeIcon icon={faFacebookSquare} />  Facebook으로 로그인</FBLogin>
        <Separator />
         <form onSubmit={handleSubmit(onSubmit)}>
           <input {...register("email",{required:true})} placeholder="이메일" type="email" />
           <input {...register("name", {required:true})} placeholder="성명" type="text" />
           <input {...register("username", {required:true})} placeholder="사용자 이름" type="text" />
           <input  {...register("password", {required:true,minLength:6})} placeholder="비밀번호" type="password"/>
           <input type="submit" value="가입"/>
         </form>

     </TopBox>
     <BottomBox>
          <span>
            계정이 있으신가요? <BottomLink to="/sign-up">로그인</BottomLink>
          </span>
      </BottomBox>
     </AuthLayout>
   );
}

export default SignUp;
