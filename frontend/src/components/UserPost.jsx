import { Avatar, Box, Flex, Image, Text } from '@chakra-ui/react'
import React from 'react'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Actions from './Action'
import { useState } from 'react'

const UserPost = ({postImg, postTitle, likes, replies}) => {
    const [liked, setliked] = useState(false);
    return (
        <Link to={"post/1"}>
            <Flex gap={3} mb={4} py={5}>
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size={ {base:"md",md:"xl", }} name='markhennery' src='/zuck-avatar.png'></Avatar>
                    <Box w="1.25px" h={"full"} bg={"gray.light"} my={2}></Box>
                    <Box position={"relative"} >
                        <Avatar
                            size={'xs'}
                            name='Jonathan'
                            src='https://bit.ly/dan-abramov'
                            position={"absolute"}
                            top={"0px"}
                            left="5px"
                            padding={"2px"}
                        />

                        <Avatar
                            size={'xs'}
                            name='Jonathan'
                            src='https://bit.ly/prosper-baba'
                            position={"absolute"}
                            bottom={"0px"}
                            right="2px"
                            padding={"2px"}
                        />

                        <Avatar
                            size={'xs'}
                            name='Jonathan'
                            src='https://bit.ly/sage-adebayo'
                            position={"absolute"}
                            bottom={"0px"}
                            left="10px"
                            padding={"2px"}
                        />
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"}>
                            <Text fontSize={"sm"} fontWeight={"bold"}>markhennery</Text>
                            <Image src="/verified.png" w={3} h={3} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.light"} >1h</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>
                    <Text fontSize={"sm"}>{postTitle}</Text>
                    {postImg && (

                        <Box borderRadius={6} overflow={"hidden"} border={"1px solid "} borderColor={"gray.light"} >
                            <Image src={postImg} w={"full"} />
                        </Box>

                    )}

                    <Flex gap={3} my={1}>
                        <Actions liked={liked} setliked={setliked} />
                    </Flex>
                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.light"}>{replies} replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text fontSize={"sm"} color={"gray.light"}> {likes} likes</Text>
                    </Flex>
                </Flex>
            </Flex>
        </Link>

    )
}

export default UserPost