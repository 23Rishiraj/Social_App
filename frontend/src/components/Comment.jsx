import { Avatar, Divider, Flex, Text } from '@chakra-ui/react';
import React from 'react'
import { useState } from 'react'
import { BsThreeDots } from 'react-icons/bs';
import Actions from './Action';

const Comment = ( {comment ,createdAt , likes ,username ,userAvatar}) => {
    const [liked, setliked] = useState(false);
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={userAvatar} size={"sm"} />
                <Flex flexDirection={"column"} gap={1} w={"full"}>
                    <Flex alignItems={"center"} justifyContent={"space-between"} w={"full"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>
                        <Flex gap={2} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.light"}>{createdAt}</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text> {comment} </Text>
                    <Actions liked={liked} setliked={setliked} />
                    <Text fontSize={"sm"} color={"gray.light"}>
                        {likes + (liked ? 1 : 0)} likes
                    </Text>
                </Flex>
            </Flex>
            
        </>
    )
}

export default Comment