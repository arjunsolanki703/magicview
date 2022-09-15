import React, { memo, useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
  useColorModeValue,
  useOutsideClick,
} from '@chakra-ui/react';
import {
  AiOutlinePlus,
  AiOutlineFunction,
  AiOutlineInfo,
} from 'react-icons/ai';
import { MdViewInAr } from 'react-icons/md';
import { FiLoader, FiMoreHorizontal } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';

import {
  createView,
  deleteView,
  openCloseView,
  renameView,
  setPointerTo,
  toggleEditMode,
} from '../../../../store/actions/layoutActions';
import FunctionInfoDrawer from './FunctionInfoDrawer';

function LeftSideBar() {
  const dispatch = useDispatch();

  const grayColorMode = useColorModeValue('gray.200', 'gray.700');

  const applicationReducer = useSelector(store => store.application);
  const { activeApplication } = applicationReducer;

  const layoutReducer = useSelector(store => store.layout);
  const { views = [], pointingView } = layoutReducer;

  const functionsReducer = useSelector(store => store.functions);
  const { functions = [] } = functionsReducer;

  // START: view name rename logic
  const [tempName, setTempName] = React.useState({
    value: '',
    uuid: null,
  });

  const viewInputFieldRef = React.useRef();

  useOutsideClick({
    ref: viewInputFieldRef,
    handler: () => {
      if (views.some(view => view.editMode)) {
        const { value, uuid } = tempName;
        if (
          value !== '' &&
          !views.some(view => view.view_name === value.trim())
        ) {
          dispatch(
            renameView(views, uuid, value.trim(), activeApplication.app_uuid)
          );
        } else {
          dispatch(toggleEditMode(views, uuid, false));
        }
      }
    },
  });
  // END: view name rename logic

  // START: create new view logic
  const [isLoading, setIsLoading] = React.useState(false);

  async function createNewVIew(e, cloneName) {
    await setIsLoading(true);
    e.preventDefault();
    await dispatch(createView(views, activeApplication.app_uuid, cloneName));
    setIsLoading(false);
  }
  // END: create new view logic

  // START: function info drawer logic
  const [functionInfoDrawerProp, setFunctionInfoDrawerProp] = useState({
    open: false,
    func_uuid: null,
  });

  const handleFunctionInfoDrawerOpen = func_uuid => {
    setFunctionInfoDrawerProp(prev => ({
      ...prev,
      open: true,
      func_uuid: func_uuid,
    }));
  };

  const handleFunctionInfoDrawerClose = () => {
    setFunctionInfoDrawerProp(prev => ({
      ...prev,
      open: false,
      func_uuid: null,
    }));
  };
  // END: function info drawer logic

  return (
    <Box
      as="aside"
      borderRight="1px"
      borderRightColor={grayColorMode}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      zIndex={1}
    >
      <Box h="46%">
        <Flex
          justifyContent={'space-between'}
          alignItems="center"
          h="50"
          borderBottom="1px"
          borderBottomColor={grayColorMode}
          p="2"
        >
          <Text>Views</Text>
          <IconButton
            onClick={createNewVIew}
            disabled={isLoading}
            icon={isLoading ? <FiLoader /> : <AiOutlinePlus />}
          />
        </Flex>
        <Box h="calc(100% - 50px)" overflowY="auto">
          {views.map(view => (
            <Flex
              key={view.view_uuid}
              pl="2"
              pr="2"
              pt="1"
              justifyContent={'space-between'}
              alignItems="center"
            >
              <Menu key={view.view_uuid}>
                {!view.editMode ? (
                  <Button
                    onClick={() => {
                      !view.isOpen &&
                        dispatch(openCloseView(views, view.view_uuid, true));
                      pointingView !== view.view_uuid &&
                        dispatch(setPointerTo(view.view_uuid));
                    }}
                    variant="ghost"
                    size={'sm'}
                    leftIcon={<MdViewInAr />}
                    isFullWidth
                    justifyContent="left"
                    colorScheme="blue"
                    color="inherit"
                    isActive={pointingView === view.view_uuid}
                    isTruncated
                  >
                    {view.view_name}
                  </Button>
                ) : (
                  <Input
                    ref={viewInputFieldRef}
                    onChange={e =>
                      setTempName({
                        ...tempName,
                        value: e.target.value,
                      })
                    }
                    value={tempName.value}
                    size={'sm'}
                  />
                )}
                <MenuButton
                  as={Button}
                  variant="ghost"
                  size={'sm'}
                  rightIcon={<FiMoreHorizontal />}
                />
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      setTempName({
                        value: view.view_name,
                        uuid: view.view_uuid,
                      });
                      dispatch(toggleEditMode(views, view.view_uuid, true));
                    }}
                  >
                    Rename
                  </MenuItem>
                  <MenuItem
                    onClick={e => createNewVIew(e, `${view.view_name} clone`)}
                  >
                    Clone
                  </MenuItem>
                  <MenuItem
                    onClick={event => {
                      event.currentTarget.disabled = true;

                      dispatch(
                        deleteView(
                          activeApplication.app_uuid,
                          view.view_uuid,
                          pointingView,
                          views
                        )
                      );
                    }}
                  >
                    Delete
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          ))}
        </Box>
      </Box>
      <Box h="46%">
        <Flex
          justifyContent={'space-between'}
          alignItems="center"
          h="50"
          borderBottom="1px"
          borderTop="1px"
          borderBottomColor={grayColorMode}
          borderTopColor={grayColorMode}
          p="2"
        >
          <Text>Functions</Text>
        </Flex>
        <Box h="calc(100% - 50px)" overflowY="auto">
          {functions.map(functionOption => (
            <Flex
              key={functionOption.func_uuid}
              pl="2"
              pr="2"
              pt="1"
              justifyContent="space-between"
              alignItems="center"
            >
              <Stack direction="row" cursor="default">
                <Icon as={AiOutlineFunction} />
                <Text fontSize="sm">{functionOption.key_name}</Text>
              </Stack>
              <IconButton
                variant="ghost"
                size={'sm'}
                icon={<AiOutlineInfo />}
                onClick={() =>
                  handleFunctionInfoDrawerOpen(functionOption.func_uuid)
                }
              />
            </Flex>
          ))}

          <FunctionInfoDrawer
            isOpen={functionInfoDrawerProp.open}
            onClose={handleFunctionInfoDrawerClose}
            func_uuid={functionInfoDrawerProp.func_uuid}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default memo(LeftSideBar);
