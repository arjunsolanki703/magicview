import {
  Box,
  Flex,
  Button,
  Avatar,
  Breadcrumb,
  BreadcrumbLink,
  BreadcrumbItem,
  IconButton,
  EditablePreview,
  useColorModeValue,
  Input,
  useEditableControls,
  ButtonGroup,
  Editable,
  Tooltip,
  EditableInput,
} from '@chakra-ui/react';
import React, { memo } from 'react';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { MdCheck, MdClose } from 'react-icons/md';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import ColorModeSwitcher from '../../../utils/ColorModeSwitcher';
import { renameApplication } from '../../../store/actions/applicationActions';
import { Logo } from '../../../sharedComponents/generic/Logo';

function Header() {
  const dispatch = useDispatch();

  const applicationReducer = useSelector(store => store.application);
  const { activeApplication } = applicationReducer;

  const layoutReducer = useSelector(store => store.layout);
  const { pointingView } = layoutReducer;

  // START: Application name field logic
  const [tempAppName, setTempAppName] = React.useState('');

  React.useEffect(() => {
    setTempAppName(activeApplication.app_name);
  }, [activeApplication.app_name]);

  const handleApplicationNameChange = newName => {
    if (newName === '') {
      setTempAppName(activeApplication.app_name); // discard the submit
    } else {
      dispatch(renameApplication(activeApplication.app_uuid, newName));
    }
  };

  const EditableControls = () => {
    const { isEditing, getSubmitButtonProps, getCancelButtonProps } =
      useEditableControls();

    return isEditing ? (
      <ButtonGroup size="sm">
        <IconButton icon={<MdCheck />} {...getSubmitButtonProps()} />
        <IconButton icon={<MdClose />} {...getCancelButtonProps()} />
      </ButtonGroup>
    ) : null;
  };
  // END: Application name field logic

  // START: Preview logic
  const handlePreview = () => {
    window.open(`/preview/${activeApplication.app_uuid}/${pointingView}`);
  };
  // END: Preview logic

  return (
    <>
      <Flex
        justifyContent="space-between"
        alignItems="center"
        borderWidth={1}
        h="55"
        pl={2}
        pr={2}
        display={{ base: 'none', md: 'flex' }}
      >
        <Flex alignItems={'center'}>
          {/* left side */}
          <Logo height="30px" />
          <Breadcrumb
            ml={4}
            separator={<HiArrowNarrowRight color="gray.500" />}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={Link} to="/home">
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <Editable
                isPreviewFocusable={true}
                selectAllOnFocus={false}
                value={tempAppName}
                onChange={val => setTempAppName(val)}
                onSubmit={handleApplicationNameChange}
              >
                <Tooltip label="Click to edit">
                  <EditablePreview
                    px={2}
                    _hover={{
                      background: useColorModeValue('gray.100', 'gray.700'),
                    }}
                  />
                </Tooltip>
                <Flex columnGap={2}>
                  <Input size="sm" as={EditableInput} />
                  <EditableControls />
                </Flex>
              </Editable>
            </BreadcrumbItem>
          </Breadcrumb>
        </Flex>
        <Box>
          {/* right side */}
          <ColorModeSwitcher />

          <IconButton ml={1} variant="ghost" icon={<Avatar size="sm" />} />

          <Button
            colorScheme="blue"
            variant="outline"
            size="md"
            fontSize="sm"
            ml={2}
            onClick={handlePreview}
            disabled={!pointingView}
          >
            Preview
          </Button>
        </Box>
      </Flex>
    </>
  );
}

export default memo(Header);
