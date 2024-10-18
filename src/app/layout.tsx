import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { Box, ChakraProvider, Container } from "@chakra-ui/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import type { TProps } from "./layout.types";

const Layout: React.FC<TProps> = async ({ children }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value || "";
  const tokenData = jwt.decode(token) as TUser;

  if (tokenData && Date.now() >= tokenData.exp * 1000) {
    const response = await fetch(`${process.env.API_URL}/auth/refresh-token`, {
      headers: {
        Authorization: `Bearer ${tokenData.accessToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        token: tokenData.refreshToken,
      }),
      method: "POST",
    });
    const responseData = (await response.json()) as { access_token: string };

    if (response && responseData && responseData.access_token) {
      cookiesStore.set("token", responseData.access_token, {
        httpOnly: true,
      });
    }
  }

  return (
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
};

export { metadata } from "./metadata";
export default Layout;
