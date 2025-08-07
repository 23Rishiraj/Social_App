import { SearchIcon } from '@chakra-ui/icons'
import { Box, Button, Flex, Input, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import { use, useEffect, useState } from 'react'
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
        socket?.on("messagesSeen", ({ conversationId }) => {
            setConversations((prev) => {
                const updatedConversations = prev.map((conversation) => {
                    if (conversation._id === conversationId) {
                        return {
                            ...conversation,
                            lastMessage: {
                                ...conversation.lastMessage,
                                seen: true,
                            }
                        }
                    }
                    return conversation;
                })
                return updatedConversations;
            })
        })
    },[socket, setConversations]);

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
        <Box
            position={"absolute"}
            left={"50%"}
            w={{
                base: "100%",
                md: "90%",
                lg: "850px",
                xl: "1000px"
            }}
            p={{ base: 2, md: 6 }}
            transform={"translateX(-50%)"}
            minH={{ base: "100vh", md: "80vh" }}
            bg={useColorModeValue("gray.50", "gray.900")}
            borderRadius={{ base: "none", md: "2xl" }}
            boxShadow={{ base: "none", md: "2xl" }}
        >
            <Flex
                gap={6}
                flexDirection={{ base: "column", md: "row" }}
                maxW={{ sm: "400px", md: "full" }}
                mx={"auto"}
            >
                {/* Sidebar */}
                <Flex
                    flex="30"
                    flexDirection={"column"}
                    gap={4}
                    maxW={{ sm: "250px", md: "full" }}
                    mx={{ base: "auto", md: 0 }}
                    bg={useColorModeValue("white", "gray.800")}
                    borderRadius="xl"
                    boxShadow="md"
                    p={4}
                    minH={{ base: "auto", md: "500px" }}
                >
                    <Text fontWeight={"bold"} fontSize={{ base: "lg", md: "xl" }} color={useColorModeValue("gray.700", "gray.200")} mb={2} letterSpacing={1}>
                        Your Conversations
                    </Text>
                    <form onSubmit={handleConversationSearch} style={{ width: "100%" }}>
                        <Flex alignItems={"center"} gap={2} mb={3}>
                            <Input
                                placeholder='Search for a user'
                                onChange={(e) => setSearchConversation(e.target.value)}
                                borderRadius="full"
                                bg={useColorModeValue("gray.100", "gray.700")}
                                _focus={{ borderColor: "blue.400", bg: useColorModeValue("white", "gray.600") }}
                                boxShadow="sm"
                            />
                            <Button
                                size="sm"
                                colorScheme='blue'
                                ml={2}
                                onClick={handleConversationSearch}
                                isLoading={searchingUser}
                                cursor="pointer"
                                borderRadius="full"
                                boxShadow="sm"
                            >
                                <SearchIcon />
                            </Button>
                        </Flex>
                    </form>
                    {/* Loading skeletons */}
                    {loadingConversations &&
                        [0, 1, 2, 3, 4].map((_, i) => (
                            <Flex
                                key={i}
                                alignItems={"center"}
                                gap={2}
                                mt={2}
                                p={2}
                                borderRadius={"lg"}
                                _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
                                bg={useColorModeValue("gray.50", "gray.700")}
                                boxShadow="xs"
                                transition="all 0.2s"
                            >
                                <Box>
                                    <SkeletonCircle size='10' />
                                </Box>
                                <Flex flexDirection={"column"} gap={2} w={"full"}>
                                    <Skeleton h={"10px"} w={"80px"} />
                                    <Skeleton h={"8px"} w={"90%"} />
                                </Flex>
                            </Flex>
                        ))
                    }
                    {/* Conversation list */}
                    {!loadingConversations &&
                        conversations.map((conversation) => (
                            <Conversation
                                key={conversation._id}
                                isOnline={onlineUsers.includes(conversation.participants[0]._id)}
                                conversation={conversation}
                                selectedBg={useColorModeValue("blue.100", "gray.100")}
                                hoverBg={useColorModeValue("blue.50", "gray.600")}
                            />
                        ))
                    }
                </Flex>
                {/* Main area */}
                {!selectedConversation._id && (
                    <Flex
                        flex={1}
                        borderRadius={"2xl"}
                        p={6}
                        flexDir={"column"}
                        alignItems={"center"}
                        justifyContent={"center"}
                        minH={{ base: "250px", md: "500px" }}
                        bg={useColorModeValue("white", "gray.800")}
                        boxShadow="md"
                        transition="all 0.3s"
                    >
                        <GiConversation size={100} color={useColorModeValue("#3182ce", "#90cdf4")} />
                        <Text fontSize={{ base: 18, md: 22 }} color={useColorModeValue("gray.600", "gray.300")} mt={4} fontWeight="semibold">
                            Select a conversation
                        </Text>
                    </Flex>
                )}
                {selectedConversation._id && <MessageContainer />}
            </Flex>
        </Box>
    )

}

export default Chatpage