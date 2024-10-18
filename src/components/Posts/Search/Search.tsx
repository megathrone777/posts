"use client";
import React, { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";

const Search: React.FC = () => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState<string>(searchParams.get("query") ?? "");
  const [isSearching, toggleSearching] = useState<boolean>(false);

  const updateQuery = useDebouncedCallback((query: string): void => {
    const params = new URLSearchParams(searchParams);

    if (query && query.length > 0) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    router.replace(`${pathname}?${params.toString()}`);
    toggleSearching(false);
  }, 300);

  const handleInputChange = ({
    currentTarget: { value },
  }: React.SyntheticEvent<HTMLInputElement>): void => {
    if (!isSearching) {
      toggleSearching(true);
    }

    setInputValue(value);
    updateQuery(value);
  };

  return (
    <Box py={4}>
      <FormControl>
        <InputGroup>
          <Input
            borderColor="gray"
            _hover={{
              borderColor: "gray",
            }}
            onChange={handleInputChange}
            placeholder="Search..."
            type="text"
            value={inputValue}
          />

          {isSearching && (
            <InputRightElement pointerEvents="none">
              <Spinner color="green" size="sm" thickness="3px" />
            </InputRightElement>
          )}
        </InputGroup>
      </FormControl>
    </Box>
  );
};

export { Search };
