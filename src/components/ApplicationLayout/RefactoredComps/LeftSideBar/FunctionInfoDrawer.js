import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Text,
  Stack,
  List,
  ListItem,
  ListIcon,
  Box,
  Divider,
} from '@chakra-ui/react';
import React from 'react';
import { BsInputCursorText } from 'react-icons/bs';
import { VscOutput } from 'react-icons/vsc';
import { useSelector } from 'react-redux';

export default function FunctionInfoDrawer(props) {
  const { isOpen, onClose, func_uuid } = props;

  const functionsReducer = useSelector(store => store.functions);
  const { functions = [] } = functionsReducer;

  // START: getting the selected function
  const [selectedFunction, setSelectedFunction] = React.useState(null);

  React.useEffect(() => {
    if (func_uuid) {
      setSelectedFunction(
        functions.find(obj => obj.func_uuid === func_uuid) || null
      );
    }
  }, [func_uuid, functions]);
  // END: getting the selected function

  return (
    <Drawer isOpen={isOpen} onClose={onClose}>
      <DrawerOverlay />
      <DrawerContent>
        <Stack borderBottomWidth="1px">
          <DrawerHeader>Function Info</DrawerHeader>
          <DrawerCloseButton />
        </Stack>

        <DrawerBody>
          {func_uuid && selectedFunction && (
            <Stack spacing={5}>
              <Box>
                <Text fontWeight="bold">Name:</Text>
                <Text fontSize="sm">{selectedFunction.key_name}</Text>
              </Box>

              <Box>
                <Text fontWeight="bold">Description:</Text>
                <Text fontSize="sm">{selectedFunction.desc}</Text>
              </Box>

              <Divider />

              <List>
                <Text fontWeight="bold">Input Parameters:</Text>
                {selectedFunction.input_param.map((obj, idx) => (
                  <ListItem key={idx} fontSize="sm">
                    <Stack direction="row" justify={'space-between'}>
                      <Box>
                        <ListIcon as={BsInputCursorText} color="blue.500" />
                        {obj.name}
                      </Box>
                      <Box>{`[Type: ${obj.type}]`}</Box>
                    </Stack>
                  </ListItem>
                ))}
              </List>

              <Divider />

              <List>
                <Text fontWeight="bold">Output Parameters:</Text>
                {selectedFunction.output_param.map((obj, idx) => (
                  <ListItem key={idx} fontSize="sm">
                    <Stack direction="row" justify={'space-between'}>
                      <Box>
                        <ListIcon as={VscOutput} color="green.500" />
                        {obj.name}
                      </Box>
                      <Box>{`[Type: ${obj.type}]`}</Box>
                    </Stack>
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}
