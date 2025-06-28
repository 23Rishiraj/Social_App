import { useToast } from '@chakra-ui/react';
import { useCallback } from 'react';

const useShowToast = () => {
  const toast = useToast()
  const showToast = useCallback((title,description,status) =>{
    toast({
      title: title, //or write only title => works the same
      description: description,
      status: status,
      duration: 3000,
      isClosable: true,
    });
  },[toast])
  return showToast;
}

export default useShowToast
//we are using it for custom toasts