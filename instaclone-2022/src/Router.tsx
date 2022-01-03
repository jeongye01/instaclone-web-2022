import { BrowserRouter , Switch, Route } from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import routes from "./routes";
function Router() {
  const isLoggedIn=false;
  return (
      <BrowserRouter>
        <Switch>
          <Route path={routes.home} exact>
            isLoggedIn ?  <Home />: <Login />
          </Route>
          {!isLoggedIn ? (
            <Route path={routes.signUp} exact>
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