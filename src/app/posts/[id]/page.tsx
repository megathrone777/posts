import React from "react";

import { PostDetails } from "~/app/posts/components";
import type { TProps } from "./page.types";

const Page: React.FC<TProps> = async ({ params }) => {
  const response = await fetch(`${process.env.API_URL}/posts/${params.id}`);
  const post = (await response.json()) as TPost;

  return <PostDetails {...post} />;
};

export default Page;
