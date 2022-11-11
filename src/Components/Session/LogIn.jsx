import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firebase/firebase-config";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { SessionForm } from "./UserForms/SessionForm";
import {setOnUser} from '../../Redux/User/UserActions/userAction'
import { useDispatch } from "react-redux";
import './style.css'

export const LogIn = () => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const auth = getAuth(app);
  const LoginUser = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((us)=>{
        setUser(us.user.email)
        dispatch(setOnUser(us))
        navigate('/')
      }
        
      )
      .catch((res) => {
        const answ =
          res.code == "auth/user-not-found"
            ? "Usuario no encontrado"
            : "Error de sesion";
        swal({
          title: `${answ}`,
          icon: "error",
        });
      });
  };
  return (
    <div className="sessionContainer">
      <h2>Iniciar sesion</h2>
      <SessionForm
        email={email}
        password={password}
        updateEmail={setEmail}
        updatePass={setPassword}
        subFunc={LoginUser}
        valueButton={"Iniciar sesion"}
        currentUser={user}
        className="buttonSession"
      />
      <label>No tienes cuenta?</label>
      <button onClick={()=>{navigate('/signup')}} className="sessionButton">Registrarse</button>
    </div>
  );
};
