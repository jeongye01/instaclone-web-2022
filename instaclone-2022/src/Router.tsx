import { BrowserRouter , Switch, Route } from "react-router-dom";
import { useState,useEffect } from 'react';
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import {authService} from "./fbase";
import useUser from "./redux/Auth/userHooks";

function Router() {
  console.log(789789);
  const {isLoggedIn,login,logout}=useUser();
  const [init,setInit]=useState(false);
  useEffect(()=>{
    authService.onAuthStateChanged((user)=>{
      if(user){
        //login(true);
      }else{
        logout();
      }
      setInit(true);
    })
  },[]);
  return (
      <BrowserRouter>
        <Switch>
          {init?
          <Route path={["/","/select"]} exact>
            {isLoggedIn ?  <Home />: <Login />}
          </Route>
          :<h1>Initializing...</h1>}
          {!isLoggedIn ? (
            <Route path="/sign-up" exact>
            <SignUp />
            </Route>
          ):null}
          <Route path="/create/select" exact>
            <Home />
            </Route>
         
          <Route path="/create/details" exact>
            <Home/>
          </Route>
          <Route>
            <div>Not Found</div>
          </Route>
        </Switch>
      </BrowserRouter>
  
  );
}
export default Router;