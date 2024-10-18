"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Link } from "@chakra-ui/next-js";
import { Button, Flex } from "@chakra-ui/react";

import type { TProps } from "./layout.types";

const Template: React.FC<TProps> = ({ children }) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignoutClick = async (): Promise<void> => {
    const response = await fetch("/api/signout");

    if (response && response.status === 200) {
      router.push("/signin");
    }
  };

  return (
    <React.Fragment>
      <Flex alignItems="start" columnGap={3} justifyContent="flex-end" pt={3} w="100%">
        <Link href="/">
          <Button colorScheme="green">All posts</Button>
        </Link>

        {pathname !== "/posts" && (
          <Link href="/posts" prefetch>
            <Button colorScheme="green">User posts</Button>
          </Link>
        )}

        {pathname !== "/posts/create" && (
          <Link href="/posts/create">
            <Button colorScheme="green">Create post</Button>
          </Link>
        )}

        <Button colorScheme="red" onClick={handleSignoutClick}>
          Sign Out
        </Button>
      </Flex>

      <Flex
        alignItems="center"
        flexDirection="column"
        justifyContent="start"
        rowGap={3}
        w="100%"
      >
        {children}
      </Flex>
    </React.Fragment>
  );
};

export default Template;
