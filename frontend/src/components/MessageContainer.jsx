import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import {useEffect, useState } from 'react'
import Message from '../components/Message'
import MessageInput from './MessageInput'
import useShowToast from '../hooks/useShowToast'
import { useRecoilState, useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/messagesAtoms'
import userAtom from '../atoms/userAtom'


const MessageContainer = () => {
    const showToast = useShowToast();
    const [selectedConversation ,setSelectedConversation] =useRecoilState(selectedConversationAtom);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [messages, setMessages] = useState([]);
    const currentUser = useRecoilValue(userAtom);
    console.log("message",messages,selectedConversation.user);
    useEffect(()=>{
        const getMessage = async ()=>{
            try {
                const res =await fetch(`/api/messages/${selectedConversation.userId}`);
                const data = await res.json();

                if(data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                console.log(data,"data");
                setMessages(data);
            } catch (error) {
                showToast("Error", error.message, "error");
            } finally{
                setLoadingMessages(false);
            }
        }
        getMessage();
    },[showToast,selectedConversation.userId])
    return (
        <Flex bg={useColorModeValue("gray.200", "gray.dark")}
            borderRadius={"md"}
            flexDirection={"column"}
            p={2}
            flex="70"
            // h={"400px"}
        >
            {/* msh header */}
            <Flex
                w={"full"}
                alignItems={"center"}
                gap={2}
                h={12}
            >
                <Avatar src={selectedConversation?.userProfilePic || "/zuck-avatar.png"} size={"sm"} name={selectedConversation?.username || "User"} />
                <Text display={"flex"} alignItems={"center"} >
                    {selectedConversation?.username || "User"} <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
            </Flex>

            <Divider/>

            <Flex flexDir={"column"} gap={4} my={4}
            height={"303px"}
            p={3}
            overflowY={"auto"}
            > 
            {loadingMessages &&(
                    [...Array(5)].map((_, i) => (
                        <Flex key={i} alignItems={"center"} alignSelf={i%2 === 0 ? "flex-start" :"flex-end"} gap={2} p={2} borderRadius={"md"} _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}>
                            {i%2===0 && <SkeletonCircle size={7} />}
                            <Flex flexDir={"column"} gap={1}>
                                <Skeleton h={"8px"} w={"250px"} />
                                <Skeleton h={"8px"} w={"250px"} />
                                <Skeleton h={"8px"} w={"250px"} />                                
                            </Flex>
                            {i%2!==0 && <SkeletonCircle size={7} />}
                        </Flex>
                    ))
                )
            }
            {!loadingMessages && (
                Array.isArray(messages) && messages.length > 0 ? (
                    messages.map((message, i) => (
                        <Message key={i} message={message} ownMessage={currentUser._id === message.sender} />
                    ))
                ) : (
                    <Text textAlign="center" color="gray.500" my={4}>No messages yet.</Text>
                )
            )}


            </Flex>
            <MessageInput />
        </Flex>
    )
}

export default MessageContainer