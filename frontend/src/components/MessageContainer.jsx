import { Avatar, Divider, Flex, Image, Skeleton, SkeletonCircle, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'
import Message from '../components/Message'
import MessageInput from './MessageInput'

const MessageContainer = () => {
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
                // flexDirection={"column"}
                gap={2}
                h={12}
            >
                <Avatar src='' size={"sm"} />
                <Text display={"flex"} alignItems={"center"} >
                    Any Namejvhjvkhgvkhv <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
            </Flex>

            <Divider/>

            <Flex flexDir={"column"} gap={4} my={4}
            height={"303px"}
            p={3}
            overflowY={"auto"}
            > 
            {
                false &&(
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
            <Message ownMessage={true} />
            <Message ownMessage={false} />
            <Message ownMessage={true} />
            <Message ownMessage={false} />
            <Message ownMessage={true} />
            <Message ownMessage={false} />

            </Flex>
            <MessageInput />
        </Flex>
    )
}

export default MessageContainer