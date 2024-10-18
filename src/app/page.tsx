import React from "react";

import { Posts } from "~/components";
import type { TProps } from "./page.types";

const Page: React.FC<TProps> = async ({ searchParams }) => {
  const response = await fetch(`${process.env.API_URL}/posts`);
  const posts = (await response.json()) as TPost[];
  const query = searchParams.query ?? "";

  const filteredPosts = posts.filter(
    ({ content, title }): boolean => content.includes(query) || title.includes(query)
  );

  return <Posts items={filteredPosts} />;
};

export { metadata } from "./metadata";
export default Page;
