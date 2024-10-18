import React from "react";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { TProps } from "./layout.types";

const Layout: React.FC<TProps> = ({ children }) => (
  <html lang="en" suppressHydrationWarning>
    <body>
      <ChakraProvider>
        <Box backgroundColor="gray.300" minH="100vh">
          <Container centerContent maxW="container.lg">
            {children}
          </Container>
        </Box>

        <ToastContainer
          autoClose={3500}
          closeButton={false}
          closeOnClick
          draggable={false}
          hideProgressBar
          pauseOnHover
          newestOnTop
          position="bottom-right"
        />
      </ChakraProvider>
    </body>
  </html>
);

export { metadata } from "./metadata";
export default Layout;
