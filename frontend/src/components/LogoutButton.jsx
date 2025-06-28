import { Button } from '@chakra-ui/react'
import { useSetRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast';
import { HiLogout } from "react-icons/hi";

const LogoutButton = () => {
    const setUser = useSetRecoilState(userAtom);
    const showToast = useShowToast();

    const handleLogout = async() => {
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
            showToast("Error", error, "error");
        }
    };
    return (
        <Button
            position={"fixed"}
            top={"30px"}
            right={"30px"}
            size={"sm"}
            onClick={handleLogout}
        >
            <HiLogout size={20} />
        </Button>
    )
}

export default LogoutButton;