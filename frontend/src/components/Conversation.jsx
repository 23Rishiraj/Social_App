import { Avatar, AvatarBadge, Box, Flex, Image, Stack, Text, useColorMode, useColorModeValue, WrapItem } from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/userAtom'
import { BsCheck2All, BsFillImageFill } from 'react-icons/bs';
import { selectedConversationAtom } from '../atoms/messagesAtoms';

const Conversation = ({conversation, isOnline, selectedBg, hoverBg}) => {
    const user = conversation.participants[0];
    const currentUser= useRecoilValue(userAtom)
    const lastMessage = conversation.lastMessage;
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom);
    const colorMode = useColorMode();

    console.log("Selected Conversation", selectedConversation);
    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={3}
            _hover={{
                cursor: "pointer",
                bg: hoverBg || useColorModeValue("blue.50", "gray.700"),
                color: useColorModeValue("blue.700", "blue.200"),
                boxShadow: useColorModeValue("0 2px 8px 0 rgba(0,0,0,0.06)", "0 2px 8px 0 rgba(0,0,0,0.25)")
            }}
            onClick={() => setSelectedConversation({
                _id: conversation._id,
                userId: user._id,
                username: user.username,
                userProfilePic: user.profilePic,
                mock: conversation.mock,
            })}
            bg={selectedConversation?._id === conversation._id ? (selectedBg || useColorModeValue("blue.100", "gray.700")) : useColorModeValue("white", "gray.800")}
            borderRadius={"xl"}
            boxShadow={selectedConversation?._id === conversation._id ? useColorModeValue("0 4px 16px 0 rgba(49,130,206,0.10)", "0 4px 16px 0 rgba(144,205,244,0.10)") : "sm"}
            transition="all 0.85s"
        >
            <WrapItem>
                <Avatar size={{
                    base: "xs",
                    sm: "sm",
                    md: "md"
                }}
                src={user.profilePic}
                name={user.username || "user"} >
                {isOnline ?<AvatarBadge boxSize={"1em"} bg='green.500' /> : ""}
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>
                <Text fontWeight={"bold"} fontSize={{ base: "md", md: "lg" }} display={"flex"} alignItems={"center"} color={selectedConversation?._id === conversation._id ? useColorModeValue("blue.700", "blue.200") : useColorModeValue("gray.700", "gray.200") }>
                    {user.username || "Unknown"} <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1} color={useColorModeValue("gray.600", "gray.300") }>
                    {currentUser._id === lastMessage.sender ? (
                        <Box color={lastMessage.seen ? "blue.400" : useColorModeValue("gray.500", "gray.400")} fontWeight={"bold"}>
                            <BsCheck2All size={16} />
                        </Box>
                    ) : ""}
                    {lastMessage.text.length > 14 ? lastMessage.text.substring(0, 14) + "..." : lastMessage.text || <BsFillImageFill size={15} />}
                </Text>
            </Stack>
        </Flex>
    )
}

export default Conversation    


