import { Avatar, AvatarBadge, Flex, Image, Stack, Text, useColorModeValue, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { useRecoilValue } from 'recoil';
import {userAtom} from '../atoms/userAtom'
import { BsCheck2All } from 'react-icons/bs';

const Conversion = ({conversation}) => {
    const user =conversation.participants[0];
    const currentUser= useRecoilValue(userAtom)
    const lastMessage = conversation.lastMessage;
    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={1}
            _hover={{
                cursor: "pointer",
                bg: useColorModeValue("gray.600", "gray.700"),
                color: "white"
            }}
            borderRadius="md"
        >
            <WrapItem>
                <Avatar size={{
                    base: "xs",
                    sm: "sm",
                    md: "md"
                }} src='/toji3.jpg' >
                <AvatarBadge boxSize={"1em"} bg='green.500' />
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight={"600"} display={"flex"} alignItems={"center"}>
                    {user.username } <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                    {currentUser._id === lastMessage.sender ? <BsCheck2All size={16} /> : ""}
                    {lastMessage.text.length>14  ? lastMessage.text.substring(0, 14) + "..." : lastMessage.text}
                </Text>
            </Stack>
        </Flex>
    )
}

export default Conversion    