import React, {useState} from "react";
import {useForm,SubmitHandler } from "react-hook-form";
import {authService} from "../fbase";
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
     <div>
       <div>
         <form onSubmit={handleSubmit(onSubmit)}>
           <input {...register("email",{required:true})} placeholder="이메일" type="email" />
           <input {...register("name", {required:true})} placeholder="성명" type="text" />
           <input {...register("username", {required:true})} placeholder="사용자 이름" type="text" />
           <input  {...register("password", {required:true,minLength:6})} placeholder="비밀번호" type="password"/>
           <input type="submit" value="가입"/>
         </form>
       
       </div>
     </div>
   );
}

export default SignUp;
