import { Flex, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react'
import { useState } from 'react';
import { IoSendSharp } from 'react-icons/io5'
import useShowToast from '../hooks/useShowToast';
import { conversationsAtom, selectedConversationAtom } from '../atoms/messagesAtoms';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { BsFillImageFill } from 'react-icons/bs';
import { useRef } from 'react';
import usePreviewing from '../hooks/usePreviewing.js';


const MessageInput = ({ setMessages }) => {
    const [messageText, setMessagesText] = useState("");
    const showToast = useShowToast();
    const selectedConversation = useRecoilValue(selectedConversationAtom);
    const setConversations = useSetRecoilState(conversationsAtom);
    const imageRef=useRef(null);
    const {onClose} =useDisclosure();
    const {handleImageChange,imgUrl,setImgUrl}= usePreviewing();
    const [isSending,setIsSending] =useState(false);

    const handleSendMessage = async (e) => {
        e.preventDefault();//doesnt refresh the page on submit
        if (!messageText && !imgUrl) return;
        if(isSending) return;

        setIsSending(true);

        try {
            const res = await fetch("/api/messages", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    message: messageText,
                    recipientId: selectedConversation.userId,
                    img:imgUrl,
                }),
            })

            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                console.log("Error sending message 0:", data.error);
                return;
            }
            console.log("message sent", data);
            // setMessagesText("");
            
            setMessages(messages => [...messages, data]);
            
            setConversations(prevConv => {
                const updateConversations = prevConv.map((conversation) => {
                    if (conversation._id === selectedConversation._id) {
                        return {
                            ...conversation,
                            lastMessage: {
                                text: messageText,
                                sender: data.sender,
                            }
                        }
                    }
                    return conversation;
                })
                return updateConversations;
            })
            setMessagesText("")
            setImgUrl("");
        } catch (error) {
            showToast("Error", error.message, "error");
            console.log("Error sending message 1 catch:", data.error);
        } finally{
            setIsSending(false);
        }

    }
    return (
        <Flex gap={2} alignItems={"centre"}>
            <form onSubmit={handleSendMessage} style={{flex:95}}>
                <InputGroup>
                    <Input w={"full"} placeholder='Type ur msg' onChange={(e) => setMessagesText(e.target.value)}
                        value={messageText}
                    />
                    <InputRightElement cursor={"pointer"} onClick={handleSendMessage}>
                        <IoSendSharp />
                    </InputRightElement>
                </InputGroup>
            </form>
            <Flex flex={5} cursor={"pointer"} mt={2}>
				<BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
				<Input type={"file"} hidden ref={imageRef} onChange={handleImageChange}/>
			</Flex>
			<Modal
				isOpen={imgUrl}
				onClose={() => {
					onClose();
					setImgUrl("");
				}}
			>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader></ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						<Flex mt={5} w={"full"}>
							<Image src={imgUrl} />
						</Flex>
						<Flex justifyContent={"flex-end"} my={2}>
							{!isSending ?(
                                <IoSendSharp size={24} cursor={"pointer"} onClick={handleSendMessage} />
                            ):(
                                <Spinner size={"md"} />
                            )}
						</Flex>
					</ModalBody>
				</ModalContent>
			</Modal> 

        </Flex>
    )
}

export default MessageInput
