import {
  Box,
  Flex,
  Icon,
  IconButton,
  Stack,
  Text,
  Tooltip,
  useColorModeValue,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from '@chakra-ui/react';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';
import { MdCloudDone, MdViewInAr } from 'react-icons/md';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

import { app_title, gridLayoutConfig } from '../../constants';
import Header from './RefactoredComps/Header';
import LeftSideBar from './RefactoredComps/LeftSideBar/Container';
import RightSideBar from './RefactoredComps/RightSideBar/Container';
import {
  resetApplicationActive,
  setApplicationActive,
} from '../../store/actions/applicationActions';
import {
  changeLayoutProps,
  getAllViews,
  openCloseView,
  resetView,
  resetViewPointer,
  saveView,
  setPointerTo,
} from '../../store/actions/layoutActions';
import {
  getFunctions,
  resetFunctions,
} from '../../store/actions/functionsActions';
import { AccessLayouts } from '../../constants/AccessLayouts';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function ApplicationLayout() {
  const dispatch = useDispatch();

  // START: setting the active application uuid and requesting dispatch of other data
  const { app_uuid } = useParams();

  React.useEffect(() => {
    if (app_uuid) {
      dispatch(setApplicationActive(app_uuid));
      dispatch(getAllViews(app_uuid));
      dispatch(getFunctions());
    }
  }, []);
  // END: setting the active application uuid and requesting dispatch of other data

  const layoutReducer = useSelector(store => store.layout);
  const { views = [], pointingView } = layoutReducer;

  const grayColorMode = useColorModeValue('gray.200', 'gray.700');
  const viewBorder = useColorModeValue('gray.300', 'white.700');

  const [workingView, setWorkingView] = React.useState([]);

  React.useEffect(() => {
    if (
      pointingView &&
      views.length > 0 &&
      views.find(view => view.view_uuid === pointingView)
    ) {
      setWorkingView(
        views.find(view => view.view_uuid === pointingView).layouts
          ? views.find(view => view.view_uuid === pointingView).layouts
          : []
      );
    }
  }, [views, pointingView]);

  // START: layout refatoring logic
  const runLayoutRefactoring = layouts => {
    const selectedLayoutIdx = workingView.findIndex(obj => obj.selected);

    const newRowHeight = {};

    // defaulting row height of selected element in that row to be it's height for all other in that row
    newRowHeight[layouts[selectedLayoutIdx].y] = layouts[selectedLayoutIdx].h;

    layouts.forEach(obj => {
      if (obj.y === layouts[selectedLayoutIdx].y) {
        return; // skipping for element in selected layout row
      } else {
        if (newRowHeight.hasOwnProperty(obj.y) && newRowHeight[obj.y] < obj.h) {
          newRowHeight[obj.y] = obj.h; // getting the max height of element in that row
        } else {
          newRowHeight[obj.y] = obj.h; // row is not yet considered
        }
      }
    });

    return layouts.map(obj => ({
      ...obj,
      h: newRowHeight[obj.y], // setting height
    }));
  };
  // END: layout refatoring logic

  // START: layout drag and resize  logic
  const handleLayoutChange = layouts => {
    const refactoredlayouts = runLayoutRefactoring(layouts);

    const newWorkingView = [...workingView];
    newWorkingView.forEach((element, i) => {
      element.props = {
        ...element.props,
        x: refactoredlayouts[i].x,
        y: refactoredlayouts[i].y,
        w: refactoredlayouts[i].w,
        h: refactoredlayouts[i].h,
      };
    });

    dispatch(
      changeLayoutProps(
        views.map(view => ({
          ...view,
          ...(view.view_uuid === pointingView && {
            isUpdated: true,
            layouts: newWorkingView,
          }),
        }))
      )
    );
  };
  // END: layout drag and resize  logic

  // START: layout selection logic
  const handleLayoutSelection = (layout, index) => {
    const newLayout = { ...layout, selected: true }; // making the element selected

    const newWorkingView = [...workingView];
    newWorkingView.forEach(element => {
      element.selected = false; // making all elements unselected
    });
    newWorkingView[index] = newLayout;

    dispatch(
      changeLayoutProps(
        views.map(view => ({
          ...view,
          ...(view.view_uuid === pointingView && { layouts: newWorkingView }),
        }))
      )
    );
  };
  // END: Layout selection logic

  // START: Editor zooming logic
  const [editorZoom, setEditorZoom] = React.useState(1);
  const [editorZoomTooltip, setEditorZoomTooltip] = React.useState(false);

  React.useEffect(() => {
    setEditorZoom(1);
  }, [pointingView]);
  // END: Editor zooming logic

  // START: cleaning up all view data from redux
  React.useEffect(() => {
    return () => {
      dispatch(resetView());
      dispatch(resetViewPointer());
      dispatch(resetApplicationActive());
      dispatch(resetFunctions());
    };
  }, []);
  // END: cleaning up all view data from redux

  return (
    <>
      <Helmet>
        <title>Application | {app_title}</title>
      </Helmet>
      <Header />
      <LeftSideBar />
      <Box
        ml={60}
        display={{ base: 'none', md: 'flex' }}
        w={`calc(full - 60)`}
        borderBottom="1px"
        borderBottomColor={grayColorMode}
        h="50"
        overflow={'hidden'}
      >
        <RightSideBar />

        {views.map(view => (
          <Flex key={view.view_uuid}>
            {view.isOpen && (
              <Flex
                alignItems="center"
                borderRight={'1px'}
                borderRightColor={grayColorMode}
                p={2}
                bgColor={view.view_uuid === pointingView ? grayColorMode : ''}
                onClick={() => dispatch(setPointerTo(view.view_uuid))}
                cursor="pointer"
              >
                <Icon
                  as={MdViewInAr}
                  color={view.view_uuid === pointingView ? 'blue.500' : ''}
                />
                <Box
                  marginRight={3}
                  marginLeft={1}
                  color={view.view_uuid === pointingView ? 'blue.500' : ''}
                >
                  {view.view_name}
                </Box>
                <Tooltip label="Close">
                  <IconButton
                    onClick={async () => {
                      await dispatch(
                        openCloseView(views, view.view_uuid, false)
                      );
                      await dispatch(setPointerTo(null));
                    }}
                    variant="ghost"
                    size="sm"
                    icon={<AiOutlineClose />}
                  />
                </Tooltip>
                {view.isUpdated && (
                  <Tooltip label="Save">
                    <IconButton
                      onClick={() => {
                        dispatch(saveView(app_uuid, views, view));
                      }}
                      marginLeft={1}
                      variant="solid"
                      size="sm"
                      icon={<MdCloudDone />}
                    />
                  </Tooltip>
                )}
              </Flex>
            )}
          </Flex>
        ))}
      </Box>

      <Box
        ml={60}
        mr={80}
        w="calc(100% - 560px)"
        h="full"
        pos={'fixed'}
        p={5}
        bgColor={grayColorMode}
      >
        {views.some(view => view.isOpen && pointingView === view.view_uuid) && (
          <>
            <Box
              w={'full'}
              h="calc(100% - 125px)"
              borderWidth={'1px'}
              borderColor={viewBorder}
              overflow={'auto'}
            >
              <ResponsiveGridLayout
                layouts={{
                  lg: workingView.map((layout, idx) => ({
                    ...layout.props,
                    i: idx,
                  })),
                }}
                breakpoints={gridLayoutConfig.breakpoints}
                cols={gridLayoutConfig.cols}
                rowHeight={gridLayoutConfig.rowHeight}
                preventCollision={gridLayoutConfig.preventCollision}
                onDragStop={handleLayoutChange}
                onResizeStop={handleLayoutChange}
                style={{
                  width: `calc(1201px * ${editorZoom})`,
                  height: `calc(100% * ${editorZoom})`,
                  transform: `scale(${editorZoom})`,
                  transformOrigin: '0% 0% 0px',
                }}
              >
                {workingView.map((layout, idx) => (
                  <Box
                    key={idx}
                    style={{
                      ...(layout.selected && {
                        outline: `1px dashed #3182CE`,
                        outlineOffset: 2,
                      }),
                    }}
                    data-grid={{ ...layout.props, minW: 3 }}
                    sx={{
                      ...(!layout.selected && {
                        '> span': { display: 'none' },
                      }),
                    }}
                  >
                    <Box
                      w="full"
                      h="full"
                      onMouseDown={() => handleLayoutSelection(layout, idx)}
                      onTouchStart={() => handleLayoutSelection(layout, idx)}
                      cursor="default"
                    >
                      {AccessLayouts.find(
                        obj => obj.name === layout.name
                      )?.comp(layout.metaData) || <></>}
                    </Box>
                  </Box>
                ))}
              </ResponsiveGridLayout>
            </Box>
            <Stack direction="row" align="center" mt={2}>
              <Text fontSize="sm">Zoom:</Text>
              <Slider
                value={editorZoom}
                min={0.05}
                max={1}
                step={0.05}
                size="sm"
                colorScheme="blue"
                maxW="xs"
                onChange={v => setEditorZoom(v)}
                onMouseEnter={() => setEditorZoomTooltip(true)}
                onMouseLeave={() => setEditorZoomTooltip(false)}
              >
                <SliderTrack bg="gray.300">
                  <SliderFilledTrack />
                </SliderTrack>
                <Tooltip
                  hasArrow
                  bg="blue.500"
                  color="white"
                  placement="top"
                  isOpen={editorZoomTooltip}
                  label={`${(editorZoom * 100).toFixed(0)}%`}
                >
                  <SliderThumb />
                </Tooltip>
              </Slider>
            </Stack>
          </>
        )}
      </Box>
    </>
  );
}
