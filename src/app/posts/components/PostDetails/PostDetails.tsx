import React from "react";
import { Flex, Heading, Text } from "@chakra-ui/react";

import type { TProps } from "./PostDetails.types";

const PostDetails: React.FC<TProps> = ({ content, title }) => (
  <Flex direction="column" py={4} rowGap={3} w="100%">
    {title && <Heading as="h1">{title}</Heading>}
    {content && <Text>{content}</Text>}
  </Flex>
);

export { PostDetails };
