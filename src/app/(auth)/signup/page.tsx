import React from "react";
import { Box, Heading } from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";

import { SignupForm } from "~/app/(auth)/components";

const Page: React.FC = () => (
  <React.Fragment>
    <Heading as="h1">Sign Up</Heading>

    <Box backgroundColor="white" borderRadius={4} boxShadow="md" minW={400} p={4}>
      <SignupForm />
    </Box>

    <Box>
      Already have an account?{" "}
      <Link color="green" href="/signin">
        Sign In
      </Link>
    </Box>
  </React.Fragment>
);

export { metadata } from "./metadata";
export default Page;
