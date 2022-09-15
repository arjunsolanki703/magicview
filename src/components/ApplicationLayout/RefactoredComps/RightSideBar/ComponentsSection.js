import {
  Box,
  Button,
  Center,
  Divider,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import { AccessLayouts } from '../../../../constants/AccessLayouts';
import { useSelector, useDispatch } from 'react-redux';
import { addLayoutsToView } from '../../../../store/actions/layoutActions';

export default function ComponentsSection() {
  const dispatch = useDispatch();

  const layoutReducer = useSelector(store => store.layout);
  const { views = [], pointingView } = layoutReducer;

  // START: Search field logic
  const [search, setSearch] = React.useState('');

  const handleSearchChange = e => {
    setSearch(e.target.value);
  };
  // END: Search field logic

  return (
    <Box overflowY="auto" height="calc(100% - 160px)">
      <Center mt={2} mb={2}>
        <InputGroup pl={5} pr={5}>
          <InputLeftAddon children={<AiOutlineSearch />} />
          <Input
            type="search"
            placeholder="Filter Components"
            value={search}
            onChange={handleSearchChange}
          />
        </InputGroup>
      </Center>
      <Divider orientation="horizontal" />
      <Box p={4}>
        <Text>Display</Text>
        <VStack alignItems={'flex-start'} mt={2}>
          {AccessLayouts.filter(layout =>
            layout.name.match(new RegExp(search, 'gi'))
          ).map(layout => (
            <Button
              key={layout.name}
              onClick={() => {
                dispatch(addLayoutsToView(views, pointingView, layout));
              }}
              leftIcon={<layout.icon />}
              iconSpacing={3}
              variant="ghost"
              cursor={'grab'}
              isFullWidth
              justifyContent="left"
              disabled={!pointingView}
            >
              {layout.name}
            </Button>
          ))}
        </VStack>
      </Box>
      <Divider />
    </Box>
  );
}
