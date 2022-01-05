import React, {useState} from "react";
import { authService } from '../fbase';
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
         <form onSubmit={onSubmit}>
           <input onChange={onChange} value={email} placeholder="이메일" name="email" type="email" required/>
           <input onChange={onChange} value={password} placeholder="비밀번호" name="password" type="password" required/>
           <input type="submit" value="Log In"/>
         </form>
         <h1>Facebook으로 로그인</h1>
       </TopBox>
       <BottomBox>
         
       </BottomBox>
     </AuthLayout>
   );
}

export default Login;
