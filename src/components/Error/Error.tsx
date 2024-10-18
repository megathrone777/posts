import React from "react";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import type { TProps } from "./Error.types";

const Error: React.FC<TProps> = ({ title }) => (
  <Flex
    alignItems="center"
    backgroundColor="gray.300"
    direction="column"
    height="100vh"
    justifyContent="center"
    rowGap={4}
  >
    <Heading as="h1">{title}</Heading>

    <Link href="/">
      <Button colorScheme="green">Main page</Button>
    </Link>
  </Flex>
);

export { Error };
