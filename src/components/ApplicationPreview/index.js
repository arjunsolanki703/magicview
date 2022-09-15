import React from 'react';
import { Box } from '@chakra-ui/react';
import { Helmet } from 'react-helmet-async';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Responsive, WidthProvider } from 'react-grid-layout';

import { app_title, gridLayoutConfig } from '../../constants';
import {
  getPreviewStructure,
  resetPreviewStructure,
} from '../../store/actions/previewActions';
import { AccessLayouts } from '../../constants/AccessLayouts';
import ComponentBuilder from './RefactoredComps/ComponentBuilder';

const ResponsiveGridLayout = WidthProvider(Responsive);

export default function ApplicationPreview() {
  const dispatch = useDispatch();

  // START: getting the application preview structure
  const { app_uuid, view_uuid } = useParams();

  React.useEffect(() => {
    if (app_uuid && view_uuid) {
      dispatch(getPreviewStructure(app_uuid, view_uuid));
    }
  }, [app_uuid, view_uuid]);
  // END: getting the application preview structure

  // START: cleaning up preview structure from redux
  React.useEffect(() => {
    return () => {
      dispatch(resetPreviewStructure);
    };
  }, []);
  // END: cleaning up preview structure from redux

  const previewReducer = useSelector(store => store.preview);
  const { structure } = previewReducer;

  return (
    <>
      <Helmet>
        <title>Preview | {app_title}</title>
      </Helmet>
      <Box>
        <ResponsiveGridLayout
          breakpoints={gridLayoutConfig.breakpoints}
          cols={gridLayoutConfig.cols}
          rowHeight={gridLayoutConfig.rowHeight}
          preventCollision={gridLayoutConfig.preventCollision}
        >
          {structure.layouts.map((layout, idx) => (
            <Box key={idx} data-grid={{ ...layout.props, static: true }}>
              <Box w="full" h="full">
                {AccessLayouts.find(obj => obj.name === layout.name) ? (
                  <ComponentBuilder
                    componentFunc={
                      AccessLayouts.find(obj => obj.name === layout.name).comp
                    }
                    layout={layout}
                  />
                ) : null}
              </Box>
            </Box>
          ))}
        </ResponsiveGridLayout>
      </Box>
    </>
  );
}
