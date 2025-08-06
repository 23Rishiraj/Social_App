import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { io } from "socket.io-client";
import userAtom from "../atoms/userAtom";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({children}) =>{
    const [socket, setSocket] = useState(null);
    const user =useRecoilValue(userAtom);
    const [onlineUsers, setOnlineUsers] = useState([]);

    useEffect(()=>{
        const socket = io("https://social-app-backend-mvwm.onrender.com", {
            query:{
               userId: user._id,
                // username: user.username,
                // userProfilePic: user.profilePic,
                // token: user.token,

            }
        });
        setSocket(socket);

        socket.on("getOnlineUser", (users) => {
            setOnlineUsers(users);
        });
        return () => {
            socket && socket.close();
        };
    },[user?._id])
    console.log("Online Users:", onlineUsers);
    return (
        <SocketContext.Provider value={{socket,onlineUsers}}>
            {children}
        </SocketContext.Provider>
    );
}
