import { Toast } from '@chakra-ui/react';
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react'

const Private = ({ children }) => {
    const toast = useToast()
  const btToken = JSON.parse(localStorage.getItem('btToken'));

  if (btToken) {
    return <>{children}</>
  }else{
    toast({
        title: 'You are not logged in to access dashboard.',
        description: "Please sign in first",
        status: 'error',
        duration: 2000,
        isClosable: true,
      })
  }

  return <Navigate to="/login" replace />
};

export default Private;