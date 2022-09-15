import { Box, Heading, Stack, Text, useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { Helmet } from 'react-helmet-async';

import { app_title } from '../../constants';

export default function PageNotFound() {
  const textColor = useColorModeValue('gray.600', 'gray.300');

  return (
    <Box overflow="auto">
      <Helmet>
        <title>Page not found | {app_title}</title>
      </Helmet>
      <Stack
        h="100vh"
        minH={200}
        w="100vw"
        minW={200}
        direction="column"
        align="center"
        justify="center"
        color={textColor}
        spacing={3}
        p={4}
      >
        <Heading fontSize={'9xl'}>404</Heading>
        <Heading fontSize={'2xl'}>Not Found</Heading>
        <Text>The resource requested could not be found on this site!</Text>
      </Stack>
    </Box>
  );
}
