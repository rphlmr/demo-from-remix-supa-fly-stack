import { Link } from "@remix-run/react";

export function NavbarUserLoginSignUp({ email }: { email: string }) {
  return (
    <div className="mx-auto mt-10 max-w-sm sm:flex sm:max-w-none sm:justify-center">
      {email ? (
        <Link
          to="/notes"
          className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
        >
          View Notes for {email}
        </Link>
      ) : (
        <div className="space-y-4">
          <div className="space-y-4 sm:mx-auto sm:inline-grid sm:grid-cols-2 sm:gap-5 sm:space-y-0">
            <Link
              to="/join"
              className="flex items-center justify-center rounded-md border border-transparent bg-white px-4 py-3 text-base font-medium text-yellow-700 shadow-sm hover:bg-yellow-50 sm:px-8"
            >
              Sign up
            </Link>
            <Link
              to="/login"
              className="flex items-center justify-center rounded-md bg-yellow-500 px-4 py-3 font-medium text-white hover:bg-yellow-600  "
            >
              Log In
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
