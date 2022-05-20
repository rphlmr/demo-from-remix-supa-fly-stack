import { Link } from "@remix-run/react";

import { NavbarUserLoginSignUp } from "./navbar-user-login";

export function Navbar({ email }: { email: string }) {
  return (
    <nav className="bg-gray-200">
      <div className="flex w-full items-center justify-between px-20">
        <div className="flex items-center">
          <Link to="/">
            <h1>image</h1>
          </Link>
          <span>Dropdown</span>
        </div>
      </div>
      <div>
        <NavbarUserLoginSignUp email={email} />
      </div>
    </nav>
  );
}

// export function Navbar() {
// Advanced feature
// In the future, if you have a deep nested component outside of a route in routes/ folder

// You can get "loader" data of any route if your component is render in one of them.
// const { email } = useMatchesData("root") as { email: string };

//   return (
//     <nav>
//       <div className="flex w-full items-center justify-between px-20">
//         <div className="flex items-center">
//           <Link to="/">
//             <h1>image</h1>
//           </Link>
//           <span>Dropdown</span>
//         </div>
//       </div>
//       <div>
//         <NavbarUserLoginSignUp email={email} />
//       </div>
//     </nav>
//   );
// }
