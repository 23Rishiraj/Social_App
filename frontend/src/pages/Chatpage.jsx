import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import Conversation from '../components/Conversation'
import useShowToast from '../hooks/useShowToast'
import MessageContainer from '../components/MessageContainer'
import { useRecoilState, useRecoilValue } from 'recoil'
import { conversationsAtom, selectedConversationAtom } from '../atoms/messagesAtoms'
import { GiConversation } from 'react-icons/gi'
import userAtom from '../atoms/userAtom'
import { useSocket } from '../context/SocketContext'

const Chatpage = () => {
    const showToast = useShowToast()
    const [loadingConversations, setLoadingConversations] = useState(true);
    const [conversations, setConversations] = useRecoilState(conversationsAtom);
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
    const [searchConversation, setSearchConversation] = useState("");
    const [searchingUser, setSearchingUser] = useState(false);
    const currentUser=useRecoilValue(userAtom)
    const {socket,onlineUsers} = useSocket();
    console.log("conversation", conversations, "selectedConversation", selectedConversation);

    useEffect(() => {
        const getConversations = async () => {
            try {
                const res = await fetch("/api/messages/conversations");
                const data = await res.json();
                if (data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                console.log(data);
                setConversations(data);
            } catch (error) {
                showToast("Error", "error.message", "error");
                console.log(error);
            } finally {
                setLoadingConversations(false);
            }
        }
        getConversations();
    }, [showToast ,setConversations])

    const handleConversationSearch = async (e) => {
        e.preventDefault();
        setSearchingUser(true)
        if (!searchConversation) {
            showToast("Error", "Please enter a username to search", "error");
            setSearchingUser(false);
            return;
        }
        setSearchingUser(true);
        try {
            const res = await fetch(`/api/users/profile/${searchConversation}`);
            const searchuser = await res.json();
            if (searchuser.error) {
                showToast("Error", searchuser.error, "error");
                setSearchingUser(false);
                return;
            }
            console.log(searchuser);
            const mesgurself = currentUser._id === searchuser._id;
            if(mesgurself) {
                showToast("Error", "You cannot start a conversation with yourself", "error");
                return;
            }
            // setConversations(searchuser);
// already in a conversation
            if(conversations.find((conversation) => conversation.participants[0]._id === searchuser._id)) {
                setSelectedConversation({
                    _id: conversations.find((conversation) => conversation.participants[0]._id === searchuser._id)._id,
                    userId: searchuser._id,
                    username: searchuser.username,
                    userProfilePic: searchuser.profilePic,
                })
                showToast("Info", "Conversation already exists", "info");
                return;
            }

            const mockConversation ={
                mock:true,
                lastMessage: {
                    text: "",
                    sender:"",
                },
                _id:Date.now(),
                participants: [{
                    _id: searchuser._id,
                    username: searchuser.username,
                    profilePic: searchuser.profilePic,
                }]
            }

            setConversations((prevConversations) => [...prevConversations, mockConversation]);
        } catch (error) {
            showToast("Error", error.message, "error");
        } finally {
            setSearchingUser(false);
        }
    }

    return (
        <Box position={"absolute"}
            left={"50%"}
            w={{
                base: "100%",
                md: "80%",
                lg: "750px",

            }}
            p={4}
            transform={"translateX(-50%)"}
        >
            <Flex
                gap={4}
                flexDirection={{
                    base: "column",
                    md: "row",
                }}
                // justifyContent={"space-between"}
                // alignItems={"center"}
                maxW={{
                    sm: "400px",
                    md: "full",
                }}
                mx={"auto"}
            >
                <Flex flex="30"
                    flexDirection={"column"}
                    gap={2}
                    maxW={{
                        sm: "250px",
                        md: "full",
                    }}
                    mx={"auto"}

                >
                    <Text fontWeight={"700"} color={useColorModeValue("gray.600", "gray.400")} >
                        Your conversations
                    </Text>
                    <form onSubmit={handleConversationSearch}> 
                        <Flex alignItems={"center"} gap={2}>
                            <Input placeholder='Search for a user' onChange={(e)=> setSearchConversation(e.target.value)} />
                            <Button size={"sm"} colorScheme='blue' ml={2} onClick={handleConversationSearch} isLoading={searchingUser} cursor={"pointer"}>
                                <SearchIcon />
                            </Button>
                        </Flex>
                    </form>

                    {loadingConversations && 
                        [0, 1, 2, 3, 4].map((_, i) => (
                            <Flex key={i}  alignItems={"center"} gap={2} mt={2} p={2} borderRadius={"md"} _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}>
                                <Box>
                                    <SkeletonCircle size='10' />
                                </Box>
                                <Flex flexDirection={"column"} gap={3} w={"full"}>
                                    <Skeleton h={"10px"} w={"80px"} />
                                    <Skeleton h={"8px"} w={"90%"} />
                                </Flex>
                            </Flex>
                        ))
                    }
                            {console.log(conversations._id,conversations)}

                    {!loadingConversations &&
                        conversations.map((conversation) => (
                            <Conversation key={conversation._id} 
                            isOnline={onlineUsers.includes(conversation.participants[0]._id)}
                            conversation={conversation} />
                        ))
                    }
                </Flex>
                {!selectedConversation._id && (
                    <Flex
                        flex={0}
                        borderRadius={"md"}
                        p={2}
                        flexDir={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        height={"400px"}
                    >
                        <GiConversation size={100} />
                        <Text fontSize={20}> Select a conversations</Text>
                    </Flex>
                )}
                {console.log("selectedConversation", selectedConversation._id)}
                {selectedConversation._id && <MessageContainer />}
            </Flex>
        </Box>
    )

}

export default Chatpage