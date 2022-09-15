import React from 'react';
import { Table } from 'react-chakra-pagination';
import { AiOutlinePlus } from 'react-icons/ai';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import { useNavigate } from 'react-router-dom';
import { deleteApplication } from '../../../store/actions/applicationActions';

// Use Chakra Ui for create a custom component for display field data in table
import { Flex, Text, Box, Icon, Button, Spinner } from '@chakra-ui/react';

// Recommended for icons
import { FiTrash2 } from 'react-icons/fi';

export default function MyApplications({ children, clickable }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applicationData = useSelector(store => store.application);

  const { applications = [] } = applicationData;
  const [page, setPage] = React.useState(1);

  // Formatter for each user
  const tableData = applications.map(app => ({
    Applications: (
      <Flex
        align="center"
        onClick={() => navigate(`/application/${app.app_uuid}`)}
        cursor="pointer"
      >
        <Text>{app.app_name}</Text>
      </Flex>
    ),
    Updated: new Date(app.updated_datetime).toLocaleString(),
    Actions: (
      <Button
        onClick={event => {
          event.currentTarget.disabled = true;

          dispatch(deleteApplication(app.app_uuid));
        }}
        size="sm"
      >
        <Icon as={FiTrash2} fontSize="20" />
      </Button>
    ),
  }));

  // Accessor to get a data in user object
  const tableColumns = [
    {
      Header: 'Applications',
      accessor: 'Applications',
    },
    {
      Header: 'Updated',
      accessor: 'Updated',
    },
    {
      Header: 'Actions',
      accessor: 'Actions',
    },
  ];

  return (
    <Box p="1">
      {children}
      {!clickable ? (
        <Flex justifyContent={'center'} alignItems="center" h="100px">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>
      ) : (
        <Box
          mt="6"
          borderWidth="2px"
          borderRadius="lg"
          overflow="auto"
          pointerEvents={clickable ? 'all' : 'none'}
        >
          <Table
            colorScheme="blue"
            // Fallback component when list is empty
            emptyData={{
              icon: AiOutlinePlus,
              text: 'Create application first',
            }}
            totalRegisters={applications.length}
            page={page}
            // Listen change page event and control the current page using state
            onPageChange={page => setPage(page)}
            columns={tableColumns}
            data={tableData}
          />
        </Box>
      )}
    </Box>
  );
}
