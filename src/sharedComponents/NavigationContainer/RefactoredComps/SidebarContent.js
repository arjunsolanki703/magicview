import { CloseButton, Box, Flex, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import NavItem from './NavItem';
import { FiHome } from 'react-icons/fi';
import { Logo } from '../../generic/Logo';

const LinkItems = [{ name: 'Home', icon: FiHome }];
export default function SidebarContent({ onClose, ...rest }) {
  const grayColorMode = useColorModeValue('gray.200', 'gray.700');
  const whiteGrayColorMode = useColorModeValue('white', 'gray.900');

  return (
    <Box
      transition="3s ease"
      bg={whiteGrayColorMode}
      borderRight="1px"
      borderRightColor={grayColorMode}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Logo height="30px" fontSize="xl" />
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(link => (
        <NavItem key={link.name} icon={link.icon}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
}
