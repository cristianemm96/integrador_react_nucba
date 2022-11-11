import React from "react";
import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "../../Firebase/firebase-config";
import {getAuth} from 'firebase/auth'
import swal from "sweetalert";
import { SessionForm } from "./UserForms/SessionForm";
import { useNavigate } from 'react-router-dom';
import './style.css'

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const updateEmail = (value) => setEmail(`${value}`);
  const updatePassword = (value) => setPassword(`${value}`);
  const navigate = useNavigate()
  const auth = getAuth(app)
  const signUpUser = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) =>
        swal({
          title: "Usuario registrado!",
          icon: "success",
        }),
        setTimeout(()=>{navigate('/login')}, 2000)      
      )
      .catch((res) =>{
        const answ = res.code === 'auth/email-already-in-use'?'Email en uso': 'Ha ocurrido un error'
        swal({
          title: `${answ}`,
          icon: "error",
        })
    });
  };
  return (
    <div className="signUpContainer">
        <h2>Registrarse</h2>
        <SessionForm
          email={email}
          password={password}
          updateEmail={updateEmail}
          updatePass={updatePassword}
          subFunc={signUpUser}
          valueButton={'Registrar'}
        />
      </div>
  );
};
