// import React from 'react'
import { useRecoilValue } from 'recoil';
import LoginCard from '../components/LoginCard'
import SignupCard from '../components/Signupcard'
import authScreenAtom from '../atoms/authAtoms';
// import { useState } from 'react';

const AuthPage = () => {
    
    const authScreenState = useRecoilValue(authScreenAtom);
    // const [value ,setValue] = useState("login");
    // useSetRecoilState(authScreenAtom);
    console.log(authScreenState);
  return (
    <>
    {authScreenState === "login" ? <LoginCard/> : <SignupCard/>}
    </>
  );
}

export default AuthPage;