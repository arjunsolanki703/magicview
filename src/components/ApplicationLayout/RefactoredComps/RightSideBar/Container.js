import React from 'react';
import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react';
import ComponentsSection from './ComponentsSection';
import PropertiesSection from './PropertiesSection';

export default function RightSideBar() {
  const grayColorMode = useColorModeValue('gray.200', 'gray.700');

  const [isComponentSelected, setIsComponentSelected] = React.useState(true);

  return (
    <Box
      as="aside"
      borderLeft="1px"
      borderLeftColor={grayColorMode}
      w={{ base: 'full', md: 80 }}
      pos="fixed"
      mt="50"
      h="full"
      right="0"
    >
      <Flex
        justifyContent={'space-evenly'}
        h="50"
        borderBottom="1px"
        borderBottomColor={grayColorMode}
        p="2"
      >
        <Box
          h="10"
          borderBottom={isComponentSelected ? '2px' : '0px'}
          borderBottomColor="blue.500"
          onClick={() => !isComponentSelected && setIsComponentSelected(true)}
          cursor={'pointer'}
        >
          <Text>Components</Text>
        </Box>
        <Box
          h="10"
          cursor={'pointer'}
          borderBottom={!isComponentSelected ? '2px' : '0px'}
          borderBottomColor="blue.500"
          onClick={() => isComponentSelected && setIsComponentSelected(false)}
        >
          <Text>Properties</Text>
        </Box>
      </Flex>
      {isComponentSelected ? <ComponentsSection /> : <PropertiesSection />}
    </Box>
  );
}
