import { Avatar, AvatarBadge, Flex, Image, Stack, Text, useColorModeValue, WrapItem } from '@chakra-ui/react'
import React from 'react'

const Conversion = () => {
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
                    Any Name <Image src='/verified.png' w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1}>
                    any Message .......
                </Text>
            </Stack>
        </Flex>
    )
}

export default Conversion    