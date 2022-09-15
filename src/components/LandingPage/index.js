import React from 'react';
import { IconButton, Flex, Heading } from '@chakra-ui/react';
import { AiOutlinePlus } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { app_title } from '../../constants';
import NavigationContainer from '../../sharedComponents/NavigationContainer';
import MyApplications from './RefactoredComps/MyApplications';
import {
  createApplication,
  getApplications,
} from '../../store/actions/applicationActions';
import { setLoading } from '../../store/actions/loader';

export default function LandingPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const applicationData = useSelector(store => store.application);
  const loadingData = useSelector(store => store.loading);

  const { applications = [] } = applicationData;
  const { isLoading } = loadingData;

  React.useEffect(function () {
    dispatch(setLoading(true));
    dispatch(getApplications());
  }, []);

  function createApplications(event) {
    event.currentTarget.disabled = true;
    dispatch(createApplication(applications, navigate));
  }

  return (
    <>
      <Helmet>
        <title>Home | {app_title}</title>
      </Helmet>
      <NavigationContainer>
        <MyApplications clickable={!isLoading}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading size="md" as="h2">
              My Applications
            </Heading>
            <IconButton
              colorScheme="blue"
              aria-label="add"
              size="md"
              m="0.5"
              onClick={createApplications}
              icon={<AiOutlinePlus />}
              disabled={isLoading}
            />
          </Flex>
        </MyApplications>
      </NavigationContainer>
    </>
  );
}
