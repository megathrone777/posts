import React from "react";
import { Box, Heading } from "@chakra-ui/react";

import { CreateForm } from "~/app/posts/components";

const Page: React.FC = () => (
  <React.Fragment>
    <Heading as="h1">Create post</Heading>

    <Box backgroundColor="white" borderRadius={4} boxShadow="md" minW={400} p={4}>
      <CreateForm />
    </Box>
  </React.Fragment>
);

export default Page;
