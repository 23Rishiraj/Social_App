import React from 'react'
import { useSetRecoilState } from 'recoil';
import userAtom from '../atoms/userAtom';
import useShowToast from './useShowToast';

const useLogout = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();

    const logout = async () => {
        try {
            //fetch
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            // console.log(data);
            
            if (data.error) {
                showToast("Error", data.error, "error");
                // return;
            }
            // console.log("helloo");
            //if no error
            setUser(null);
            localStorage.removeItem("user-threads");
            // console.log(localStorage.getItem("user-threads"));
            // navigate("/auth");
        } catch (error) {
            console.log("Logging out...");
            showToast("Error", error, "error");
            console.log("Error during logout:", error);
        }
    };
    return logout;
}

export default useLogout