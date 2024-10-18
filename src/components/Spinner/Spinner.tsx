import React from "react";
import { Flex, Spinner as ReactSpinner } from "@chakra-ui/react";

const Spinner: React.FC = () => (
  <Flex
    alignItems="center"
    backgroundColor="whiteAlpha.600"
    bottom={0}
    flexDirection="column"
    height="100vh"
    justifyContent="center"
    left={0}
    position="absolute"
    right={0}
    top={0}
    width="100vw"
  >
    <ReactSpinner
      color="green"
      emptyColor="white"
      size="xl"
      speed=".5s"
      thickness="4px"
    />
  </Flex>
);

export { Spinner };
