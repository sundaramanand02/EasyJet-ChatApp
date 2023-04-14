import React, { useState,useContext } from 'react'
import './Login.css'
import { auth } from './firebase';
import  {signInWithEmailAndPassword }  from "firebase/auth";
import { LoginContext } from './LoginContext';
import { Link } from 'react-router-dom';

const Login = () => {
    const { setuserLogin ,setuserName}=useContext(LoginContext);
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
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
            <button id='submit-btn' onClick={signIn}>
                Sign In
            </button> 
            
            <p>Don't have an account?</p>
            <Link to='/'><span>Sign Up</span></Link>
        </div>
    </div>
  )
}

export default Login