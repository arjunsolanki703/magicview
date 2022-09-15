import React from 'react';
import { Image, Stack, Text } from '@chakra-ui/react';
import { app_title } from '../../constants';

export const Logo = ({ height, fontSize }) => {
  return (
    <Stack direction="row" align="center" spacing={3} height={height || '50px'}>
      <Image src="/logo512.png" height="full" />
      <Text fontWeight="bold" fontSize={fontSize || 'initial'}>
        {app_title}
      </Text>
    </Stack>
  );
};
