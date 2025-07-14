import { Avatar, Flex, Text } from '@chakra-ui/react'
import React from 'react'

const Message = ({ownMessage}) => {
  return( 
  <>
  {ownMessage ? (
      <Flex gap={2} alignSelf={"flex-end"}>
        <Text borderRadius={"md"} p={1} maxW={"350px"} bg={"blue.600"} fontFamily={"body"}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptates placeat natus qui explicabo dolor optio veniam, quidem facere, odio, harum consequatur quo doloremque inventore vitae sunt nobis sed impedit? Dolorum numquam aut laborum facilis doloremque modi illo alias odit, ullam iure sunt voluptas?
        </Text>
        <Avatar src='' w={7} h={7} />
      </Flex>
  ):(
      <Flex gap={2} >
        <Avatar src='' w={7} h={7} />
        <Text borderRadius={"md"} p={1} maxW={"350px"} bg={"gray.400"} color={"black"} >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio, neque.
        </Text>
      </Flex>
  )}
  </>
  )
}

export default Message