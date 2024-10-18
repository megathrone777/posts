import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import { SigninForm } from "~/app/(auth)/components";

const Page: React.FC = () => (
  <React.Fragment>
    <Heading as="h1">Sign In</Heading>

    <Box backgroundColor="white" borderRadius={4} boxShadow="md" minW={400} p={4}>
      <SigninForm />
    </Box>

    <Box>
      Don&apos;t have an account?{" "}
      <Link color="green" href="/signup">
        Sign Up
      </Link>
    </Box>
  </React.Fragment>
);

export { metadata } from "./metadata";
export default Page;
