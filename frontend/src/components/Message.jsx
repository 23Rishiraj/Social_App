import { Avatar, Flex, Text } from '@chakra-ui/react'
// import React from 'react'
import { useRecoilValue } from 'recoil'
import { selectedConversationAtom } from '../atoms/messagesAtoms'
import userAtom from '../atoms/userAtom'

const Message = ({ ownMessage, message }) => {
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const user = useRecoilValue(userAtom)
  console.log(message,message.text);
  return (
    <>
      {/* selfone  */}
      {ownMessage ? (
        <Flex gap={2} alignSelf={"flex-end"}>
          <Text borderRadius={"md"} p={1} maxW={"350px"} bg={"blue.600"} fontFamily={"body"}>
            {message.text}
          </Text>
          <Avatar src={user.profilePic} w={7} h={7} />
        </Flex>
      ) : (
        // the other user we having conversation with
        <Flex gap={2} >
          <Avatar src={selectedConversation.userProfilePic} w={7} h={7} />
          <Text borderRadius={"md"} p={1} maxW={"350px"} bg={"gray.400"} color={"black"} >
            {message.text}        
          </Text>
        </Flex>
      )}
    </>
  )
}

export default Message