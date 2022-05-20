import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useMatches,
} from "@remix-run/react";

import { Navbar } from "./components/navbar";
import { getAuthSession } from "./core/auth/session.server";
import { SUPABASE_ANON_PUBLIC, SUPABASE_URL } from "./core/utils/env.server";
import tailwindStylesheetUrl from "./styles/tailwind.css";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: tailwindStylesheetUrl },
];

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = Window & { email: string };

export const loader: LoaderFunction = async ({ request }) => {
  const { email } = (await getAuthSession(request)) || {};

  return json({
    email,
    ENV: {
      SUPABASE_URL,
      SUPABASE_ANON_PUBLIC,
    },
  });
};

export default function App() {
  const { ENV, email } = useLoaderData() as LoaderData;
  const matches = useMatches();

  // And here we can filter thru route's handle 😎
  const hideNavbar =
    matches
      // get routes that have hideNavbar
      .filter((match) => match.handle?.hideNavbar).length > 0;

  return (
    <html
      lang="en"
      className="h-full"
    >
      <head>
        <Meta />
        <Links />
      </head>
      <body className="h-full">
        {hideNavbar ? null : <Navbar email={email} />}
        <Outlet />
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(ENV)}`,
          }}
        />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
