import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import { useState } from 'react';
import { IoSendSharp } from 'react-icons/io5'
import useShowToast from '../hooks/useShowToast';
import { conversationsAtom, selectedConversationAtom } from '../atoms/messagesAtoms';
import { useRecoilState, useRecoilValue } from 'recoil';


const MessageInput = ({setMessages}) => {
    const [messageText,setMessagesText]= useState("");
    const showToast = useShowToast();
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const setConversations= useRecoilState(conversationsAtom);
    const handleSendMessage = async (e) => {
        e.preventDefault();//doesnt refresh the page on submit
        if(!messageText) return;

        try {
            const res= await fetch("/api/messages",{
                method: "Post",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    recipientId: selectedConversation.userId,
                }),
            })

            const data = await res.json();
            if(data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            console.log("message sent", data);
            setMessagesText("");

            setMessages(messages => [...messages, data]);

            setConversations(prevConv =>{
                const updateConversations = prevConv.map(conversation => {
                    if(conversation._id === selectedConversation._id) {
                        return {
                            ...conversation,
                            lastMessage: {
                                text:messageText,
                                sender: data.sender,
                            }
                        }
                    }
                    return conversation;
                })
                return updateConversations;
            })
            setMessagesText("")
        } catch (error) {
            showToast("Error", error.message, "error");
        }

    }
    return (
        <form onSubmit={handleSendMessage}>
            <InputGroup>
                <Input w={"full"} placeholder='Type ur msg' onChange={(e)=> setMessagesText(e.target.value)}
                value={messageText} 
                />
                <InputRightElement cursor={"pointer"} onClick={handleSendMessage}>
                    <IoSendSharp  />
                </InputRightElement>
            </InputGroup>
        </form>
    )
}

export default MessageInput