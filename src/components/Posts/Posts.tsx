import React from "react";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";

import { Search } from "./Search";
import type { TProps } from "./Posts.types";

const Posts: React.FC<TProps> = ({ items }) => (
  <Box py={4} w="100%">
    <Search />

    {items && !!items.length ? (
      <SimpleGrid spacing={4} templateColumns="repeat(auto-fill, minmax(200px, 1fr))">
        {items.map(
          ({ content, id, title }: TPost): React.ReactElement => (
            <Card key={`posts-item-${id}`}>
              {title && (
                <CardHeader>
                  <Heading noOfLines={3} size="sm">
                    {title}
                  </Heading>
                </CardHeader>
              )}

              {content && (
                <CardBody>
                  <Text noOfLines={4}>{content}</Text>
                </CardBody>
              )}

              <CardFooter>
                <Link href={`/posts/${id}`}>
                  <Button>Open</Button>
                </Link>
              </CardFooter>
            </Card>
          )
        )}
      </SimpleGrid>
    ) : (
      <p>No posts.</p>
    )}
  </Box>
);

export { Posts };
