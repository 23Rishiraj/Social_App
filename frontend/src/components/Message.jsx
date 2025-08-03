import { Avatar, Box, Flex, Image, Skeleton, Text } from '@chakra-ui/react'
// import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/messagesAtoms'
import userAtom from '../atoms/userAtom'
import { BsCheck2All } from "react-icons/bs"
import { useState } from 'react'

const Message = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom)
  const [imgloaded,setImgloaded] =useState(false)
  console.log(user, message.seen, message.text);
  return (
    <>
      {/* selfone  */}
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          {message.text &&(

            <Flex bg={"green.600"} maxW={"350px"} p={1} borderRadius={"md"} color={"white"}>
              <Text color={"white"}>{message.text}</Text>
              <Box alignSelf={"flex-end"} ml={2} color={message.seen ? "blue.300" : ""} fontWeight={"bold"}>
                <BsCheck2All size={16} />
              </Box>
            </Flex>

          )}
          {message.img && !imgloaded &&(
            <Flex mt={5} w={"200px"}>
              <Image
              src={message.img}
              alt='message img'
              borderRadius={4}
              hidden
              onLoad={()=>setImgloaded(true)}
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}
          
          {message.img && imgloaded &&(
            <Flex mt={5} w={"200px"}>
              <Image
              src={message.img}
              alt='message img'
              borderRadius={4}
              />
              <Box alignSelf={"flex-end"} ml={2} color={message.seen ? "blue.300" : ""} fontWeight={"bold"}>
                <BsCheck2All size={16} />
              </Box>
            </Flex>
          )}

          <Avatar src={user.profilePic} w={7} h={7} />
        </Flex>
      ) : (
        // the other user we having conversation with
        <Flex gap={2} >
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />

          {message.text &&(
            <Text borderRadius={"md"} p={1} maxW={"350px"} bg={"gray.400"} color={"black"} >
            {message.text}
          </Text>
          )}
          
          {message.img && !imgloaded &&(
            <Flex mt={5} w={"200px"}>
              <Image
              src={message.img}
              alt='message img'
              borderRadius={4}
              hidden
              onLoad={()=>setImgloaded(true)}
              />
              <Skeleton w={"200px"} h={"200px"} />
            </Flex>
          )}
          
          {message.img && imgloaded &&(
            <Flex mt={5} w={"200px"}>
              <Image
              src={message.img}
              alt='message img'
              borderRadius={4}
              />
            </Flex>
          )}
        </Flex>
      )}
    </>
  )
}

export default Message