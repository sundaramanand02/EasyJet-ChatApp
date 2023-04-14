import React, { useState,useContext } from 'react'
import './Login.css'
import { auth } from './firebase';
import  {createUserWithEmailAndPassword}  from "firebase/auth";
import { LoginContext } from './LoginContext';
import { Link } from 'react-router-dom';

const Register = () => {
    const { setuserLogin }=useContext(LoginContext);
    const {setuserName}=useContext(LoginContext);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const signUp = () => {
        console.log(email,password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                const uname=email.substring(0,[email.length-10]);
                setuserLogin(true);
                setuserName(uname);
                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }
  return (
    <div className="login">
        <div className="form">
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" id='email' name='email' placeholder='enter your email here' value={email}
                onChange={(e)=>setemail(e.target.value)}/>
            </div>
            <div>
            <label htmlFor="password">Password</label>
                <input type="password" id='password' name='password' placeholder='enter your password here' value={password}
                onChange={(e)=>setpassword(e.target.value)}/>
            </div>
            <button id='submit-btn' onClick={signUp}>
                Sign Up
            </button>
            <p>Already have an account?</p>
            <Link to='/login'><span>Sign In</span></Link>
        </div>
    </div>
  )
}

export default Register