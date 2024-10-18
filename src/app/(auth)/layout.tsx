import React from "react";
import { Flex } from "@chakra-ui/react";

import type { TProps } from "./layout.types";

const Layout: React.FC<TProps> = ({ children }) => (
  <Flex
    alignItems="center"
    flexDirection="column"
    height="100vh"
    justifyContent="center"
    rowGap={3}
  >
    {children}
  </Flex>
);

export default Layout;
