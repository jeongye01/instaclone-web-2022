import { BrowserRouter , Switch, Route } from "react-router-dom";
import { useState,useEffect } from 'react';
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import {authService} from "./fbase";
function Router() {
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [init,setInit]=useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        setIsLoggedIn(true);
      }else{
        setIsLoggedIn(false);
      }
      setInit(true);
    })
  },[]);
  return (
      <BrowserRouter>
        <Switch>
          {init?
          <Route path="/" exact>
            {isLoggedIn ?  <Home />: <Login />}
          </Route>
          :<h1>Initializing...</h1>}
          {!isLoggedIn ? (
            <Route path="/sign-up" exact>
            <SignUp />
            </Route>
          ):null}
          
          <Route>
            <div>Not Found</div>
          </Route>
        </Switch>
      </BrowserRouter>
  
  );
}
export default Router;