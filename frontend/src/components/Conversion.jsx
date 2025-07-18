import { Avatar, AvatarBadge, Flex, Image, Stack, Text, useColorMode, useColorModeValue, WrapItem } from '@chakra-ui/react'
import React from 'react'
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom'
import { BsCheck2All } from 'react-icons/bs';
import { selectedConversationAtom } from '../atoms/messagesAtoms';

const Conversion = ({conversation}) => {
    const currentUser= useRecoilValue(userAtom)
    const user = conversation?.participants?.[0] || {};
    const lastMessage = conversation?.lastMessage || {};
    const [selectConversation, setSelectConversation] = useRecoilState(selectedConversationAtom);
    const colorMode = useColorMode();

    console.log("Conversion", conversation, user, lastMessage, selectConversation);
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
            onClick={()=> setSelectConversation({
                _id:conversation._id,
                userId: user._id,
                username: user.username,
                userProfilePic: user.profilePic || "",
            })}
            bg={selectConversation?._id === conversation._id ? (colorMode === "light" ? "gray.300" : "gray.dark")
            : ""}
            borderRadius={"md"}
        >
            <WrapItem>
                <Avatar size={{
                    base: "xs",
                    sm: "sm",
                    md: "md"
                }}
                src={user.profilePic || ""}
                name={user.username || "user"} >
                <AvatarBadge boxSize={"1em"} bg='green.500' />
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight={"600"} display={"flex"} alignItems={"center"}>
                    {user.username || "Unknown" } <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                    {/* {console.log(currentUser._id,user._id, lastMessage.sender,)} */}
                    {currentUser?._id === lastMessage.sender ? <BsCheck2All size={16} /> : ""}
                    {lastMessage.text.length>14  ? lastMessage.text.substring(0, 14) + "..." : lastMessage.text}
                </Text>
            </Stack>
        </Flex>
    )
}

export default Conversion    