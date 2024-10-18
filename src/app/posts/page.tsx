import React from "react";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

import { Posts } from "~/components";
import type { TProps } from "./page.types";

const Page: React.FC<TProps> = async ({ searchParams }) => {
  const cookiesStore = cookies();
  const token = cookiesStore.get("token")?.value || "";
  const tokenData = jwt.verify(token, process.env.JWT_SECRET) as TUser;
  const query = searchParams.query || "";

  const response = await fetch(`${process.env.API_URL}/posts/user/${tokenData.user.id}`, {
    headers: {
      Authorization: `Bearer ${tokenData.accessToken}`,
      "content-type": "application/json",
    },
    next: {
      revalidate: 0,
    },
  });
  const posts = (await response.json()) as TPost[];

  const filteredPosts = posts.filter(
    ({ content, title }): boolean => content.includes(query) || title.includes(query)
  );

  return <Posts items={filteredPosts} />;
};

export { metadata } from "./metadata";
export default Page;
