import { Avatar, Divider, Flex, Image, Text, useColorModeValue } from '@chakra-ui/react'
import React from 'react'

const MessageContainer = () => {
    return (
        <Flex bg={useColorModeValue("gray.200", "gray.dark")}
            borderRadius={"md"}
            flexDirection={"coloumn"}
            p={2}
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
            <Flex flexDir={"column"} gap={2} p={2} my={2}
            height={"400px"}
            overflow={"scroll"}
            > 
            </Flex>
        </Flex>
    )
}

export default MessageContainer