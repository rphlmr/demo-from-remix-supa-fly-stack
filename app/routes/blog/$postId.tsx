import { ArrowLeftIcon } from "@heroicons/react/solid";
import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { notFound } from "~/core/utils/http.server";

import type { BlogPost } from ".";
import { posts } from ".";

// this where is the magic. Go to root.tsx to follow what's next
export const handle = {
  hideNavbar: true,
};

export const loader: LoaderFunction = async ({ request, params }) => {
  const { postId } = params;

  // fake access to data
  const post = posts.find((post) => post.id === postId);

  if (!post) throw notFound(`Post with id ${postId} is not found`);

  return json(post);
};

export default function BlogPage() {
  const post = useLoaderData() as BlogPost;
  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="relative px-4 sm:px-6 lg:px-8">
        <Link
          to="/blog"
          className="fixed inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          <ArrowLeftIcon
            className="h-6 w-6"
            aria-hidden="true"
          />
        </Link>

        <div className="mx-auto max-w-prose text-lg">
          <h1>
            <span className="block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
              {post.title}
            </span>
          </h1>
          <p className="mt-8 text-xl leading-8 text-gray-500">
            {post.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CatchBoundary() {
  return (
    <div className="relative overflow-hidden bg-white py-16">
      <div className="relative flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <h1>
          <span className="block text-center text-3xl font-extrabold leading-8 tracking-tight text-gray-900 sm:text-4xl">
            We couldn't find that post!
          </span>
        </h1>

        <Link
          to="/blog"
          className="mx-auto mt-4 inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-3 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Go back to Blog
        </Link>
      </div>
    </div>
  );
}
