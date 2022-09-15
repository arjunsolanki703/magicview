import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Divider,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useColorModeValue,
} from '@chakra-ui/react';

import { AccessLayoutsConfig } from '../../../../constants/AccessLayoutsConfig';
import { changeLayoutProps } from '../../../../store/actions/layoutActions';
import PropertiesFunctionSection from './PropertiesFunctionSection';

export default function PropertiesSection() {
  const dispatch = useDispatch();

  const componentNameBackground = useColorModeValue('blue.50', 'blue.900');

  const layoutReducer = useSelector(store => store.layout);
  const { views = [], pointingView } = layoutReducer;

  // START: selected component layout
  const [selectedLayout, setSelectedLayout] = React.useState(null);

  React.useEffect(() => {
    if (
      pointingView &&
      views.length > 0 &&
      views.find(view => view.view_uuid === pointingView)
    ) {
      setSelectedLayout(
        views
          .find(view => view.view_uuid === pointingView)
          .layouts.find(lay => lay.selected) || null
      );
    }
  }, [views, pointingView]);
  // END: selected component layout

  // START: handle metadata change
  const handleMetaDataChange = (name, value) => {
    const newLayout = { ...selectedLayout };
    newLayout.metaData[name] = value;

    const updatedLayouts = [
      ...views.find(view => view.view_uuid === pointingView).layouts,
    ];
    const selectedLayoutIndex = updatedLayouts.findIndex(lay => lay.selected);
    updatedLayouts[selectedLayoutIndex] = newLayout;

    dispatch(
      changeLayoutProps(
        views.map(view => ({
          ...view,
          ...(view.view_uuid === pointingView && {
            isUpdated: true,
            layouts: updatedLayouts,
          }),
        }))
      )
    );
  };
  // END: handle metadata change

  // START: components to render
  const renderComponent = {
    Input: (obj, value) => (
      <Input
        placeholder={obj.placeholder}
        size="sm"
        variant="outline"
        value={value}
        onChange={e => handleMetaDataChange(obj.metaDataKey, e.target.value)}
      />
    ),
    Select: (obj, value) => (
      <Select
        placeholder={obj.placeholder}
        size="sm"
        variant="outline"
        value={value}
        onChange={e => handleMetaDataChange(obj.metaDataKey, e.target.value)}
      >
        {obj.options.map((val, i) => (
          <option value={val} key={i}>
            {val}
          </option>
        ))}
      </Select>
    ),
    Textarea: (obj, value) => (
      <Textarea
        placeholder={obj.placeholder}
        size="sm"
        variant="outline"
        minHeight={150}
        value={value}
        onChange={e => handleMetaDataChange(obj.metaDataKey, e.target.value)}
      />
    ),
  };
  // END: components to render

  return (
    <Box overflowY="auto" height="calc(100% - 160px)">
      {/* No component selected */}
      {!selectedLayout && (
        <Stack direction="column" p={4}>
          <Heading fontSize={'3xl'}>No component selected</Heading>
          <Text fontSize={'sm'}>
            Please add/select the component to edit the properties
          </Text>
        </Stack>
      )}
      {/* Component selected */}
      {selectedLayout && (
        <>
          <Box bgColor={componentNameBackground} p={2}>
            <Heading as="h6" size="md">
              {selectedLayout.name}
            </Heading>
          </Box>
          <Stack direction="column" spacing={3} mt={4}>
            {AccessLayoutsConfig[selectedLayout.name] && (
              <>
                {AccessLayoutsConfig[selectedLayout.name].generic.map(
                  (options, idx) => (
                    <Box key={idx} px={4}>
                      <Text fontSize="sm">{options.label}:</Text>
                      {renderComponent[options.component](
                        options,
                        selectedLayout.metaData[options.metaDataKey]
                      )}
                    </Box>
                  )
                )}
                {AccessLayoutsConfig[selectedLayout.name].functionbinding
                  .isAccepted && (
                  <>
                    <Divider />
                    <PropertiesFunctionSection
                      metaDataKey={
                        AccessLayoutsConfig[selectedLayout.name].functionbinding
                          .metaDataKey
                      }
                      binding={
                        AccessLayoutsConfig[selectedLayout.name].functionbinding
                          .binding
                      }
                      selectedLayoutMetaData={selectedLayout.metaData}
                      saveFunctionBinding={handleMetaDataChange}
                    />
                  </>
                )}
              </>
            )}
          </Stack>
        </>
      )}
    </Box>
  );
}
