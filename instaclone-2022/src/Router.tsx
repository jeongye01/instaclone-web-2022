import { BrowserRouter , Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import {isLoggedIn} from "./States";

function Router() {
  return (
      <BrowserRouter>
        <Switch>
          <Route path="/" exact>
            isLoggedIn ?  <Home />: <Login />
          </Route>
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