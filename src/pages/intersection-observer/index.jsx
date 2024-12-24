import { useRef, useEffect, useState, useCallback } from 'react';
import { Flex, Text, Button, Grid } from '@chakra-ui/react';

const useIntersectElementOnRoot = (options) => {
  const containerRef = useRef(null);
  const [isVisible, setVisible] = useState(false);

  const callbackFn = useCallback(
    (entries) => {
      const [entry] = entries;
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting && isVisible) {
        console.log('entry', entry);
      }
    },
    [isVisible]
  );

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
  const [tracking, setTracking] = useState(0);
  const [containerRef, isVisible] = useIntersectElementOnRoot({
    root: null,
    rootMargin: '0px',
    threshold: tracking
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
        zIndex={1}
      >
        <Text>{isVisible ? 'In Viewport' : 'Not In Viewport'}</Text>
      </Flex>
      <Flex direction="column" alignItems="center" h="calc(100vh + 100px)" w="100%" mt="70px">
        <Text>Choose a variant of the tracking of the target box:</Text>
        <Grid gap="15px" gridTemplateColumns="repeat(4, 1fr)" width="fit-content" mt="15px">
          <Button onClick={() => setTracking(0)}>When the box appears</Button>
          <Button onClick={() => setTracking(1)}>When the box appears fully</Button>
          <Button onClick={() => setTracking([0.25, 0.5, 0.75, 1])}>By each 25% of the size</Button>
          <Button onClick={() => setTracking([0.1, 0.3, 0.55, 0.85])}>Custom 10/30/55/85 %</Button>
        </Grid>
      </Flex>
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
