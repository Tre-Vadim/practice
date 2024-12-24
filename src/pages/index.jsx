import { Suspense } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import {
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  UnorderedList,
  ListItem,
  Text,
  Grid,
  Box,
  useBoolean
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';

import { ROUTES } from '../shared/routes';

const App = () => {
  const [isOpen, setOpen] = useBoolean(false);

  return (
    <>
      <Flex
        h="100vh"
        position="fixed"
        left="0"
        background="white"
        p="10px 5px"
        cursor="pointer"
        boxShadow="2px 0px 10px 0px rgba(0,0,0,0.2)"
        borderRight="1px solid"
        borderColor="gray.300"
        _hover={{
          boxShadow: '2px 0px 10px 0px rgba(0,0,0,0.25)'
        }}
        onClick={setOpen.toggle}
      >
        <HamburgerIcon boxSize="24px" />
      </Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={setOpen.toggle}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Navigation</DrawerHeader>

          <DrawerBody>
            <UnorderedList onClick={setOpen.toggle} styleType="none" ml="0">
              {ROUTES.map(({ id, path, menuLabel }) => (
                <ListItem key={id}>
                  <Link to={path}>
                    <Text fontSize="sm">{menuLabel}</Text>
                  </Link>
                </ListItem>
              ))}
            </UnorderedList>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
      <Grid minHeight="100vh" gridTemplateColumns="50px 1fr" width="100vw">
        <Box />
        <Routes>
          {ROUTES.map(({ id, path, component: Component }) => (
            <Route
              key={id}
              path={path}
              element={
                <Suspense fallback={null}>
                  <Component />
                </Suspense>
              }
            />
          ))}
        </Routes>
      </Grid>
    </>
  );
};
export default App;
