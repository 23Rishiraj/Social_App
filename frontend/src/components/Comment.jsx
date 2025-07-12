import { Avatar, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import Actions from './Action';

const Comment = ( {reply,lastReply}) => {
    const [liked, setliked] = useState(false);
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={reply.userProfilePic} size={"sm"} />
                <Flex flexDirection={"column"} gap={1} w={"full"}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{reply.username}</Text>
                        
                    </Flex>
                    <Text> {reply.text} </Text>
                </Flex>
            </Flex>
            {!lastReply ? <Divider />: null}
            
        </>
    )
}

export default Comment