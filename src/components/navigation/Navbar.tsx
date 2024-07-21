"use client";
import { useAuth } from "@/context/AuthProvider";
import { AppConfig } from "@/util/AppConfig";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export const Navbar = () => {
  const { isLoggedIn, user, initUser } = useAuth();

  const router = useRouter();

  const goToLogin = () => {
    router.push("/sign-in");
  };

  const goToSignUp = () => {
    router.push("/sign-up");
  };

  useEffect(() => {
    initUser();
  }, []);

  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        {/* <img */}
        {/*   alt="Your Company" */}
        {/*   src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" */}
        {/* /> */}
        <a className="btn btn-ghost text-xl text-gray-300" href="/">{AppConfig.name}</a>
      </div>
      <div className="flex-none">
        {isLoggedIn && user ? (
          <>
            <ul className="menu menu-horizontal px-1">
              <li>
                <a href="/mis-peliculas">Mis películas</a>
              </li>
            </ul>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img
                    alt="Tailwind CSS Navbar component"
                    src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li>
                  <a>Logout</a>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2">
              <button className="btn btn-primary" onClick={goToLogin}>
                Iniciar sesión
              </button>
              <button
                type="button"
                className="btn btn-ghost col-span-2"
                onClick={goToSignUp}
              >
                Registrate
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
