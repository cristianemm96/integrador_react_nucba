import { Routes as ReactDomRoutes, Route } from "react-router-dom";
import { LogIn } from "../Components/Session/LogIn";
import { Main } from "../Components/Main/Main";
import { SignUp } from "../Components/Session/SignUp";
import { FullCart } from "../Components/Header/cart/FullCart/FullCart";
import { UserAccount } from "../Components/Session/UserAccount";
import { PageNotFound } from "../Components/Main/NotFound/PageNotFound"
import { ProtectedRoute } from "./ProtectedRoute";
import { useSelector } from "react-redux";



export const RoutesComp = () => {
  const user = useSelector(state => state.user.user)
  let currentEmail = null
  let currentId = null
  if(user){
    currentEmail = user.user.email
    currentId = user.user.uid
  }
  
  
  return (
    <ReactDomRoutes>
      <Route path="/" element={<Main />} />
      <Route path={"/login"} element={currentEmail ? <UserAccount /> : <LogIn />} />
      <Route path="/signup" element={currentEmail ? <UserAccount /> : <SignUp />} />
      <Route
        path="/fullcart"
        element={
          <ProtectedRoute user={currentEmail} redirectTo="/login">
            <FullCart id={currentId}/>
          </ProtectedRoute>
        }
      />
      <Route
        path="/account"
        element={
          <ProtectedRoute user={currentEmail} redirectTo="/login">
            <UserAccount id={currentId}/>
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<PageNotFound/>}/>
    </ReactDomRoutes>
  );
};
