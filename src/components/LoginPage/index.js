import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  useColorModeValue,
  InputGroup,
  InputLeftElement,
  chakra,
  InputRightElement,
  FormLabel,
  FormErrorMessage,
  useToast,
  styled,
  keyframes,
} from '@chakra-ui/react';
import { FaUserAlt, FaLock } from 'react-icons/fa';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { app_title } from '../../constants';
import ColorModeSwitcher from '../../utils/ColorModeSwitcher';
import login_background from '../../assets/img/login_background.webp';
import { axiosInstance } from '../../utils/RestClient';
import { saveSessionId, saveUserUid } from '../../utils/index';

export default function LoginPage() {
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  const CFaUserAlt = chakra(FaUserAlt);
  const CFaLock = chakra(FaLock);

  const navigate = useNavigate();
  const toast = useToast();

  // wave hand start
  const wavePulse = keyframes`
    0% { transform: rotate( 0.0deg) }
    10% { transform: rotate(14.0deg) }
    20% { transform: rotate(-8.0deg) }
    30% { transform: rotate(14.0deg) }
    40% { transform: rotate(-4.0deg) }
    50% { transform: rotate(10.0deg) }
    60% { transform: rotate( 0.0deg) }
    100% { transform: rotate( 0.0deg) }
  `;

  const WaveHand = styled('span', {
    baseStyle: {
      animation: `${wavePulse} 3s`,
      animationIterationCount: 'infinite',
      transformOrigin: '70% 70%',
      display: 'inline-block',
    },
  });
  // wave hand end

  // show password logic start
  const [showPassword, setShowPassword] = useState(false);

  const handleShowClick = () => setShowPassword(!showPassword);
  // show password logic end

  // formik logic start
  const validate = values => {
    const errors = {};
    if (!values.userName) {
      errors.userName = 'Required';
    } else if (values.userName.length > 15) {
      errors.userName = 'Must be 15 characters or less';
    }

    if (!values.password) {
      errors.password = 'Required';
    } else if (values.password.length > 15) {
      errors.password = 'Must be 15 characters or less';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      userName: '',
      password: '',
    },
    validate,
    onSubmit: async values => {
      const formData = new FormData();
      formData.append('username', values.userName);
      formData.append('password', values.password);

      try {
        const response = await axiosInstance.post('/token', formData);
        const data = response.data;

        saveSessionId(data.access_token); // saving session_id
        saveUserUid(values.userName); // saving user_uid
        navigate('/home', { replace: true }); // navigating to home
      } catch (err) {
        const errMsg = err.data ? err.data.detail : err.message;
        toast({
          title: errMsg,
          status: 'error',
          position: 'top-right',
          duration: 3000,
          isClosable: true,
        });
      }
    },
  });
  // formik logic end

  return (
    <>
      <Helmet>
        <title>Login | {app_title}</title>
      </Helmet>
      <Flex minH="100vh" overflow="auto">
        <Flex
          backgroundImage={login_background}
          backgroundSize="cover"
          width={{ base: '0', md: '50%' }}
        />
        <Flex
          width={{ base: '100%', md: '50%' }}
          minWidth={300}
          flexDirection="column"
          bg={formBackground}
          p={12}
          boxShadow="lg"
        >
          <form onSubmit={formik.handleSubmit} autoComplete="off">
            <FormControl display="flex" justifyContent="flex-end">
              <ColorModeSwitcher />
            </FormControl>
            <Heading mb={2}>
              <WaveHand>
                <span role="img" aria-label="wave-hand">
                  👋
                </span>
              </WaveHand>{' '}
              Welcome! User,
            </Heading>
            <Heading mb={10} size="sm" color="gray.500">
              Good to see you back, Enter your details and proceed with login
            </Heading>
            <FormControl
              isInvalid={formik.errors.userName && formik.touched.userName}
              mb={6}
              isRequired
            >
              <FormLabel htmlFor="username">Username</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaUserAlt color="gray.300" />}
                />
                <Input
                  placeholder="username"
                  variant="filled"
                  name="userName"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </InputGroup>
              <FormErrorMessage>{formik.errors.userName}</FormErrorMessage>
            </FormControl>
            <FormControl
              isInvalid={formik.errors.password && formik.touched.password}
              mb={6}
              isRequired
            >
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftElement
                  pointerEvents="none"
                  children={<CFaLock color="gray.300" />}
                />
                <Input
                  placeholder="**********"
                  type={showPassword ? 'text' : 'password'}
                  variant="filled"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowClick}>
                    {showPassword ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
            </FormControl>
            <Button
              colorScheme="blue"
              mb={8}
              type="submit"
              isLoading={formik.isSubmitting}
              loadingText="Submitting"
              width="full"
            >
              Log In
            </Button>
          </form>
        </Flex>
      </Flex>
    </>
  );
}
