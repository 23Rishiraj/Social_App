import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import {useEffect, useRef, useState } from 'react'
import Message from '../components/Message'
import MessageInput from './MessageInput'
import useShowToast from '../hooks/useShowToast'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { conversationsAtom, selectedConversationAtom } from '../atoms/messagesAtoms.js'
import userAtom from '../atoms/userAtom'
import { useSocket } from '../context/SocketContext'


const MessageContainer = () => {
    const showToast = useShowToast();
    const selectedConversation  =useRecoilValue(selectedConversationAtom);
    const [loadingMessages, setLoadingMessages] = useState(true);
    const [messages, setMessages] = useState([]);
    const currentUser = useRecoilValue(userAtom);
    const messageEndRef = useRef(null);
    const {socket} =useSocket();
    const setConversations = useSetRecoilState(conversationsAtom);

    useEffect(()=>{
        socket.on("newMessage", (message) => {
            console.log("new message received", message);
            if(selectedConversation._id === message.conversationId) {
                setMessages((prev) => [...prev, message]);
            }

            setConversations((prev) => {
                const updatedConversations = prev.map((conversation) => {
                    if(conversation._id === message.conversationId) {
                        return {
                            ...conversation,
                            lastMessage: {
                                text: message.text,
                                sender: message.sender,
                            }
                        }
                    }
                    return conversation;
                })
                return updatedConversations;
            });
        });
        return () =>  socket.off("newMessage");
    },[socket,selectedConversation,setConversations]);


    useEffect(()=>{

        const lastmsgotuser = messages.length && messages[messages.length-1].sender !== currentUser._id;
        if(lastmsgotuser){
            socket.emit("markMessagesAsSeen",{
                conversationId:selectedConversation._id,
                userId:selectedConversation.userId,
            })
        }

        socket.on("messagesSeen",({conversationId})=>{
            if(selectedConversation._id === conversationId){
                setMessages((prev)=>{
                    const updatedMessages = prev.map((message)=>{
                        if(!message.seen){
                            return {
                                ...message,
                                seen:true
                            };
                        }
                        return message;
                    });
                    return updatedMessages;
                })
            }
        });
    },[socket,currentUser._id,messages,selectedConversation])
    
    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);   
    
    
    useEffect(()=>{
        const getMessages = async ()=>{
            setLoadingMessages(true);
            setMessages([]);
            try {
                if(selectedConversation.mock) return;
                const res =await fetch(`/api/messages/${selectedConversation.userId}`);
                const data = await res.json();
                
                if(data.error) {
                    showToast("Error", data.error, "error");
                    return;
                }
                console.log("message",messages,selectedConversation.username);
                console.log(data,"data");
                setMessages(data);
            } catch (error) {
                showToast("Error", error.message, "error");
                
            } finally{
                setLoadingMessages(false);
            }
        };
        getMessages();
    },[showToast,selectedConversation.userId,selectedConversation.mock]); 

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
                <Avatar src={selectedConversation.userProfilePic} size={"sm"} name={selectedConversation.username || "User"} />
                <Text display={"flex"} alignItems={"center"} >
                    {selectedConversation.username || "User"} <Image src='/verified.png' w={4} h={4} ml={1} />
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
            {!loadingMessages &&
					messages.map((message) => (
						<Flex
							key={message._id}
							direction={"column"}
							ref={messages.length - 1 === messages.indexOf(message) ? messageEndRef : null}
						>
                            {console.log(message._id,message,message.sender,currentUser._id)}
							<Message message={message} key={message._id} ownMessage={currentUser._id === message.sender} />
						</Flex>
					))}


            </Flex>
            <MessageInput setMessages={setMessages} />
        </Flex>
    )
}

export default MessageContainer
