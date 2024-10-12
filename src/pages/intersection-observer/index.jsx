import { useRef, useEffect, useState, useCallback } from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';

const useIntersectElementOnRoot = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setVisible] = useState(false);

  const callbackFn = useCallback((entries) => {
    const [entry] = entries;
    setVisible(entry.isIntersecting);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(callbackFn, options);
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current);
    };
  }, [callbackFn, containerRef, options]);

  return [containerRef, isVisible];
};

const IntersectionObserverPage = () => {
  const [containerRef, isVisible] = useIntersectElementOnRoot({
    root: null,
    rootMargin: '0px',
    threshold: 1
  });

  return (
    <Flex
      direction="column"
      alignItems="center"
      justifyContent="center"
      bgColor="orange.100"
      position="relative"
      w="100%"
    >
      <Flex
        alignItems="center"
        justifyContent="center"
        position="fixed"
        top="0"
        left="50px"
        width="full"
        padding="20px"
        bg="blue.100"
      >
        <Text>{isVisible ? 'In Viewport' : 'Not In Viewport'}</Text>
      </Flex>
      <Box h="calc(100vh + 100px)" w="100%" />
      <Flex
        ref={containerRef}
        justifyContent="center"
        alignItems="center"
        w="500px"
        h="250px"
        bgColor="gray.500"
        mb="500px"
      >
        <Text>Observed container</Text>
      </Flex>
    </Flex>
  );
};

export default IntersectionObserverPage;
